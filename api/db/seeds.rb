17.times do
  Period.create!
end
47.times do
  Prefecture.create!
end

USER_NAMES = %w[北海道一郎 東北二郎 関東三郎 中部四郎 近畿五郎 中国六郎 四国七郎 九州八郎 サンプルユーザー].freeze
USER_EMAILS = ['hokkaido@mail.com', 'tohoku@mail.com', 'kanto@mail.com', 'tyubu@mail.com', 'kinki@mail.com', 'tyugoku@mail.com', 'shikoku@mail.com', 'kyusyu@mail.com', 'sample@mail.com'].freeze
USER_INTRODUCTIONS = [
  '北海道地方担当のサンプルユーザーです',
  '東北地方担当のサンプルユーザーです',
  '関東地方担当のサンプルユーザーです',
  '中部地方担当のサンプルユーザーです',
  '近畿地方担当のサンプルユーザーです',
  '中国地方担当のサンプルユーザーです',
  '四国地方担当のサンプルユーザーです',
  '九州地方担当のサンプルユーザーです',
  'サンプルユーザーです。
  編集はできません。'
].freeze
ARTICLE_TITLES = [
  ['榎本軍鷲ノ木上陸地跡'],
  [
    '古代日本の遺産。青森県大平山本（おおだいらやまもと）遺跡',
    '後藤新平旧宅',
    '瑞鳳殿（ずいほうでん）',
    '大湯環状列石',
    '悪い縁を切り良縁を結ぶ、山形県屈指のパワースポット「山寺」',
    '会津戊辰戦争がよみがえる！ 難攻不落の名城・鶴ヶ城'
  ],
  [
    '烈公・徳川斉昭が開設した藩校「弘道館」',
    '江戸幕府初代将軍徳川家康を神としてまつる神社「日光東照宮」',
    '日本の近代化を支えた、富岡製糸場',
    '特別史跡　埼玉古墳群',
    '葛飾北斎「神奈川沖浪裏」に似た構図が見られる地、千葉県銚子市',
    '【忠臣蔵】吉良邸跡',
    '北条政子の墓、鎌倉・寿福寺'
  ],
  [
    '軍神・上杉謙信の居城「春日山城跡」',
    '世紀の大工事「黒部ダム」',
    '日本三名園「兼六園」',
    '禅・曹洞宗始まりの寺「永平寺」',
    '日蓮宗の総本山「久遠寺」',
    '川中島の今の姿',
    '信長の本拠地【岐阜城】',
    '北条早雲旗揚げの城・興国寺城',
    '日本書紀が伝える伝説、草薙の剣を祀る「熱田神宮」'
  ],
  [
    '本居宣長旧宅',
    '紫式部ゆかりの寺、石山寺',
    '法然上人ご終焉の地・知恩院「勢至堂」',
    '民のかまど。仁徳天皇のお墓。',
    '「源平合戦」一の谷　戦の濱碑',
    '現存する世界最古の木造建築「法隆寺」',
    '天空の聖地　高野山金剛峯寺（こうやさんこんごうぶじ）'
  ],
  [
    '後醍醐天皇が休憩に使った「船上山行宮碑」',
    '伝説の怪物・八俣遠呂智(ヤマタオロチ)が枕にした山・草枕山',
    '桃太郎伝説ゆかりの地 岡山県「鬼ノ城」',
    '戦艦「大和」を建造した港・呉',
    '日露戦争旅順攻略・乃木希典を祀った「乃木神社」'
  ],
  [
    '日本とドイツの友好物語を現代に伝える「鳴門市ドイツ館」',
    '江戸の天才・平賀源内の墓',
    '愛媛県道後温泉・坊っちゃんカラクリ時計',
    '弘法大師が悟りを開いた場所。御厨人窟(みくろど)'
  ],
  [
    '蒙古襲来から日本を守った「元寇防塁跡」',
    '幻の『邪馬台国』？佐賀県・吉野ヶ里遺跡',
    '長崎港をまたぎ、長崎市西部と南部をつなぐ女神大橋',
    '世界有数の巨大カルデラ「阿蘇山」',
    '全国約44,000社・八幡宮の総本社「宇佐神宮」',
    '天孫降臨・日本の歴史が始まった土地。',
    '「海軍の父」山本権兵衛誕生地',
    '今帰仁城跡（なきじんじょうあと）'
  ],
  [
    '福岡・久留米が生んだ天才「田中久重」',
    '3500万年前の化石「夜宮の大珪化木」',
    '「万葉集」で読まれた土地。北九州戸畑・夜宮（よみや）公園万葉歌碑',
    '乃木希典居住宅の趾'
  ]
].freeze
ARTICLE_CONTENTS = [
  [
    '国道5号から1本海側の道に下りると、駒ヶ岳と噴火湾を眺望できる場所に辿り着きます。1868（明治元）年10月20日、徳川家臣の榎本武揚が軍艦8隻、2500～3000人の兵を率いて上陸。22日に先発隊が官軍の攻撃を受けて応戦したため、土方歳三と大島圭介の2隊に分かれて一路、箱館を目指しました。ここから箱館戦争が始まった、歴史上の要所です'
  ],
  [
    '　この大平山本遺跡からは世界最古、1万6000年前の土器が出土しています。もともと日本全土で出土する土器はどれも世界と比較して古い傾向がありまが、その中でも大平山本遺跡の土器は世界最古と言われています。',
    '　後藤新平といえば、明治時代、戊辰戦争の影響でまだまだ東北出身者が活躍しにくかった頃、己の力だけで出世し、初代満鉄総裁を務めたり内務大臣として関東大震災の復興に当たった人物です。
    　後藤が残した言葉をご紹介します。
    「金を残して死ぬ者は下だ。仕事を残して死ぬ者は中だ。人を残して死ぬ者は上だ。」',
    '仙台藩祖伊達政宗公の遺言により建てられた霊屋です。現在の建物は戦争で焼失以前の瑞鳳殿を手本に1979年に再建されたものとなっています。柱には彫刻獅子頭を、屋根には竜頭瓦を復元し、豪華絢爛な桃山文化の遺風を伝えています。二代藩主伊達忠宗公の「感仙殿」、三代藩主伊達綱宗公の「善応殿」も同じ境内に建っています。',
    '大湯川左岸の台地に営まれた縄文時代後期の大規模な祭祀遺跡です。
    万座、野中堂の2つの環状列石が代表的な物で、ほかに環状、方形などの配石があります。万座環状列石の直径は52m、野中堂環状列石は42mで、これらを囲むように掘立柱建物跡があります。
    環状列石は、十数個の組石遺構が群をなし二重の環状に配置されており、それを囲んで規則的に配置された掘立柱建物は、葬送儀礼などを行う施設であろうと考えられています。
    ベンガラを塗った壺や台付土器、土偶や鐸形土製品、キノコ形土製品、足形土製品、石刀など祈りとマツリに関係すると考えられる道具も多数出土しています。
    現在、環状列石の外側に建物が復元され、縄文の雰囲気を感じることができるように整備されています。',
    '正しくは「宝珠山立石寺」という天台宗の山。ブナ材の建築物では日本最古といわれる国指定重要文化財の根本中堂をはじめ、奥の院に続く約1,000段の石段に沿って様々なお堂が配置されています。「納経堂」は切り立つ岩の上に建つ山寺最古の建物です。松尾芭蕉が「閑さや岩にしみ入る蝉の声」を詠んだのもこの地で、その句碑が立てられています。',
    '至徳元(1384)年に、葦名直盛が築いた東黒川館が発祥という「鶴ヶ城」。戊辰戦争では約1ヶ月に及ぶ激しい攻防戦に耐えた、難攻不落の名城とも謳われます。明治7年に取り壊された後、昭和40年に再建。平成23年には赤瓦へのふき替えが完了し幕末当時の姿を再現し、現存する天守閣では国内唯一の赤瓦の天守閣となっています。内部は郷土博物館としても公開されています。'
  ],
  [
    '水戸といえば、幕末に水戸学と呼ばれる思想を発信し、日本全土へ影響を及ぼしました尊王攘夷運動の先駆けとなった土地です。外国勢力への懸念と国力増強を希求する憂国の士をこの弘道館から多く輩出しました。
  水戸学の思想は幕末から明治にかけての日本に多大な影響を与えました。',
    '　日光東照宮は、元和（げんな）3年（1617）徳川初代将軍徳川家康公を御祭神におまつりした神社です。家康公は、天文（てんぶん）11年（1542）12月26日三河国岡崎城（愛知県岡崎市）でご誕生になり、幼少より苦労を重ね戦国乱世を平定され、幕藩体制を確立されました。そして、世の中に秩序と組織を形成し、学問を勧め産業を興し、江戸時代260年間にわたる平和と文化の礎を築き、近代日本の発展に多大な貢献をされました。
  　家康公は、元和2年4月17日駿府城（静岡県静岡市）で75歳の生涯を終えられ、直ちに久能山に神葬されました。そして御遺言により、一年後の元和3年4月15日、久能山より現在の地に移されおまつりされました。正遷宮は、同年4月17日二代将軍秀忠公をはじめ公武参列のもと厳粛に行われ、ここに東照社として鎮座しました。その後正保（しょうほ）2年（1645）宮号を賜り、東照宮と呼ばれるようになりました。
  　尚、現在のおもな社殿群は、三代将軍家光公によって、寛永（かんえい）13年（1636）に造替されたものです。',
    '富岡製糸場（とみおかせいしじょう）は、群馬県富岡に設立された日本初の本格的な機械製糸の工場である。1872年（明治5年）の開業当時の繰糸所、繭倉庫などが現存している。日本の近代化だけでなく、絹産業の技術革新・交流などにも大きく貢献した工場であり、敷地を含む全体が国の史跡に、初期の建造物群が国宝および重要文化財に指定されている。また、「富岡製糸場と絹産業遺産群」の構成資産として、2014年6月21日の第38回世界遺産委員会（ドーハ）で正式登録された。',
    '「埼玉古墳群」は、県名発祥の地「埼玉（さきたま）」にあります。古墳群は５世紀後半から７世紀中頃にかけて、大宮台地の北端に連続して築かれた、前方後円墳８基、大型円墳２基、方墳１基並びに小円墳群で構成される古墳群です。台地上の狭い範囲に大型古墳が密集する、全国でも屈指の規模の古墳群です。
  埼玉古墳群は前方後円墳の形態に強い規格性を持っています（①主軸方位が概ねそろう②長方形の二重周堀をもつ③西側に造出しという施設をもつ）。埼玉古墳群はその出土遺物とともに、古墳時代当時の王権との関わりや地域支配の在り方を考究する上で欠くことができない重要な遺跡です。',
    '　海外でも人気な葛飾北斎の通称「波」。実際に描かれた場所については神奈川沖の船上と考えられています。
  　写真は『産経新聞社「美しい日本を撮ろう」フォトコンテスト』で滑方清さんが撮影された一枚です。',
    '　吉良邸は、元々は鍛冶橋の方にありましたが、刃傷事件の後、赤穂浪士が吉良邸に討ち入るという噂があり、周囲の大名屋敷から苦情が出て、元禄十四年(1703年)8月に幕府に召し上げられ、そして9月にここ本所松坂町の屋敷を拝領し移り住みました。ここに移り住み1年3ヵ月後には討ち入られました。移住させられたことによって、江戸城近くの鍛治橋の屋敷に比べ格段に討ち入りが容易になったと世間から言われたようです。
  　研究者によれば浅井内匠頭は癇癪持ちだったそうです。刃傷事件当日に実際に何があったかは分かりませんが、忠臣蔵の本当の被害者は、周りの大名から追い出され、しまいには討ち入りまでされ、後世に散々悪者にされている吉良上野介だったのかもしれません。',
    '　北条政子は尼将軍として鎌倉幕府を支えた女性で、「最後の詞」演説が有名です。彼女は後世「日本三大悪女」の一人に数えられますが、リーダーとしての能力は後世に語り継がれるほどのもでした。'
  ],
  [
    'この城は、南北朝時代に越後国守護である上杉氏が越後府中の館の詰め城として築城したのが始まりとされる。1507年（永正4年）、守護代であった長尾為景が上杉定実を擁立して守護上杉房能を追放した。新守護として定実が府中に入ると、長尾氏が春日山城主となった。
    上越市中部にある春日山山頂に築かれ、天然の要害を持つ難攻不落の城とされ、為景、晴景、上杉謙信（長尾景虎）、上杉景勝の四代の居城となった。しかし、上杉景勝が会津へ移った後に越後を支配した堀氏は、政治を取り仕切るに不便として、1607年（慶長12年）に直江津港近くに福島城を築城して移り、春日山城はその役目を終えた。
    別名を鉢ヶ峰城ともいう。「春日山」の名称は、奈良の春日大社から分霊勧請（かんじょう）した春日神社に由来する。春日神社の創建年代は、958年（天徳2年）説、守護上杉氏の築城の際とする説、文明年間（1469年～86年）という説などがありはっきりしない。
    地域支配と侵攻に対抗するための拠点として、要害の地に支城・砦・館が配置されていた。山中には春日山城と支城・砦を結ぶ軍事用道路があった。
    日本五大山城の一つとされることもある。',
    '黒部ダムは、富山県東部の立山町を流れる黒部川水系の黒部川に建設された水力発電専用のダムである。1956年（昭和31年）着工、太田垣士郎指揮の下、171人の殉職者を出し7年の歳月をかけて、1961年1月に送電を開始し、1963年（昭和38年）に完成した。貯水量2億トン。
    黒部ダムの水は平均水温4度。ダム右岸の取水口から、山中に掘られた導水路（専用トンネル）を通って、約10キロメートル下流の地下に建設された黒部川第四発電所（黒四）に送られて、ダムとの545.5メートルの落差で発電する。この発電所の名称から黒四ダム（くろよんダム）とも呼ばれる。
    黒部ダム建設の経緯は第二次世界大戦後の復興期に遡る。当時は、関西地方は深刻な電力不足により、復興の遅れと慢性的な計画停電が続き、深刻な社会問題となっていた。決定的な打開策として、関西電力は、大正時代から過酷な自然に阻まれ何度も失敗を繰り返した黒部峡谷での水力発電以外に選択肢を見出せず、当時、人が行くこと自体が困難で命がけだったその秘境の地でのダム建設案に、太田垣社長（当時）は「黒部しかない」「関西の消費電力を一気に賄える」「工期7年、遅れれば関西の電力は破綻する」と決断し、資本金の3倍（最終的に5倍）の総工費で臨んだ。完成当時、大阪府の電力需要の50%（25万kW）を賄ったことでも知られ、東京に追いつくべく産業も重工業への転換がようやく可能になった。',
    'かつては加賀百万石の城下町、現在は石川県の県庁所在地として栄える古都・金沢を代表する風景といえば、この兼六園。春はサクラ、初夏はカキツバタ、秋は紅葉、そして冬は雪吊りと、四季折々に違った顔を見せる、大規模な回遊式庭園です。元々は加賀藩主・前田氏の私有地として非公開でしたが、明治7年より一般公開されるようになりました。ちなみに「兼六園」という命名は、寛政の改革で知られる江戸時代中期の幕府老中・松平定信によるものです。
    日本三名園にも数えられ、名前の由来になった「宏大」「幽邃」「人力」「蒼古」「水泉」「眺望」の六勝を併せ持つ庭園は、加賀百万石の歴代藩主により培われた歴史的文化遺産でもあります。四季折々の美しさに定評があり、特に春は1つの花に約300枚の花びらをもつ「兼六園菊桜」や、冬の風物詩・雪吊りは幽玄な美しさに魅了されます。園内にはお休み処も多く、加賀名物の治部煮をアレンジした麺類や、創業140年も続く団子など、兼六園グルメも楽しめます。',
    '大本山永平寺は１２４４年、道元禅師が４５歳のとき、波多野義重（はたの よししげ）公の願いによって、越前（福井県）に大仏寺を建立し、２年後に永平寺と改められたことに始まる。
    禅は鈴木大拙により世界に伝えられ、広く日本を代表する文化の一つと捉えられている。
    日本には大きく分けて臨済宗と曹洞宗の二つの禅宗がある。栄西を祖とする臨済宗は「公案」という禅問答を手掛かりに悟りの境地を目指す。煩悩で覆われた人間が問答を通して「見性（明らかに見る）」によって迷いから脱するという考えである。対して、道元を祖とする曹洞宗では、ただひたすらに坐禅を行うことを肝要とし、坐禅をすれば悟りが開けるという他の禅とは異なり、坐禅そのものが悟りの目的であるという。どちらも鎌倉〜室町時代にかけて武士に取り入れられ普及した歴史を持つ。',
    '平安末期、仏僧の退廃を見かねた者たちから起こった仏教刷新の新宗派誕生の流れの中で日蓮宗も生まれました。
  当時流行し始めていた浄土宗、浄土真宗が「南無阿弥陀仏」を唱えるのに対して、日蓮宗は「南無妙法蓮華経」の7文字の「お題目」を唱えることで、人々は救われ即身成仏ができると考えられています。
  戦前、石原莞爾などの人物が入会した国柱会や、現在、国政に大きな影響力を持つ創価学会などの源流となる宗教であり、後世への影響力は大きいこともあり、現在でも学び直すべき宗教でしょう。
  写真はそんな日蓮宗の総本山・久遠寺の写真です。久遠寺は弘安4年（1281年）に日蓮によって「身延山妙法華院久遠寺」と名付けられたといいます。日蓮は弘安5年（1282年）9月に湯治療養のため常陸（加倉井）の温泉と小湊の両親の墓参りに向かうため身延山を下る途中、信徒であった武蔵国の池上宗仲邸（現在の東京都大田区本行寺）にて病状が悪化したため逗留し、6人の弟子「六老僧」を定めて、同地において同年10月13日に死去しました。「いづくにて死に候とも墓をば身延の沢にせさせ候べく候」との日蓮の遺言に従い、遺骨は身延山に祀られました。',
    '平安末期、仏僧の退廃を見かねた者たちから起こった仏教刷新の新宗派誕生の流れの中で日蓮宗も生まれました。
  当時流行し始めていた浄土宗、浄土真宗が「南無阿弥陀仏」を唱えるのに対して、日蓮宗は「南無妙法蓮華経」の7文字の「お題目」を唱えることで、人々は救われ即身成仏ができると考えられています。
  戦前、石原莞爾などの人物が入会した国柱会や、現在、国政に大きな影響力を持つ創価学会などの源流となる宗教であり、後世への影響力は大きいこともあり、現在でも学び直すべき宗教でしょう。
  写真はそんな日蓮宗の総本山・久遠寺の写真です。久遠寺は弘安4年（1281年）に日蓮によって「身延山妙法華院久遠寺」と名付けられたといいます。日蓮は弘安5年（1282年）9月に湯治療養のため常陸（加倉井）の温泉と小湊の両親の墓参りに向かうため身延山を下る途中、信徒であった武蔵国の池上宗仲邸（現在の東京都大田区本行寺）にて病状が悪化したため逗留し、6人の弟子「六老僧」を定めて、同地において同年10月13日に死去しました。「いづくにて死に候とも墓をば身延の沢にせさせ候べく候」との日蓮の遺言に従い、遺骨は身延山に祀られました。',
    '　戦国時代の最強武将と名高い武田信玄と上杉謙信。川中島はその二人が何度も奪い合い、激しい火花を散らした土地です。
    　写真は最激戦だった第四次川中島の戦いの戦場だった八幡原（はちまんぱら）の今の姿です。',
    '岐阜城（ぎふじょう）は、美濃国井之口の山（稲葉山（現・岐阜県岐阜市の金華山））にあった城（山城跡）。もとは稲葉山城と言い、鎌倉時代以来の歴史があり、本格的に整備されたのは戦国時代の斎藤道三の時期だと考えられ、織田信長が1567年の稲葉山城の戦いにより斎藤龍興から奪取し、本拠地を小牧山から当城へと移し、その縄張りを破却して新たに造営したものが岐阜城である。『信長公記』に「尾張国小真木山より濃州稲葉山へ御越しなり。井口と申すを今度改めて、岐阜と名付けさせられ」と記載されており、ここから天下布武、天下統一をおこなうという意味をこめて、信長が山頂にある城や麓にある町などを「井口」から「岐阜」へと改名したことにより「岐阜城」と呼ばれることになった。
    （大きな複合的な城であり）山上の城郭部分と山麓の居館部分を中心としつつも、それらの間を結ぶ登城路、さらに山中の要所に配された砦もあり、なにより山そのものが天然の要害として機能していた。麓に置かれた城主の館は、山の西麓にある槻谷（けやきだに）にあり、地形は斎藤氏 三代の頃に造られ、信長が大規模に改修をし、大きな池の南北に建物が2つあり大きな庭園があったことが発掘調査で分かっており、有力者なども招かれたらしく、ルイス・フロイスが訪れた記録もあり、関ヶ原の合戦の前哨戦のころまで使われていたという。
    当城の城主は、織田信長の後は、織田信忠、（信長亡き後に）織田信孝、池田元助、池田輝政、豊臣秀勝、織田秀信らであるが、秀信は石田三成の挙兵に呼応し西軍につき、関ヶ原の戦いの前哨戦の岐阜城の戦い（1600年）で東軍側の池田輝政や福島正則らに攻められ落城、翌1601年（慶長6年）徳川家康によってに当城は廃城とされた。',
    '　北条早雲といえば、戦国時代の下剋上の嚆矢として知られますが、必ずしも低い身分の出身ではなかったようです。どちらにしろ、戦国時代の先駆け的な存在の北条早雲。
    　写真はそんな早雲が、駿河守護・今川家の家督争いを鎮めた功績により、東駿河の領地と共に与えられた城です。
    　その後、五代100年におよぶ小田原北条氏の基礎を作った早雲の、戦国大名としての第一歩を踏み出した城がこの興国寺城であり、早雲旗揚げの城と言われています。',
    '「熱田神宮」はいわゆる「三種の神器」の一つ、草薙の剣（くさなぎのつるぎ）を祀る神社として有名な愛知の名所。都市の中心部にありながら、歴史的情緒を感じさせる自然あふれる観光スポットです。熱田社の創建は仲哀天皇元年あるいは646年（大化2年）と伝わっています。約20万平方メートルの境内には樹齢千年を超える楠の木が鎮座。境内の文化殿にある宝物庫には6000点以上もの奉納品が収蔵展示されており、そのうち170点以上が国及び愛知県の指定文化財。常設展に加え企画展も随時開催されており、多くの観光客を魅了しています。
    その他にも、明治天皇が愛知県に行幸されたときに造られた「龍影閣」という建物も、その風流な佇まいから非常に人気のある観光スポット。平成13年に、国の指定文化財建造物に登録されました。また、「熱田神宮」といえば、毎年6月5日に行われる「熱田まつり」が有名で、観光客だけでなく愛知県内からも多くの人出でにぎわいます。'
  ],
  [
    '本居宣長は江戸時代の終わりに「国学」という学問を完成させた人物です。写真は三重県松阪市にある、本居宣長がくらした家です。その宣長は、「日本人は本来どんなものの考え方をしたのか」を知ろうと古い書物を手がかりに研究していました。宣長が好きだったのが「源氏物語」でした。宣長は、「源氏物語」から、平安時代の人びとの考え方を研究しました。宣長は３３歳のとき、賀茂真淵という人物に出会います。賀茂真淵は、「源氏物語」より古い時代に書かれたものを研究していた学者です。宣長は、『古事記』の研究をはじめました。宣長は、『古事記伝』という解説書を書き上げました。さらに、『古事記』の研究を通し、日本に古くからある文化や精神を研究する方法を「国学」という学問にまとめました。宣長の死後、弟子たちによって墓が建てられました。墓は、本居宣長の研究に対する姿勢に心を動かされた人びとによって、今も大切に守られています。',
    '紫式部は世界初の女流作家、また世界で初めて長編小説を作った人物です。紫式部の代表作「源氏物語」は、ここ石山寺から着想を得たといわれており、紫式部ゆかりの地として知られています。また、石山寺は「更級日記」「蜻蛉日記」「枕草子」「和泉式部日記」などの文学作品に描かれ『文学の寺』とも呼ばれています。',
    '現在の知恩院は広大な面積を持っていますが、その発祥はこの勢至堂でした。法然上人が作られた浄土宗の教えをこの場所から広めていたということで、当時この場所が「大谷の地」と呼ばれていました。浄土宗にとって重要な歴史的背景を持ちます。
    法然上人が入滅された時に、紫雲が水面から立ちのぼり、聖衆が来迎したという紫雲水が勢至堂の傍にあります。紫雲水の後ろの崖の上に法然上人の遺骨が納められている御廟堂があります。',
    '　仁徳天皇が、ある日高台に登って遠くをご覧になられました。すると人々の家からは、食事の準備のために煮炊きする煙が少しも上がっていないことに気付いたのです。
    　仁徳天皇は「民のかまどより煙がたちのぼらないのは、貧しくて炊くものがないのではないか。都がこうだから、地方はなおひどいことであろう」と仰せられ、三年間、税を免除されました。税を免除したために朝廷の収入はなくなり、宮殿は大いに荒れました。天皇は衣を新調されず、茅葦屋根が破れ、雨漏りがして、星の光が屋根の隙間から見えるという有様でした。
    　三年がたって、仁徳天皇が同じ高台に出られて、遠くをご覧になると今度は、人々の家々から煮炊きする煙が盛んに立つのをご覧になり、その時、仁徳天皇がこのように言われたということです。
    「高き屋に　のぼりて見れば煙立つ　民のかまどは賑わいにけり」
    　そして、一緒におられた皇后に「私は豊かになった。喜ばしいことだ」とおっしゃったということです。皇后はそれを聞いて「陛下は変なことをおっしゃいますね。衣服には穴があき、屋根が破れているのに、どうして豊かになったといえるのですか」すると「国とは民が根本である。その民が豊かでいるのだから、私も豊かということだ」と言われ、天皇は引き続き、さらに三年間、税をとることをお許しにならず、六年が経過して、やっと税を課して、宮殿の修理をお許しになりました。
    　すると人々は命令もされていないのに、進んで宮殿の修理をはじめ、またたくまに立派な宮殿ができあがったといいます。',
    '「一ノ谷の戦い」は、1184年（寿永3年）、摂津国福原と須磨（現在の兵庫県神戸市兵庫区、中央区、須磨区）を舞台に、すでに都を追われていた平氏が政権奪還をかけて源氏と激突した戦いです。俗に「源平合戦」と呼ばれる源氏と平氏の間で起こった「治承・寿永の乱」（じしょう・じゅえいのらん）の戦いのひとつになります。この戦いは、「源義経」の「鵯越の逆落とし」（ひよどりごえのさかおとし）と呼ばれる奇襲戦によって源氏が大勝し、それまで栄華を極めた平氏が、その後の1185年（寿永4年／元暦2年）の「屋島の戦い」、平氏滅亡となる「壇ノ浦の戦い」へと続いていくこととなり、滅亡に向かうきっかけとなりました。',
    '　法隆寺は約19万平米の広大な境内に125の建造物を有する大寺院です。
    　このお寺は、聖徳太子の父である用明天皇の病気平癒祈願のために建立されたのが始まりであり、鎌倉時代に花開いた日本独自の仏教とは違い、仏教が取り入れられて間もないということもありより大陸からの影響が残されています。現代の寺院建築では考えられないような謎が多く、ミステリアスなお寺と言われています。
    　例えば法隆寺中門の足の数は5本です。通常の場合、門の造り方は大小関係なく「偶数本」で構成され、真ん中が通り抜けられるようになっているのが一般的ですが、この法隆寺の中門だけは、なぜか５本という「奇数」で建てられ、まるで誰も通らせないような造りになっています。諸説色々ありますが今のところ、納得できる確実な説明はありません。
    　また、阿・吽（あ・うん）の仁王像も、奈良時代の初めに作られた塑像（そぞう）といって粘土造りであり、1300年前からここで風雪に耐えながら門番をされています。東大寺の南大門のお像ほどは大きくはありませんが、筋骨隆々でいかにも強そうです。残念ながら吽形の方は、一度深刻なダメージを受け、体の半分は木で補修されています。しかし見た目からは、後補部分は分かりません。当時は造像だけでなく修復の技術水準もかなりのものだったことが分かります。',
    '標高約900ｍ、蓮華のように八葉の峰々に囲まれた山上盆地に広がる高野山は、弘法大師・空海が開いた日本を代表する真言密教の聖地です。
    弘法大師は、密教の道場を開くのにふさわしい地として、都の喧噪から遠く離れた紀伊山地の雄大な自然に抱かれた場所を選びました。国、社会の安泰を祈り、人々のために活躍できる人材も育てたいという思いで活動します。そして、世の中の迷える人や苦しむ人を救うため永遠に祈り、深い瞑想に入りました。
    こうして弘法大師は奥之院に生き続け、世の中の平和と人々の幸福を願っているという大師信仰が生まれました。
    現在も高野山は、僧侶たちが修行を続ける学びの場であるとともに、多くの人々の信仰を集め、親しまれています。'
  ],
  [
    '鳥取県東伯郡琴浦町にある船上山は、中国地方随一と言われる大山の尾根に位置している標高687mの山です。古来から仏教の聖地として有名で、山岳仏教における修練道の山として多くの人が集まっていた歴史を持ち、後醍醐天皇ゆかりの山とも言われています。船上山の山頂には船上山行宮碑が建てられています。頂上付近はなだらかな地形になっており、奥へ進んでいくと船上神社もあります。船上山の山頂は、後醍醐天皇がよくこの場所で休憩したとの言い伝えられている場所です。それを記念して大正13年に行宮碑が建てられました。「お休み場」とも名付けられた山頂の端からは、島根半島から隠岐半島までを遥かに見渡せます。',
    '　一度は聞いたことがある八俣遠呂智伝説。古事記によると"ノ"は添えないそうです。須佐之男命が対峙し、その体から出てきた剣が、天叢雲剣（あめのむらくものつるぎ）、通称、草薙剣（くさなぎのつるぎ）です。その剣は現在でも三種の神器一つとして皇室で受け継がれています。',
    '鬼ノ城（きのじょう）は標高３９７ｍの鬼城山山頂部に築城された古代山城（神籠石式山城）です。 白村江の戦いで唐・新羅連合軍に敗北した大和朝廷は倭（日本）の防衛を目的に、対馬から近畿にかけて多くの防御施設を建設しました。 その一環として６００年代、鬼ノ城を築城。 石塁・土塁による城壁が約２．８ｋｍ連なり、城門４か所、角楼、水門、礎石建物跡、掘立柱建物跡、溜井、烽火場、鍛冶遺構などで構成されています。
    白村江の戦いといえば日本の初めての対外戦争として知られますが、その戦いの起源を持つ城が後に全国的に知られる「桃太郎」物語の舞台とされるのは面白いですね。',
    '世界最大にして最強の戦艦とされる大和は、１９３４（昭和９）年１０月に建造プロジェクトがスタートしました。広島県呉市の呉海軍工廠で１９３７（昭和１２）年１１月に起工され、第二次大戦開戦直後の１９４１（昭和１６）年１２月に竣工。しかし、帝国海軍は大和を前線に出すことはなく、後方の安全な位置での作戦ばかりを取らせ、その結果大和は期待されたほどの戦果はあげられませんでした。そして、大本営は、沖縄の戦いを前に菊水作戦を発令。三月末から連日、鹿児島の基地から沖縄の米艦船に向け、航空特攻。四月九日には、水上部隊も、特攻出撃。戦艦大和が九州沖で沈みました。この時、大和には、食料、弾薬だけでなく、薬品、生理用品、紙幣まで積みこまれました。
    写真はそんな大和を紹介した大和ミュージアムの隣に位置する「大和波止場」です。こちらの波止場は、実寸大の「戦艦大和」の前甲板を模してつくられた見晴らし台があり、造船所や呉港を行き交う船を眺めることの出来るスポットです。',
    '乃木希典は長州萩藩出身の陸軍軍人です。日清・日露戦争での活躍が評価され海軍の東郷平八郎とともに〈聖将〉と呼ばれました。日露戦争では、旅順攻略作戦において指揮を執り、見事成功したものの、二人の息子を亡くし乃木家は後継ぎがいない状態に。さらに多くの日本兵の犠牲者を出してしまった責任から、凱旋帰国した乃木は明治天皇に「仰ぎ願わくば、臣（私）に死を賜え」と平伏したといいます。これに対して、明治天皇は
    「今は死ぬべきときにあらず。もし死を願うなら、朕が世を去りてからにせよ」
    この言葉を受け乃木は、自死を思いとどまりました。その後、多くの皇族や華族が通う学習院院長に任じられ、迪宮裕仁親王（昭和天皇）の教育係も務めました。そして明治45（1912）年7月30日。明治天皇崩御。同年9月13日、明治天皇の大喪の礼が行われた日の午後8時頃、妻・静子とともに自刃して亡くなりました。乃木希典の葬儀には40万人もの人出があったとか。電車の乗客は東京に電車創業以来の人数が乗ったとの記載もあります。そんな乃木を称えて現在、全国に5つの乃木神社が存在します。
    最後に乃木が残した辞世の句を2つ。
    「うつし世を神さりましし大君の　みあとしたひて我はゆくなり」
    「神あかりあかりましぬる大君の　みあとはるかにをろみかまつる」'
  ],
  [
    'かつて鳴門市大麻町（当時の板野郡板東町）には、大正6年～大正9年（1917年～1920年）のおよそ3年間、第一次世界大戦時に日本軍の捕虜となったドイツ兵を収容した「板東俘虜収容所」が存在しました。
    板東俘虜収容所では、所長である松江豊寿をはじめとした管理スタッフがドイツ兵の人権を尊重し、できるかぎりの自主的な生活を認めていました。そのため、ドイツ兵たちは元々優れていた技術を活かして様々な活動に取り組み、中でも盛んだった音楽活動においては、ベートーヴェンの「交響曲第九番」を、アジアで初めてコンサートとして全楽章演奏しました。また、ドイツ兵たちは地域の住民とも交流を深め、親しみを込めて「ドイツさん」と呼ばれるようになるほど打ち解けていました。こうしたエピソードから、板東俘虜収容所は模範収容所と評価されました。
    鳴門市ドイツ館は、板東俘虜収容所で過ごしたドイツ兵たちの活動の様子や、地域の人々との交流の様子を展示した史料館です。ドイツ兵たちが板東でどのような生活を送っていたのか、地域の住民とどのように関わり合ったのか、なぜドイツ館が創設されたのかなどを、具体的に知ることができます。ちなみに、松江豊寿とドイツ兵の交流は映画の題材にもなっています。',
    '平賀源内は、享保13年（1728）高松藩の御蔵番の子として現在のさぬき市志度（旧志度町）で生まれた。発明の才に富み、酒脱の気風があった源内は、エレキテル（日本で初めて復元された電気機器）の復元、燃えない布・火浣布、量程器（万歩計）、磁針器等多くの発明をした。その他にも、本草学者として薬品会（博覧会）を開催したり、人気作家として戯作浄瑠璃作品を発表したり、西洋画や源内焼を広めたりと天才的な業績を残している。国益増進を唱えながら、封建社会の壁に遮られ、世に迎えられず、安永8年（1779）12月18日、江戸の獄中で、辞世の句ともいえる「乾坤の手をちぢめたる氷かな」の一句を残し、駆け抜けた52年の生涯を閉じた。
    平賀家が自性院の檀家であるあることから、仁王門前の自性院北正門から入ってすぐ南側に、源内のお墓がある。',
    '道後温泉駅前の放生園にある「坊っちゃんカラクリ時計」は､道後温泉本館建設100年周年記念事業の一環として作られました。
    午前8時から午後10時までの間、1時間ごとに道後温泉らしい音楽とともにせり上がり、小説「坊っちゃん」の登場キャラクターがみなさまを歓迎します。
    カラクリ時計の隣には、道後温泉の源泉を使った「足湯」もあり、人気のスポットになっています。',
    '　真言宗の開祖であり「弘法大師（だいし）」として知られる平安時代の僧侶・空海の修行地。この場所からは空と海しか見えないため「空海」と名乗ったと言われています。'
  ],
  [
    '　13世紀の初め，チンギス・ハンはアジアからヨーロッパにまたがる強大なモンゴル帝国を打ち立てました。その孫，5代皇帝フビライは，国名を元に新ため，日本に使者を送り，通交を求めました。しかし，鎌倉幕府の時の執権・北条時宗がこれに応じず使者を切り捨てました。この時、時宗はまだ18歳だったそうです。その後、時宗はモンゴルに対抗するために国内をまとめあげました。
　そして、フビライは日本に二度も攻め込み，武士たちと激しい戦いを繰り広げましたが、日本はこれを退けました。',
    '吉野ヶ里遺跡は、佐賀県神埼郡の旧神埼（かんざき）町・旧三田川（みたがわ）町・旧東脊振（ひがしせふり）村の3つの町村にまたがった我が国最大の遺跡で、弥生時代における「クニ」の中心的な集落の全貌や、弥生時代700年間の移り変わりを知ることができ、日本の古代の歴史を解き明かす上で極めて貴重な資料や情報が集まっています。

これらは日本の様子を記した最古の記録である魏志倭人伝に出てくる「邪馬台国」の時代を彷彿とさせるもので国の特別史跡にも指定されています。

また、有柄銅剣やガラス製管玉等の出土品は国の重要文化財に指定されるなど、高い学術的価値を有するものです。

吉野ヶ里遺跡は、脊振山地南麓から平野部へ伸びた帯状の段丘に位置しています。
佐賀平野東部には段丘が多く発達し、そのいずれにも遺跡が多く立地していることが、古くから知られていました。',
    '「女神大橋」は、2005年12月に開通した長さ1,289m、海面から橋ゲタまでの高さは65mで日本一の高さを誇る斜長橋です。車だけではなく、歩いて渡ることも可能です。
長崎港によって分断されている長崎市の西部と南部を最短距離で結び、交通混雑の緩和と地域の活性化に一役かうとともに、夜景都市長崎の新しいシンボルにとも期待されています。
「女神大橋」の愛称を「ヴィーナスウイング」といい、女神と男神を結ぶ夢の架け橋として、翼で包み込むように旅立つ人の安全を祈るという意味が込められています。',
    '実は、「阿蘇山」という単体の山は存在しない。東西18キロメートル、南北25キロメートル、周囲100キロメートルの世界でも有数の規模を誇るカルデラの中に、高岳（たかだけ）、中岳（なかだけ）、烏帽子岳（えぼしだけ）、杵島岳（きじまだけ）、根子岳（ねこだけ）で構成する「阿蘇五岳」と呼ばれる中央火口丘群が存在する。一般的にはこの五岳を総称して阿蘇山と呼ぶ。

阿蘇の歴史をさかのぼると、約27万年前、14万年前、12万年前、9万年前に大規模な火砕流が発生。巨大噴火によって地下のマグマだまりが空洞になり、地盤が陥没して巨大なカルデラが形成された。その後、中央火口丘群が形成され、カルデラ内に阿蘇五岳が並ぶ現在の姿となった。阿蘇山は由布岳、鶴見岳、雲仙岳という東西方向の火山の並びと、口永良部島、桜島、霧島山という南北方向の火山の並びの会合点にあたる。

有史以降の噴火は中岳に限られていて、最も古い記録が残っているのは553年。その後、現在に至るまで噴火活動を繰り返している。中岳には第1～7までの火口があるが、1940年代以降に活動しているのは第1火口のみだ。',
    '神社の中でも全国的に数が多い八幡神社の本源とも呼べる場所が、大分県宇佐（うさ）市に鎮座する宇佐神宮（うさじんぐう）です。
    八幡神は、元々は大漁旗を意味する海神といわれ、神社では誉田別尊（ほんだわけのみこと）、あるいは応神天皇（おうじんてんのう）の祭神名でまつられています。大分県の宇佐氏が崇敬した地方神でしたが、ご神託を通じて第15代天皇である応神天皇の化身とされ、土着的な神と天皇のご神霊が結びついた特別な性格を持ちあわせているのです。
    応神天皇は弓術の達人とされており、武の神や出世開運の神として崇められていました。平安時代には、天皇家を祖とする清和源氏が京都の石清水八幡宮を氏神としたことで、武勇の神として多くの武士からの信仰を集め、一般の信仰の対象としても広まっていきました。
    八幡神は571年に宇佐の地にはじめて示顕（じげん）したと伝えられ、宇佐神宮（大分県宇佐市）は八幡宮の総本宮です。石清水八幡宮（京都府八幡市）、筥崎宮（はこざきぐう、福岡県福岡市）、または鶴岡八幡宮（神奈川県鎌倉市）をあわせて、日本三大八幡宮とされています。',
    '　天照大神の孫に当たる瓊瓊杵尊(ニニギノミコト)が降り立った土地です。瓊瓊杵尊は初代天皇・神武天皇の曾祖父に当たる方です。
    　写真は宮崎県高千穂町にある「天孫降臨の滝」です。',
    '　日本の海軍は、勝海舟（1823～1899）が基礎をつくり、山本権兵衛（1852～1933）が育てたといわれます。二人は共に、後に「海軍の父」と称されます。
    　山本権兵衛は、12歳のとき薩英戦争に雑務員として参加。のち戊辰戦争のときは歳を2歳いつわって薩摩藩の小銃隊に加わり、奥羽地方まで転戦しました。維新後は一貫して海軍の道を進みます。
    　そして、山本権兵衛といえば、日露戦争を勝利に導いた東郷平八郎を、異例の人事で連合艦隊総司令官に抜擢した際、このことを明治天皇に聞かれ「東郷は運のいい男ですので」と答えたという話が残っています。
    　その後、大正に入り山本は二度内閣総理大臣を務めます。1回目は、1913年（大正2年）には立憲政友会と結んで内閣総理大臣に就任しましたが、軍需品をめぐる贈収賄事件（シーメンス事件）の責任をとって翌年辞任。10年後の1923年（大正12年）9月2日、関東大震災の翌日に、2回目の内閣総理大臣になりました。が、年末に起こった虎ノ門事件（裕仁親王（のちの昭和天皇）が狙撃された）により、4カ月ほどでまたも辞任に追い込まれました。
    　政治家としての活躍はあまりパッとしませんが、日露戦争で見せた、異例の人事。そしてその結果は素晴らしいものでした。
    　写真は山本権兵衛とその甥で、海軍大将になった山本英輔の誕生地に建てられた記念碑です。',
    '三山時代の北の覇者、北山王の居城

    かつて琉球には北山（ほくざん）中山（ちゅうざん）南山（なんざん）の三つの勢力に分かれた「三山（さんざん）時代」と呼ばれる戦国時代がありました。今帰仁城は本島北部から遠くは奄美地方まで支配していた北山王の居城でしたが、1416年に中山を支配していた尚巴志（しょうはし）によって滅ぼされました。尚巴志が三山を統一し、琉球王国が誕生した後は琉球王府が派遣した看守役人の居城となりました。城壁の長さは約1.5km。高さは最も高い所で8mもあり、城全体の規模としては首里城に次ぐ大きさです。'
  ],
  [
    '　田中久重は寛政11年（1799年）、筑後国久留米で生まれ、幼い頃から物づくりの才能があり、五穀神社（久留米市通外町）の祭礼では当時流行していたからくり人形の新しい仕掛けを次々と考案して大評判となり、「からくり儀右衛門」と呼ばれるようになる。
　20代に入ると九州各地や大阪・京都・江戸でも興行を行い、各地にその名を知られるようになる。彼の作で現存するからくり人形として有名なものに「弓曳童子」と「文字書き人形」があり、からくり人形の最高傑作といわれている。
　天保5年（1834年）には上方へ上り、大坂船場の伏見町（大阪市中央区伏見町）に居を構えた。同年に折りたたみ式の「懐中燭台」、天保8年（1837年）に圧縮空気により灯油を補給する灯明の「無尽灯」などを考案した。その後京都へ移り、弘化4年（1847年）に天文学を学ぶために土御門家に入門。嘉永2年（1849年）には、優れた職人に与えられる「近江大掾」（おうみだいじょう）の称号を得た。翌嘉永3年（1850年）には、天動説を具現化した須弥山儀（しゅみせんぎ）を完成させた。
　この頃に蘭学者の廣瀨元恭が営む「時習堂」（じしゅうどう）に入門し、様々な西洋の技術を学ぶ。嘉永4年（1851年）には、季節によって昼夜の時刻の長さの違う不定時法に対応して文字盤の間隔が全自動で動くなどの、様々な仕掛けを施した「万年自鳴鐘」を完成させた。これは江戸時代において当時の最新技術を結集させた時計であり、二組の（真鍮で作られた二重）ゼンマイを動力に、六面の時計を同時に動かす。さらに鐘を鳴らし、干支や七曜、二十四節気、月の満ち欠けも表示する。機構の精巧さもさることながら、優美さと気品を漂わす伝統工芸品としても高い精度を誇っており、2006年には国の重要文化財に指定された。
　久重はその後も活躍を続け、佐賀藩では当時最新鋭のアームストロング砲の開発や、蒸気船の製造、反射炉の設計など様々な活躍を見せた。晩年には電信機関係の製作所・田中製作所を設立し、これは後の東芝の土台となる会社となる。
　写真はそんな久重の故郷、久留米にある、久重が作成した「太鼓時計」をモチーフにした「からくり太鼓時計」',
    '　「夜宮の大珪化木」は、約3500万年前の地層に埋もれた、直径2.2メートル、長さ40メートルに達する珪化木のうち、根本付近の約12ｍを観察することができます。当時、北部九州が、高温多雨な気候下にあり、準亜熱帯雨林の大森林に覆われていたことを物語っています。大森林の多くは日本の近代化を支えた筑豊地域や北九州地域の地下資源「石炭」となり、またその一部は珪質な木の化石「珪化木」として保存されました。表面を触ってみるとガラスのようにツルツルしています。',
    '霍公鳥　飛幡之浦尓　敷浪乃　屡君乎　将見因毛鴨

＜書き下し＞
ほととぎす飛幡（とばた）の浦（うら）にしく波のしくしく君を見むよしもがも

＜訳＞
時鳥（ほととぎす）が飛ぶというではないが、その飛幡の浦に繰り返し寄せる波のように、しばしば重ねてあの方にお逢いできるきっかけがあったらなあ。（「万葉集　三」　伊藤　博　著　角川ソフィア文庫より）

　万葉集は750年ごろに成立したとみられる我が国最古の和歌集です。「万葉集」という書名の意味は、「葉」は「世」すなわち時代の意であり、万世まで伝わるようにと祝賀を込めた命名と考えられています。作者層は天皇から農民まで幅広い階層に及び、詠み込まれた土地も東北から九州に至る日本各地に及びます。
　和歌では飛幡を「とばた」と呼んでいますが、現在は飛幡という漢字の地名は「とびはた」と呼ばれており、「とばた」という呼び方の地名は「戸畑」と表記するようになっています。現在の戸畑と飛幡の行政的関係は飛幡が戸畑区の一地域となっています。
　写真はこの歌のゆかりの地である戸畑区の夜宮公園にある万葉歌碑です。写真では分かりにくいですが、石にはしっかりとこの歌が刻まれています。',
    '旅順要塞を陥落させた後の明治38年（1905年）1月5日、乃木は要塞司令官ステッセルと会見した。この会見は水師営において行われたので、水師営の会見といわれる。会見に先立ち、明治天皇は、山縣有朋を通じ、乃木に対し、ステッセルが祖国のため力を尽くしたことを讃え、武人としての名誉を確保するよう命じた。
    これを受けて、乃木は、ステッセルに対して極めて紳士的に接した。通常、降伏する際に帯剣することは許されないにもかかわらず、乃木はステッセルに帯剣を許し、酒を酌み交わして打ち解けた。乃木は従軍記者たちの再三の要求にもかかわらず会見写真は一枚しか撮影させず、ステッセルらロシア軍人の名誉を重んじた。

    "敵将（ステッセル）に失礼ではないか
     後々まで恥を残すような写真を撮らせることは日本の武士道が許さぬ"

    こうした乃木の振る舞いは、旅順要塞を攻略した武功と併せて世界的に報道され賞賛された。後にこの会見を題材とした唱歌『水師営の会見』が作られ、日本の国定教科書に掲載された。
    乃木は、1月13日に旅順要塞に入城し、1月14日、旅順攻囲戦において戦死した将兵の弔いとして招魂祭を挙行し、自ら起草した祭文を涙ながらに奉読した。その姿は、日本語が分からない観戦武官および従軍記者らをも感動させ、彼らは祭文の抄訳を求めた。(「乃木希典」『ウィキペディア　フリー百科事典日本語版』(https://ja.wikipedia.org/wiki/%E4%B9%83%E6%9C%A8%E5%B8%8C%E5%85%B8))
    写真は乃木が明治8年（1875年）12月、熊本鎮台歩兵第十四連隊長心得に任じられ、小倉に赴任した際に住んでいた場所に建てられた記念碑です。'
  ]
].freeze
ARTICLE_LATS = [
  [42.11901027896066],
  [41.06537467255742, 39.14356406082035, 38.25051778828114, 40.27167266291556, 38.31319098876046, 37.48783404003715],
  [36.37534190936952, 36.75781835269123, 36.25521360486488, 36.12783921649822, 35.72966768496174, 35.69337242126741, 35.32433965488214],
  [37.146697946205045, 36.56655285982336, 36.56222445907089, 36.05665401304788, 35.381500133167904, 36.59151319574407, 35.433927268303364, 35.14148782408679, 35.125577958727085],
  [34.57526254299947, 34.96055933053394, 35.00571687669299, 34.562096081702094, 34.64036114677518, 34.6142575911172, 34.214177227178],
  [35.42762665115884, 35.336558957871006, 34.7255515456355, 34.24053321181148, 33.999798697157956],
  [34.16476641441206, 34.3237002084529, 33.85072766493491, 33.25165919380063],
  [33.58594224241957, 33.32392232234415, 32.721340350768216, 32.89855317634651, 33.526014601481585, 32.73141587391541, 31.58697821530356, 26.69130337441605],
  [33.32052764089946, 33.88628450920593, 33.88872482528633, 33.88562176846195]
].freeze
ARTICLE_LNGS = [
  [140.53847055751626],
  [140.55227110814448, 141.13848872074482, 140.8666598978462, 140.80386478851017, 140.43460682114178, 139.92966114537649],
  [140.47748565707911, 139.59936345408516, 138.88758055306607, 139.4799693290348, 140.82741692662853, 139.79433142526764, 139.54780151475035],
  [138.20556192091385, 137.66211598209347, 136.66394984688606, 136.35687616357637, 138.42607182139133, 138.18662666216196, 136.78208001496034, 138.8072432450888, 136.90896347571052],
  [136.52583875897776, 135.90571487057122, 135.78485282511303, 135.48614497034444, 135.10528542599295, 135.7356772334166, 135.58411460956268],
  [133.59018209522375, 132.87186678465804, 133.76233160548082, 132.55418839511998, 130.98600221983511],
  [134.49922509122788, 134.1785119149097, 132.78547017798266, 134.1805425948241],
  [130.3087248115969, 130.3887590927588, 129.84965204443483, 131.08749248772733, 131.37464394419615, 131.29886290920524, 130.55194887398207, 127.92902626735156],
  [130.50129634912798, 130.8325026137785, 130.83486407880952, 130.87474129853953]
].freeze
ARTICLE_PERIODS = [
  [5],
  [16, 4, 6, 15, 10, 5],
  [6, 6, 5, 13, 6, 6, 9],
  [7, 3, 6, 9, 9, 7, 7, 8, 12],
  [6, 10, 9, 13, 10, 12, 10],
  [8, 14, 12, 3, 5],
  [4, 6, 5, 10],
  [9, 14, 2, 17, 11, 14, 5, 8],
  [6, 17, 11, 5]
].freeze
ARTICLE_PREFECTURES = [
  [1],
  [2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35],
  [36, 37, 38, 39],
  [40, 41, 42, 43, 44, 45, 46, 47],
  [40, 40, 40, 40]
].freeze
ARTICLE_CREATEDS = [
  [1.month.ago],
  [17.days.ago, 12.hours.ago, 9.days.ago, 4.days.ago, 11.days.ago, 7.days.ago],
  [2.days.ago, 16.days.ago, 15.days.ago, 14.days.ago, 2.months.ago, 3.months.ago, 4.months.ago],
  [5.months.ago, 18.hours.ago, 8.days.ago, 6.days.ago, 13.days.ago, 6.months.ago, 4.days.ago, 7.months.ago, 5.days.ago],
  [8.months.ago, 22.days.ago, 21.days.ago, 9.months.ago, 20.months.ago, 20.days.ago, 12.days.ago],
  [18.days.ago, 11.months.ago, 19.days.ago, 5.weeks.ago, 27.week.ago],
  [1.day.ago, 7.weeks.ago, 26.days.ago, 6.weeks.ago],
  [8.weeks.ago, 25.days.ago, 3.days.ago, 10.days.ago, 1.second.ago, 24.days.ago, 9.weeks.ago, 23.days.ago],
  [1.years.ago, 2.years.ago, 3.years.ago, 4.years.ago]
].freeze
USER_FOLLOWINGS = [[2, 9], [1, 3, 9], [2, 4, 9], [2, 3, 5, 9], [4, 6, 7, 9], [5, 7, 8, 9], [5, 6, 8, 9], [6, 7, 9], [1, 2, 3, 4, 5, 6, 7, 8]].freeze
USER_LIKINGS = [
  [8, 44, 4, 6, 16, 43, 3, 17, 42, 7, 18, 21, 2, 9, 45, 24],
  [8, 16, 7, 23, 25, 26, 29, 2, 9, 47, 27],
  [8, 44, 4, 43, 17, 42, 7, 23, 25, 26, 29, 10, 11, 19, 1, 28],
  [8, 44, 4, 6, 43, 3, 7, 23, 25, 26, 29, 10, 11, 19, 12, 34],
  [8, 44, 4, 6, 16, 43, 3, 17, 42, 7, 23, 25, 26, 29, 30, 13, 38],
  [8, 44, 4, 6, 16, 43, 3, 17, 42, 18, 21, 33, 36, 31, 30, 14, 40],
  [8, 44, 4, 6, 16, 43, 3, 17, 42, 18, 21, 33, 36, 31, 35, 15],
  [8, 4, 6, 16, 18, 21, 33, 36, 31, 38, 20],
  [8, 44, 4, 6, 16, 43, 3, 17, 42, 18, 21, 2, 9, 41, 22]
].freeze

(0..8).each do |num|
  user = User.create!(name: USER_NAMES[num], email: USER_EMAILS[num], password: 'password', introduction: USER_INTRODUCTIONS[num])
  user.avatar.attach(io: File.open(Rails.root.join("db/seed_data/avatar_#{num}.jpg")),
                     filename: 'avatar.jpg',
                     content_type: 'image/jpg')

  int = ARTICLE_TITLES[num].length - 1
  (0..int).each do |n|
    article = Article.create!(title: ARTICLE_TITLES[num][n],
                              content: ARTICLE_CONTENTS[num][n],
                              lat: ARTICLE_LATS[num][n],
                              lng: ARTICLE_LNGS[num][n],
                              user_id: User.find(num + 1).id,
                              period_id: ARTICLE_PERIODS[num][n],
                              prefecture_id: ARTICLE_PREFECTURES[num][n],
                              created_at: ARTICLE_CREATEDS[num][n])
    article.image.attach(io: File.open(Rails.root.join("db/seed_data/image_#{num}_#{n}.jpg")),
                         filename: 'image.jpg',
                         content_type: 'image/jpg')
  end
end

(1..9).each do |num|
  user = User.find(num)
  user.follow(User.find(USER_FOLLOWINGS[num - 1]))
  user.like(Article.find(USER_LIKINGS[num - 1]))
end
