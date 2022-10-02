class Article < ApplicationRecord
  belongs_to :user
  belongs_to :period
  belongs_to :prefecture

  validates :user_id, presence: true
  validates :prefecture_id, presence: { message: 'を選択してください' }
  validates :period_id, presence: { message: 'を選択してください' }
  validates :title, presence: true
  validates :lat, presence: { message: 'を立ててください' }
  validates :lng, presence: { message: 'を立ててください' }
end
