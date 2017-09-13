class BingeShow < ApplicationRecord
  belongs_to :users
  belongs_to :tv_shows
end
