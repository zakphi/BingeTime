class ChangeSessionTokenToAuthToken < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :session_token, :auth_token
  end
end
