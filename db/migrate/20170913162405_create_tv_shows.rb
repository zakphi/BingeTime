class CreateTvShows < ActiveRecord::Migration[5.1]
  def change
    create_table :tv_shows do |t|
      t.integer :external_id
      t.string :title
      t.text :summary
      t.string :poster_path
      t.integer :run_time

      t.timestamps
    end
  end
end
