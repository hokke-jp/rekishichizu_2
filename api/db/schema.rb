# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_221_115_235_701) do
  create_table 'active_storage_attachments', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'name', null: false
    t.string 'record_type', null: false
    t.bigint 'record_id', null: false
    t.bigint 'blob_id', null: false
    t.datetime 'created_at', null: false
    t.index ['blob_id'], name: 'index_active_storage_attachments_on_blob_id'
    t.index %w[record_type record_id name blob_id], name: 'index_active_storage_attachments_uniqueness', unique: true
  end

  create_table 'active_storage_blobs', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'key', null: false
    t.string 'filename', null: false
    t.string 'content_type'
    t.text 'metadata'
    t.string 'service_name', null: false
    t.bigint 'byte_size', null: false
    t.string 'checksum'
    t.datetime 'created_at', null: false
    t.index ['key'], name: 'index_active_storage_blobs_on_key', unique: true
  end

  create_table 'active_storage_variant_records', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'blob_id', null: false
    t.string 'variation_digest', null: false
    t.index %w[blob_id variation_digest], name: 'index_active_storage_variant_records_uniqueness', unique: true
  end

  create_table 'articles', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'title'
    t.text 'content'
    t.float 'lat', null: false
    t.float 'lng', null: false
    t.bigint 'user_id'
    t.bigint 'period_id'
    t.bigint 'prefecture_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'likes_count', default: 0, null: false
    t.index ['period_id'], name: 'index_articles_on_period_id'
    t.index ['prefecture_id'], name: 'index_articles_on_prefecture_id'
    t.index ['user_id'], name: 'index_articles_on_user_id'
  end

  create_table 'likes', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.bigint 'article_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['article_id'], name: 'index_likes_on_article_id'
    t.index %w[user_id article_id], name: 'index_likes_on_user_id_and_article_id', unique: true
    t.index ['user_id'], name: 'index_likes_on_user_id'
  end

  create_table 'periods', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'prefectures', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'relationships', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.integer 'follower_id'
    t.integer 'followed_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['followed_id'], name: 'index_relationships_on_followed_id'
    t.index %w[follower_id followed_id], name: 'index_relationships_on_follower_id_and_followed_id', unique: true
    t.index ['follower_id'], name: 'index_relationships_on_follower_id'
  end

  create_table 'users', charset: 'utf8mb4', collation: 'utf8mb4_0900_ai_ci', force: :cascade do |t|
    t.string 'provider', default: 'email', null: false
    t.string 'uid', default: '', null: false
    t.string 'encrypted_password', default: '', null: false
    t.boolean 'allow_password_change', default: false
    t.string 'name'
    t.string 'introduction'
    t.string 'email'
    t.text 'tokens'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['email'], name: 'index_users_on_email', unique: true
    t.index ['name'], name: 'index_users_on_name', unique: true
    t.index %w[uid provider], name: 'index_users_on_uid_and_provider', unique: true
  end

  add_foreign_key 'active_storage_attachments', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'active_storage_variant_records', 'active_storage_blobs', column: 'blob_id'
  add_foreign_key 'articles', 'periods'
  add_foreign_key 'articles', 'prefectures'
  add_foreign_key 'articles', 'users'
  add_foreign_key 'likes', 'articles'
  add_foreign_key 'likes', 'users'
end
