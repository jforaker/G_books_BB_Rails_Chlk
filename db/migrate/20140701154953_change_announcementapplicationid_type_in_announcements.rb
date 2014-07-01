class ChangeAnnouncementapplicationidTypeInAnnouncements < ActiveRecord::Migration
  def up
    execute 'ALTER TABLE announcements ALTER COLUMN announcementapplicationid TYPE integer USING (announcementapplicationid::integer)'
  end

  def down
    execute 'ALTER TABLE announcements ALTER COLUMN announcementapplicationid TYPE string USING (announcementapplicationid::string)'
  end
end
