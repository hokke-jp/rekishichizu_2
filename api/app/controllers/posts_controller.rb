class PostsController < ApplicationController
  def root
    render json: { 'greeting' => 'Hello!', 'time' => Time.zone.now }
  end

  def index
    posts = Post.all
    render json: posts
  end
end
