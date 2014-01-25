class AddReaderLinkToBooks < ActiveRecord::Migration
  def change
    add_column :books, :readerLink, :string
  end
end
