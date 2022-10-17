class Period < ApplicationRecord
  has_many :articles, dependent: :nullify
end
