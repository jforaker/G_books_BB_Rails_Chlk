class BooksController < ApplicationController
  # GET /books
  # GET /books.json
  respond_to :html, :xml, :json

  def index
    @items = Book.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
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
end

