class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content
      t.float :lat, null: false
      t.float :lng, null: false
      t.references :user, foreign_key: true
      t.references :period, foreign_key: true
      t.references :prefecture, foreign_key: true

      t.timestamps
    end
  end
end
