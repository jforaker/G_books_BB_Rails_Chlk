class CreateAnnouncements < ActiveRecord::Migration
  def change
    create_table :announcements do |t|
      t.string :announcement_application_id

      t.timestamps
    end
  end
end
