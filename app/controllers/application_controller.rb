class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user

  private

  def current_user
    puts session[:user_id].to_s + '== sess'
    @current_user = User.find_by_user_id(session[:user_id]) unless session[:user_id].nil?
    # Use find_by_id to get nil instead of an error if user doesn't exist

  end

  def create_user_session(user)
    session[:user_id] = user.user_id
  end

  def destroy_user_session
    session[:user_id] = nil
  end

end
