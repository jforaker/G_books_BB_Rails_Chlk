class BooksController < ApplicationController
  #http://goo.gl/qYxc4t

  after_action :allow_iframe

  respond_to :html, :xml, :json



  def index

    @items = current_user.books


    mode = params[:mode].to_s

    logger.info current_user.name

    @show_plus = mode == 'edit'

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
                                  :user => session[:name],
                                  :role => session[:role],
                                  :mode => mode}}
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
    @item = current_user.books.build(book_params)
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

    @item = Book.find(params[:id])
    respond_to do |format|
      if @item.update_attributes(book_params)

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

  def book_params
    params.require(:book).permit( :thumbnail, :title, :volumeInfo, :wantToRead, :readerLink, :author, :pageCount, :publishedDate)
  end

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end

