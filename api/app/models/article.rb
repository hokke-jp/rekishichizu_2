class Article < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  belongs_to :period
  belongs_to :prefecture
  has_many :likes, dependent: :destroy
  has_many :liked_user, through: :likes, source: :user

  has_one_attached :image

  validates :title, presence: true
  validates :lat, presence: { message: 'を立ててください' }
  validates :lng, presence: { message: 'を立ててください' }
  validates :user_id, presence: true

  def image_url
    image.attached? ? url_for(image) : nil
  end

  def created_time
    self.created_at.to_f * 1000
  end
end
