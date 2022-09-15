# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  include Rails.application.routes.url_helpers

  has_one_attached :avatar

  NAME_REGEX = /\A[a-zA-Z\p{Hiragana}\p{Katakana}\p{Han}\d_ー-]+\z/.freeze
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }, exclusion: { in: %w[login createAccount post] },
                   format: { with: NAME_REGEX, message: 'に使用できる文字は「半角英数字」「日本語」「-」ハイフン「_」アンダーバーのみです' }

  validate :avatar_presence, :avatar_size, on: :update

  def avatar_presence
    if avatar.attached?
      errors.add(:avatar, 'にはjpegまたはpngファイルを添付してください') unless avatar.content_type.in?(%('image/jpeg image/png'))
    else
      errors.add(:avatar, 'ファイルを添付してください')
    end
  end

  def avatar_size
    return unless avatar
    return if avatar.blob.byte_size < 2.megabytes

    avatar.purge
    errors.add(:avatar, 'のファイルは2MB以内にしてください')
  end

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
