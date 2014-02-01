class AddStuffToBooks < ActiveRecord::Migration
  def change
    add_column :books, :author, :string
    add_column :books, :pageCount, :integer
    add_column :books, :publishedDate, :integer
  end
end
