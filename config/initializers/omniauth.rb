#module OmniAuth
#  module Strategies
#    # tell OmniAuth to load our strategy
#   autoload :Chalkable, '../../lib/chalkable_strategy'
#  end
#end


Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, ENV['OMNIAUTH_PROVIDER_KEY'], ENV['OMNIAUTH_PROVIDER_SECRET']

  #provider :chalkable, APP_CONFIG['client_secret'], APP_CONFIG['client_id']
end
