class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :lat, :lng, :period_id, :prefecture_id, :user_id
  belongs_to :user
  class UserSerializer < ActiveModel::Serializer
    attributes :name, :avatar_url
  end
end
