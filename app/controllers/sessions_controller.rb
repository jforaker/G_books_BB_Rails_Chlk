class SessionsController < ApplicationController
  after_action :allow_iframe

  respond_to  :json


  def index

    mode = params[:mode]
    @code = params[:code]

    if params.has_key?(:code)
      get_access_token(@code)
    end

    @show_plus = mode == 'edit'

    # get the unique id of this assignment with the app attached (should be used to save / read appropriate data)
    @announcement_application_id = params[:announcementapplicationid].to_i


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

    unless session[:acs_token].nil?
      if session[:acs_token][:code] == code_url_param
        return :res => JSON.parse(session[:acs_token][:token]), :error => false
      end
    end

    puts code_url_param
    puts APP_CONFIG['acs_url']

    begin
      options =   { :body => {
          :code => code_url_param,
          :client_id => APP_CONFIG['client_id'],
          :client_secret => APP_CONFIG['client_secret'],
          :scope => APP_CONFIG['scope'],
          :redirect_uri => APP_CONFIG['client_id'],
          :grant_type => 'authorization_code'
      }}
      oauth_response = HTTParty.post(
          APP_CONFIG['acs_url'],
          options
      )
    rescue => e
      return [400, "Oh no, something terrible has happened!"]
    end

    parsed_response = JSON.parse(oauth_response.to_json)
    access_token = parsed_response["access_token"]

    puts parsed_response

    session[:acs_token] = {:token => access_token, :code => code_url_param}


    get_current_user(access_token)


  end

  def get_current_user(access_token)
    begin
      puts access_token
      response = RestClient.get('https://chalkable.com/Person/Me.json', :authorization => "Bearer:" + access_token)

      puts response
      session[:name] = JSON.parse(response)['data']['displayname']
      session[:user_id] =  JSON.parse(response)['data']['id']
      session[:email] =  JSON.parse(response)['data']['email']
      session[:role]  = JSON.parse(response)['data']['role']['namelowered']
      create(session[:email], session[:user_id], session[:name], session[:role])

    rescue => e
      puts e.response
    end
  end

  def create(e, u_id, name, role)

    @user = User.where(:email => e).first_or_create do |user|

      user.attributes = {:email => e, :user_id => u_id, :name => name, :uid => role}

      # After this, first_or_create will call user.create, so you don't have to

      redirect_to '/books'
    end
  end


  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end

end
