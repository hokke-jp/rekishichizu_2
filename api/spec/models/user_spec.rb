require 'rails_helper'

RSpec.describe User, type: :model do
  it 'パラメータが妥当なら検証に通る' do
    expect(build(:user)).to be_valid
  end

  describe 'ユーザー名属性' do
    it 'ユーザー名は1文字以上,20文字以内で有効である' do
      expect(build(:user, name: '')).to_not be_valid
      expect(build(:user, name: 'a' * 20)).to be_valid
      expect(build(:user, name: 'a' * 21)).to_not be_valid
    end
    it '予め用意してあるURLと同じ名前は無効である' do
      expect(build(:user, name: 'login')).to_not be_valid
      expect(build(:user, name: 'createAccount')).to_not be_valid
      expect(build(:user, name: 'post')).to_not be_valid
    end
    it '半角英数字,日本語,-,_以外の文字は無効である' do
      expect(build(:user, name: '!')).to_not be_valid
      expect(build(:user, name: '"')).to_not be_valid
      expect(build(:user, name: '#')).to_not be_valid
      expect(build(:user, name: '$')).to_not be_valid
      expect(build(:user, name: '%')).to_not be_valid
      expect(build(:user, name: '&')).to_not be_valid
      expect(build(:user, name: '(')).to_not be_valid
      expect(build(:user, name: ')')).to_not be_valid
      expect(build(:user, name: '=')).to_not be_valid
      expect(build(:user, name: '^')).to_not be_valid
      expect(build(:user, name: '~')).to_not be_valid
      expect(build(:user, name: '|')).to_not be_valid
      expect(build(:user, name: '\\')).to_not be_valid
      expect(build(:user, name: '\'')).to_not be_valid
      expect(build(:user, name: '¥')).to_not be_valid
      expect(build(:user, name: '@')).to_not be_valid
      expect(build(:user, name: '`')).to_not be_valid
      expect(build(:user, name: '[')).to_not be_valid
      expect(build(:user, name: ']')).to_not be_valid
      expect(build(:user, name: '{')).to_not be_valid
      expect(build(:user, name: '}')).to_not be_valid
      expect(build(:user, name: ';')).to_not be_valid
      expect(build(:user, name: '+')).to_not be_valid
      expect(build(:user, name: ':')).to_not be_valid
      expect(build(:user, name: '*')).to_not be_valid
      expect(build(:user, name: ',')).to_not be_valid
      expect(build(:user, name: '<')).to_not be_valid
      expect(build(:user, name: '>')).to_not be_valid
      expect(build(:user, name: '.')).to_not be_valid
      expect(build(:user, name: '/')).to_not be_valid
      expect(build(:user, name: '?')).to_not be_valid
    end
    it 'ユーザー名は一意ではないと無効である' do
      create(:user, name: 'Bob')
      expect(build(:user, name: 'Bob')).not_to be_valid
    end
  end

  describe 'introduction属性' do
    it '200文字以内は有効である' do
      expect(build(:user, introduction: '')).to be_valid
      expect(build(:user, introduction: 'a' * 200)).to be_valid
    end
    it '201文字以上は無効である' do
      expect(build(:user, introduction: 'a' * 201)).not_to be_valid
    end
  end

  describe 'メールアドレス属性' do
    it 'メールアドレスは0文字では無効である' do
      expect(build(:user, email: '')).not_to be_valid
    end
    it 'メールアドレスは一意ではないと無効である' do
      create(:user, email: 'bob@example.com')
      expect(build(:user, email: 'bob@example.com')).not_to be_valid
    end
    it 'メールアドレスが妥当なフォーマットなら有効である' do
      valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
                           first.last@foo.jp alice+bob@baz.cn]
      valid_addresses.each do |valid_address|
        expect(build(:user, email: valid_address)).to be_valid
      end
    end
    it 'メールアドレスが妥当なフォーマットでないなら無効である' do
      invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                             foo@bar_baz.com foo@bar+baz.com]
      invalid_addresses.each do |invalid_address|
        expect(build(:user, email: invalid_address)).not_to be_valid
      end
    end
  end

  describe 'パスワード属性' do
    it 'パスワードがスペースだけなら無効である' do
      expect(build(:user, password: ' ' * 6)).not_to be_valid
    end
    it 'パスワードは6文字以上,128文字以内で有効である' do
      expect(build(:user, password: 'a' * 5)).not_to be_valid
      expect(build(:user, password: 'a' * 128)).to be_valid
      expect(build(:user, password: 'a' * 129)).not_to be_valid
    end
  end
end
