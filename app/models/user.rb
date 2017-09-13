class User < ApplicationRecord
  validates_uniqueness_of :username
  has_secure_password

  has_many :shows, through: :binge_shows
end
