FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "第#{n}回タイトル" }
    sequence(:content) { |n| "第#{n}回説明文" }
    lat { 37.5 }
    lng { 137.2 }
    association :user
  end
end
