class ChangeAnnouncementapplicationidFormatInAnnouncements < ActiveRecord::Migration
  def change
    change_column :announcements, :announcementapplicationid, :integer
  end
end
