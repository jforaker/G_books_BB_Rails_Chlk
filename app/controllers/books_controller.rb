class BooksController < ApplicationController
  # GET /books
  # GET /books.json
  #http://goo.gl/qYxc4t

  after_action :allow_iframe

  respond_to :html, :xml, :json

  def index
    @items = Book.all

    @mode = params[:mode]
    @code = params[:code]

    get_access_token(@code)

    @show_plus = @mode == 'edit'

    # get the unique id of this assignment with the app attached (should be used to save / read appropriate data)
    @announcement_application_id = params[:announcementapplicationid].to_i

    # get the student id of the current student's assignment (if viewing it as a teacher in the 'view' mode)
    @student_id = params[:studentid]

    if params.has_key?(:studentid)
      get_student_info(@student_id, @access_token)
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: {:items => @items,
                                  :user => @@user
                                                  }
      }

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
    get_current_user(@access_token)

  end

  def get_current_user(access_token)
    begin
      @response = RestClient.get(APP_CONFIG['service_url'], :authorization => "Bearer:" + access_token)

      @@user = JSON.parse(@response)['data']['displayname']
      #res[:is_teacher] = res['rolename'] == 'Teacher'
      #@user = res['displayname'].to_s

      return :res => res, :error => false
    rescue => e
      return :res => e, :error => true, :stack_trace => e.backtrace
    end
  end



  # GET /books/1
  # GET /books/1.json
  def show
    @item = Book.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  # GET /books/new
  # GET /books/new.json
  def new
    @item = Book.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
  end

  # GET /books/1/edit
  def edit
    @item = Book.find(params[:id])
  end

  # POST /books
  # POST /books.json
  def create
    item_params = params.require(:book).permit( :thumbnail, :title, :volumeInfo, :wantToRead, :readerLink, :author, :pageCount, :publishedDate)
    #:volumeInfo => [:title]
    @item = Book.new(item_params)

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "new" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /books/1
  # PUT /books/1.json
  def update
    item_params = params.require(:book).permit(wantToRead: params[:item][:wantToRead],
                                               readerLink: params[:item][:readerLink],
                                               author: params[:item][:author],
                                               pageCount: params[:item][:pageCount] || '',
                                               publishedDate: params[:item][:publishedDate]
    )
    @item = Book.find(params[:id])
    respond_to do |format|
      if @item.update_attributes(item_params)

        #if @item.update_attributes(params[item_params])
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @item = Book.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end

  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end

