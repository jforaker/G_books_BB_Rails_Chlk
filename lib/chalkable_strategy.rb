require 'omniauth/core'
module OmniAuth
  module Strategies
    class Chalkable
      include OmniAuth::Strategy

      # receive parameters from the strategy declaration and save them
      def initialize(app, secret, auth_redirect, options = {})
        @secret = secret
        @auth_redirect = auth_redirect
        super(app, :chalkable, options)
      end

      # redirect to the Pixelation website
      def request_phase
        r = Rack::Response.new
        r.redirect @auth_redirect
        r.finish
      end

      def callback_phase
        id, displayname, token = request.params["id"], request.params["displayname"], request.params["token"]
        sha1 = Digest::SHA1.hexdigest("a mix of  #{@secret}, #{id}, #{displayname}")

        # check if the request comes from chlk or not
        if sha1 == token
          @id, @username= id, username
          # OmniAuth takes care of the rest
          super
        else
          # OmniAuth takes care of the rest
          fail!(:invalid_credentials)
        end
      end

      # normalize user's data according to http://github.com/intridea/omniauth/wiki/Auth-Hash-Schema
      def auth_hash
        OmniAuth::Utils.deep_merge(super(), {
            'uid' => @id,
            'user_info' => {
                'name'     => @username,
                'nickname' => @username
            }
        })
      end
    end
  end
end