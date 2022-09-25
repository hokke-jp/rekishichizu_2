FactoryBot.define do
  factory :user do
    name { 'Alice' }
    introduction { '' }
    email { 'alice@example.com' }
    password { 'password' }
  end
end
