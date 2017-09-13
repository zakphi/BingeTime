class RemoveIndexFromAuthToken < ActiveRecord::Migration[5.1]
  def change
    remove_index :users, column: :auth_token
  end
end
