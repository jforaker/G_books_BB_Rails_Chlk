class ChangeUserIdFormatInBooks < ActiveRecord::Migration
  def change
    change_column :books, :user_id, :integer
  end
end
