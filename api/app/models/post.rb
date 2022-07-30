class Post < ApplicationRecord
  validates :title, presence: true
  validates :title, presence: true, length: { maximum: 100 }
  validates :content, presence: true
  validates :content, presence: true, length: { maximum: 1000 }
end
