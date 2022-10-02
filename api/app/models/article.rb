class Article < ApplicationRecord
  belongs_to :user
  belongs_to :period
  belongs_to :prefecture

  validates :user_id, presence: true
  validates :title, presence: true
  validates :lat, presence: { message: 'を立ててください' }
  validates :lng, presence: { message: 'を立ててください' }
end
