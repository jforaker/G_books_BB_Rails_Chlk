class User < ActiveRecord::Base

  has_many :books

  validates :email,  :uniqueness => true
  validates :user_id, :presence => true

  def self.authenticate(email, user_id)
    user = where(:user_id => user_id).first
    user && BCrypt::Password.new(user.password_digest) == email ? user : nil
  end

end
