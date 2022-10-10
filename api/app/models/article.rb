class Article < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  # optional は,アソシエーションによるデフォルトのエラーメッセージが変更できないため,仕方なく記載
  # 独自に :〇〇_id, presence: { message ... } でメッセージ作成
  belongs_to :period, optional: true
  belongs_to :prefecture, optional: true
  has_many :likes, dependent: :destroy
  has_many :liked_user, through: :likes, source: :user
  has_one_attached :image

  validates :title, presence: true, length: { maximum: 100 }
  validates :lat, presence: { message: 'を立ててください' }
  validates :user_id, presence: true
  validates :prefecture_id, presence: { message: 'を選択してください' }
  validates :period_id, presence: { message: 'を選択してください' }

  def self.customised_articles
    # Article.all.includes(image_attachment: :blob, user: :avatar_attachment)
    with_attached_image.includes(:liked_user, user: { avatar_attachment: :blob })
  end

  def image_url
    image.attached? ? url_for(image) : nil
  end

  def created_time
    created_at.to_f * 1000
  end
end
