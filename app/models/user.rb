class User < ApplicationRecord
  has_many :shows, through: :binge_shows
end
