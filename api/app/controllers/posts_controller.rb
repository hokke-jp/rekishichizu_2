class PostsController < ApplicationController
  def root
    render json: { 'greeting' => 'こんにちは!', 'time' => Time.zone.now }
  end

  def index
    posts = Post.all
    render json: posts
  end
end
