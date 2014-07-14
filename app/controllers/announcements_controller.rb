class AnnouncementsController < ApplicationController
  def new
  end

  def create

    @item = Announcement.new(:g_books_id => params[:g_books_id].to_s, :announcementapplicationid => params[:announcementapplicationid])
    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, :flash => { :notice => "Announcement saved! Just click attach!" } }
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
    @item = Announcement.find_by_announcementapplicationid(params[:announcementapplicationid])
    respond_to do |format|
      if @item.update_attributes(announcement_params)
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @item = Announcement.find_by_announcementapplicationid(params[:announcementapplicationid])
    puts @item.g_books_id
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  private

  def announcement_params
    params.require(:book).permit(:id, :g_books_id, :created_at, :updated_at, :announcementapplicationid)
  end
end




#
#def create
#  #User.where(:email => e).first_or_create
#  @item = Announcement.where(:announcementapplicationid => params[:announcementapplicationid]).first_or_create do |ann|
#
#    ann.attributes = {:g_books_id => params[:g_books_id].to_s, :announcementapplicationid => params[:announcementapplicationid]}
#    render json: ann, status: :created, location: ann
#  end
#  #respond_to do |format|
#  #  if @item.save
#  #    format.html { redirect_to @item, :flash => { :notice => "Announcement saved! Just click attach!" } }
#  #    format.json { render json: @item, status: :created, location: @item }
#  #  else
#  #    format.html { render action: "new" }
#  #    format.json { render json: @item.errors, status: :unprocessable_entity }
#  #  end
#  #end
#end