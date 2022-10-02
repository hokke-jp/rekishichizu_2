Post.create!(
  title: '本番環境テスト投稿',
  content: '2022/07/25,11:00これは本番環境をテスト構築するために作られたサイトです'
)

user = User.create!(
  name: 'sample',
  email: 'sample@mail.com',
  password: 'password'
)
user.avatar.attach(io: File.open(Rails.root.join('db/seed_data/avatar_8.jpg')), filename: 'avatar.jpg', content_type: 'image/jpg')

17.times do
  Period.create!
end
47.times do
  Prefecture.create!
end
