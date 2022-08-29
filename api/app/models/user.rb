# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :name, presence: true, uniqueness: true, exclusion: { in: %w(login createAccount) }, format: { with: /\A[a-zA-Z\p{Hiragana}\p{Katakana}\p{Han}\d_-]+\z/, message: 'に使用できる文字は「半角英数字」「日本語」「-」ハイフン「_」アンダーバーのみです' }
  # validates :name,  length: { maximum: 3 }
end
