FROM ruby:3.1.2

ENV TZ Asia/Tokyo
ENV LANG C.UTF-8

WORKDIR /api
# ボリュームを参照するため開発環境では不要. 本番環境はgemを含んだimageをアップロードする必要があるため必要.
# COPY Gemfile Gemfile.lock ./
# RUN gem install bundler -v 2.3.7
# RUN bundle install
# RUN bundle install --path vendor/bundle --without test development

COPY . .
EXPOSE 3000

# CMD ["/bin/sh", "-c", "DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:reset && bundle exec rails db:seed && rm -f tmp/pids/unicorn.pid && bundle exec unicorn -p 3000 -c /api/config/unicorn.rb -E production"]
CMD ["/bin/sh", "-c", "bundle exec rails s -b '0.0.0.0'"]
