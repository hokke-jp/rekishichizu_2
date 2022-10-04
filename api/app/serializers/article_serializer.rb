class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :lat, :lng, :image_url, :period_id, :prefecture_id, :user_id, :created_at
  belongs_to :user
  class UserSerializer < ActiveModel::Serializer
    attributes :name, :avatar_url
  end
end
