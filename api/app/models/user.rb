# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  NAME_REGEX = /\A[a-zA-Z\p{Hiragana}\p{Katakana}\p{Han}\d_ー-]+\z/.freeze
  validates :name, presence: true, uniqueness: true, length: { maximum: 20 }, exclusion: { in: %w[login createAccount post] },
                   format: { with: NAME_REGEX, message: 'に使用できる文字は「半角英数字」「日本語」「-」ハイフン「_」アンダーバーのみです' }
end
