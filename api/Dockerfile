FROM ruby:3.1.2

ENV APP_PATH /api
ENV TZ Asia/Tokyo

WORKDIR $APP_PATH
COPY Gemfile Gemfile.lock $APP_PATH
RUN gem install bundler
RUN bundle install
# RUN bundle install --without test development

COPY . $APP_PATH
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# CMD ["/bin/sh", "-c", "DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:reset && bundle exec rails db:seed && rm -f tmp/pids/unicorn.pid && bundle exec unicorn -p 3000 -c /api/config/unicorn.rb -E production"]
CMD ["/bin/sh", "-c", "bundle exec rails db:migrate && bundle exec rails db:seed && rm -f tmp/pids/unicorn.pid && bundle exec unicorn -p 3000 -c /api/config/unicorn.rb -E production"]
