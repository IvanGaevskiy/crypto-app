class DatetimeValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.present?
      begin
        value.is_a?(String) ? DateTime.parse(value) : value.to_datetime
      rescue ArgumentError
        record.errors.add(attribute, options[:message] || "must be a valid datetime")
      end
    end
  end
end
