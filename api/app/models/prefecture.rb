class Prefecture < ApplicationRecord
  has_many :articles, dependent: :nullify
end
