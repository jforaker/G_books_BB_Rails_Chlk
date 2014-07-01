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

  def show
    @item = Announcement.find_by_announcementapplicationid(params[:announcementapplicationid])
    puts @item.g_books_id
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end
end
