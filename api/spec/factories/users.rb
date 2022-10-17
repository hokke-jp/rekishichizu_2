FactoryBot.define do
  factory :user do
    name { 'Alice' }
    introduction { '' }
    email { 'alice@test.com' }
    password { 'password' }
  end
end
