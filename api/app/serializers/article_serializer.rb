class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :lat, :lng, :created_time, :image_url, :user_id, :period_id, :prefecture_id, :liked_user_ids
  belongs_to :user
  class UserSerializer < ActiveModel::Serializer
    attributes :name, :avatar_url
  end
end
