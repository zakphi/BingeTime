class CreateBingeShows < ActiveRecord::Migration[5.1]
  def change
    create_table :binge_shows do |t|
      t.integer :user_id
      t.integer :tvshow_id

      t.timestamps
    end

    add_index :binge_shows, :user_id
    add_index :binge_shows, :tvshow_id
  end
end
