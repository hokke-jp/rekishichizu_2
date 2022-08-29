class NameValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors.add(attribute, "使用できない単語です") if ["login", "createAccount"].include?(value)
  end
end
