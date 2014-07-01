class AddGBooksIdToAnnouncements < ActiveRecord::Migration
  def change
    add_column :announcements, :g_books_id, :string
  end
end
