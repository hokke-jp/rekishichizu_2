class CreatePrefectures < ActiveRecord::Migration[7.0]
  def change
    create_table :prefectures, &:timestamps
  end
end
