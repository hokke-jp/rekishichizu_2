class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :introduction, :avatar_url
end
