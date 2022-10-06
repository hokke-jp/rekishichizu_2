class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :introduction, :avatar_url, :liking_article_ids, :following_ids
end
