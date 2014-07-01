class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user
  #helper_method :user_signed_in?
  #helper_method :correct_user?

  #private
  #def current_user
  #  begin
  #    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  #  rescue Exception => e
  #    nil
  #  end
  #end
  #
  #def user_signed_in?
  #  return true if current_user
  #end
  #
  #def correct_user?
  #  @user = User.find(params[:id])
  #  unless current_user == @user
  #    redirect_to root_url, :alert => "Access denied."
  #  end
  #end
  #
  #def authenticate_user!
  #  if !current_user
  #    redirect_to root_url, :alert => 'You need to sign in for access to this page.'
  #  end
  #end


  private

  def require_user
    return if current_user

    respond_to do |format|
      format.html { redirect_to login_path }
      format.all  { render :text => 'unauthorized', :status => :unauthorized }
    end
  end

  def current_user
    @current_user = User.find_by_user_id(session[:user_id])
    # Use find_by_id to get nil instead of an error if user doesn't exist
  end

  def create_user_session(user)
    session[:user_id] = user.user_id
  end

  def destroy_user_session
    session[:user_id] = nil
  end

end
