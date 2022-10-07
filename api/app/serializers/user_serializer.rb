class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :introduction, :avatar_url, :article_ids, :liking_article_ids, :following_ids
end
