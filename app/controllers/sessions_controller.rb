class SessionsController < ApplicationController
  after_action :allow_iframe

  respond_to  :json



  def destroy
    destroy_user_session
    redirect_to '/', :notice => "Logged out."
  end





  def index

    mode = params[:mode]
    @code = params[:code]

    if params.has_key?(:code)
      get_access_token(@code)
    end

    @show_plus = mode == 'edit'

    # get the unique id of this assignment with the app attached (should be used to save / read appropriate data)
    @announcement_application_id = params[:announcementapplicationid].to_i

    puts params[:announcementapplicationid].to_i

    # get the student id of the current student's assignment (if viewing it as a teacher in the 'view' mode)
    @student_id = params[:studentid]

    if params.has_key?(:studentid)
      get_student_info(@student_id, @access_token)
    end

  end

  def get_student_info(id, token)

    begin
      student_info_url = 'https://chalkable.com/Student/Info.json'
      student_response = HTTParty.get(student_info_url,
                                      :query => { :id => id  },
                                      :headers => { "Authorization" => "Bearer:" + token})

      @student = JSON.parse(student_response.to_json)['data']
      return @student, :error => false
    rescue => e
      return :res => e, :error => true, :stack_trace => e.backtrace
    end
  end


  # Get the access token
  def get_access_token(code_url_param)

    #unless session[:acs_token].nil?
    #  if session[:acs_token][:code] == code_url_param
    #    return :res => JSON.parse(session[:acs_token][:token]), :error => false
    #  end
    #end

    begin
      options =   { :body => {
          :code => code_url_param,
          :client_id => APP_CONFIG['client_id'],
          :client_secret => APP_CONFIG['client_secret'],
          :scope => 'https://chalkable.com',
          :redirect_uri => APP_CONFIG['client_id'],
          :grant_type => 'authorization_code'
      }}
      oauth_response = HTTParty.post(
          'https://chalkable-access-control.accesscontrol.windows.net/v2/OAuth2-13',
          options
      )
    rescue => e
      return [400, "Oh no, something terrible has happened!"]
    end

    parsed_response = JSON.parse(oauth_response.to_json)
    @access_token = parsed_response["access_token"]

    session[:acs_token] = {:token => @access_token, :code => @code}


    if params.has_key?(:code)
      get_current_user(@access_token)
    end

  end

  def get_current_user(access_token)
    begin
      @response = RestClient.get(APP_CONFIG['service_url'], :authorization => "Bearer:" + access_token)

      puts  JSON.parse(@response)['data']['role']['namelowered']

      session[:name] = JSON.parse(@response)['data']['displayname']
      session[:user_id] =  JSON.parse(@response)['data']['id']
      session[:email] =  JSON.parse(@response)['data']['email']
      session[:role]  = JSON.parse(@response)['data']['role']['namelowered']
      create(session[:email], session[:user_id], session[:name], session[:role])


      return :res => res, :error => false
    rescue => e
      return :res => e, :error => true, :stack_trace => e.backtrace
    end
  end

  def create(e, u_id, name, role)

    @user = User.where(:email => e).first_or_create do |user|
      # This block is called with a new user object with only :email set
      # Customize this object to your will
      user.attributes = {:email => e, :user_id => u_id, :name => name, :role => role}
      # After this, first_or_create will call user.create, so you don't have to

      redirect_to '/books'
    end

    puts @user.user_id

  end


  private

  def user_params
    return session[:email], session[:user_id]
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
