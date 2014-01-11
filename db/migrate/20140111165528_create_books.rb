class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :thumbnail
      t.boolean :wantToRead

      t.timestamps
    end
  end
end
