require 'rails_helper'

RSpec.describe Like, type: :model do
  let!(:user) { create(:user) }
  let!(:period) { Period.create! }
  let!(:prefecture) { Prefecture.create! }
  let!(:article) { create(:article, user_id: user.id, period_id: period.id, prefecture_id: prefecture.id) }
  let(:like) { Like.new(user_id: user.id, article_id: article.id) }

  it 'user_id、article_id両方ある場合OK' do
    expect(like).to be_valid
  end

  it 'user_idがない場合はNG' do
    like.user_id = nil
    expect(like).not_to be_valid
  end

  it 'article_idがない場合はNG' do
    like.article_id = nil
    expect(like).not_to be_valid
  end

  context 'userとarticleのlikeを保存した場合' do
    before do
      like.save
    end

    it 'userのlikeにarticleが含まれる' do
      expect(user.likes.map(&:article_id)).to include article.id
    end

    it 'articleのlikeにuserが含まれる' do
      expect(article.likes.map(&:user_id)).to include user.id
    end

    it 'likeをdestroyするとどちらも含まれなくなる' do
      Like.destroy(like.id)
      expect(user.likes.map(&:article_id)).not_to include article.id
      expect(article.likes.map(&:user_id)).not_to include user.id
    end
  end
end
