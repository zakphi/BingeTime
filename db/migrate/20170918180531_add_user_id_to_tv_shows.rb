class AddUserIdToTvShows < ActiveRecord::Migration[5.1]
  def change
    add_reference :tv_shows, :user, index: true
  end
end
