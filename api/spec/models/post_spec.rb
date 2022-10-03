# require 'rails_helper'

# RSpec.describe Post, type: :model do
#   it '有効な投稿なら検証に通る' do
#     expect(Post.new(title: 'テスト:タイトル', content: 'テスト:内容')).to be_valid
#   end
#   it 'タイトルは0文字では無効である' do
#     expect(Post.new(title: '', content: 'test')).to_not be_valid
#   end
#   it 'タイトルは1文字以上,100文字以内で有効である' do
#     expect(Post.new(title: '12345', content: 'test')).to be_valid
#   end
#   it 'タイトルは100文字以上では無効である' do
#     expect(Post.new(title: 'a' * 101, content: 'test')).to_not be_valid
#   end

#   it 'コンテンツは0文字では無効である' do
#     expect(Post.new(title: 'test', content: '')).to_not be_valid
#   end
#   it 'コンテンツは1文字以上,1000文字以内で有効である' do
#     expect(Post.new(title: 'test', content: '12345')).to be_valid
#   end
#   it 'コンテンツは1000文字以上では無効である' do
#     expect(Post.new(title: 'test', content: 'a' * 1001)).to_not be_valid
#   end
# end
