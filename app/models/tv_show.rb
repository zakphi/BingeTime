class TvShow < ApplicationRecord
  has_many :users, through: :binge_shows
end
