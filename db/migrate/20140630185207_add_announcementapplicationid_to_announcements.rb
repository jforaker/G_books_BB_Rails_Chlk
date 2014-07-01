class AddAnnouncementapplicationidToAnnouncements < ActiveRecord::Migration
  def change
    add_column :announcements, :announcementapplicationid, :string
  end
end
