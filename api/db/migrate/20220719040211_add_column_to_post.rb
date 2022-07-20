class AddColumnToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :title, :string
    add_column :posts, :content, :text
  end
end
