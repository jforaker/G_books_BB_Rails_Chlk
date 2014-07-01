class ChangeUserIdTypeInBooks < ActiveRecord::Migration
  def up
    execute 'ALTER TABLE books ALTER COLUMN user_id TYPE integer USING (user_id::integer)'
  end

  def down
    execute 'ALTER TABLE books ALTER COLUMN user_id TYPE string USING (user_id::string)'
  end
end
