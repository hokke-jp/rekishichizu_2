class String
  # 全角スペースを含むstripメソッド
  def strip_zenkaku
    gsub(/\A[ 　\t\r\n\f\v]*|[ 　\t\r\n\f\v\0]*\Z/, '')
  end

  # 全角スペースを含むstrip!メソッド（破壊的）
  def strip_zenkaku!
    gsub!(/\A[ 　\t\r\n\f\v]*|[ 　\t\r\n\f\v\0]*\Z/, '')
  end
end
