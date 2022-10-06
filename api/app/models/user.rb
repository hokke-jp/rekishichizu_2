# frozen_string_literal: true

class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  include Rails.application.routes.url_helpers

  has_one_attached :avatar
  has_many :articles, dependent: :destroy
  has_many :active_relationships, class_name: 'Relationship',
                                  foreign_key: 'follower_id',
                                  dependent: :destroy
  has_many :passive_relationships, class_name: 'Relationship',
                                   foreign_key: 'followed_id',
                                   dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :likes, dependent: :destroy
  has_many :liking_article, through: :likes, source: :article

  validates :email, uniqueness: true
  NAME_REGEX = /\A[a-zA-Z\p{Hiragana}\p{Katakana}\p{Han}\d_ー-]+\z/.freeze
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }, exclusion: { in: %w[login createAccount post] },
                   format: { with: NAME_REGEX, message: 'に使用できる文字は「半角英数字」「日本語」「-」ハイフン「_」アンダーバーのみです' }
  validates :introduction, length: { maximum: 200 }
  validate :avatar_type, :avatar_size, on: :update

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    active_relationships.find_by(followed_id: other_user.id).destroy
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def like(article)
    liking_article << article
  end

  def unlike(article)
    likes.find_by(article_id: article.id).destroy
  end

  private

  def avatar_type
    return unless avatar.attached?
    return if avatar.content_type.in?(%('image/jpeg image/png'))

    avatar.purge
    errors.add(:avatar, 'にはjpegまたはpngファイルを添付してください')
  end

  def avatar_size
    return unless avatar.attached?
    return if avatar.blob.byte_size < 2.megabytes

    avatar.purge
    errors.add(:avatar, 'ファイルの大きさは2MB以内にしてください')
  end
end
