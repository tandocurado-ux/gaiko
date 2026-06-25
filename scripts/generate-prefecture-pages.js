const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const today = "2026-06-25";
const siteName = "エクステリア外構工事地域相談窓口Coooi";
const baseUrl = "https://tandocurado-ux.github.io/gaiko";

const sourceLinks = [
  { label: "気象庁 過去の気象データ検索", url: "https://www.data.jma.go.jp/stats/etrn/index.php" },
  { label: "国土地理院 ハザードマップポータルサイト", url: "https://disaportal.gsi.go.jp/" },
  { label: "e-Stat 政府統計の総合窓口", url: "https://www.e-stat.go.jp/" },
  { label: "自動車検査登録情報協会 自家用乗用車普及状況", url: "https://www.airia.or.jp/publish/statistics/mycar.html" },
];

const prefectures = [
  {
    slug: "hokkaido",
    name: "北海道",
    region: "北海道",
    profile: "広域・多雪・寒冷・沿岸部の塩害差が大きく、耐雪カーポート、凍上対策、雪置き場、排水動線を先に決めたい地域です。",
    topNeeds: ["耐雪カーポートと落雪位置", "凍上を避ける基礎と排水", "除雪しやすい駐車場", "沿岸部の塩害に強い金物"],
    areas: [
      ["札幌・石狩", "住宅密集地では雪置き場、除雪車の寄せ雪、カーポート配置を先に確認します。"],
      ["空知・上川", "多雪と寒冷差を見て、土間勾配、基礎深さ、門柱・フェンス柱の凍上対策を重視します。"],
      ["道東", "寒さ、風、広い敷地の動線を踏まえ、駐車場と物置まわりを広めに計画します。"],
      ["道南・沿岸", "海風と塩害、強風、積雪差を分けて、金物と舗装材を選びます。"],
    ],
    cities: ["札幌市", "旭川市", "函館市", "釧路市", "帯広市", "苫小牧市"],
  },
  {
    slug: "aomori",
    name: "青森県",
    region: "東北",
    profile: "日本海側の多雪、津軽平野の積雪、太平洋側の風を分けて、耐雪・防風・凍上対策を組み合わせたい地域です。",
    topNeeds: ["雪置き場と除雪動線", "耐雪カーポート", "凍上しにくい柱基礎", "海風に配慮したフェンス"],
    areas: [
      ["青森・東青", "積雪と海風を見ながら、カーポートの耐雪仕様とアプローチの滑りにくさを確認します。"],
      ["弘前・津軽", "雪の多い住宅地では、駐車場の奥行き、除雪スペース、境界フェンスの高さをそろえます。"],
      ["八戸・三八", "太平洋側の風と凍結を見て、フェンス強度、土間の勾配、排水先を整理します。"],
      ["下北・上北", "沿岸風、積雪差、広い敷地の車両動線を分けて計画します。"],
    ],
    cities: ["青森市", "弘前市", "八戸市", "十和田市", "むつ市", "五所川原市"],
  },
  {
    slug: "iwate",
    name: "岩手県",
    region: "東北",
    profile: "内陸の寒冷・積雪、沿岸の風と津波浸水想定、山あいの高低差を分けて考えたい地域です。",
    topNeeds: ["凍結しにくいアプローチ", "雪と風に強いカーポート", "高低差と擁壁の確認", "沿岸部の塩害対策"],
    areas: [
      ["盛岡・県央", "寒冷地の凍結、積雪、住宅地の駐車動線を見て、土間と階段の滑りを抑えます。"],
      ["花巻・北上・奥州", "広めの敷地では車の転回、物置、庭の管理範囲を先に決めます。"],
      ["沿岸", "海風、塩害、浸水想定を確認し、金物と塀の安全性を優先します。"],
      ["県北・山間部", "積雪、凍上、除雪機の動線を踏まえて外構を組みます。"],
    ],
    cities: ["盛岡市", "花巻市", "北上市", "奥州市", "一関市", "宮古市"],
  },
  {
    slug: "miyagi",
    name: "宮城県",
    region: "東北",
    profile: "仙台圏の都市型外構、内陸の凍結、沿岸の塩害・浸水想定を分けて整理したい地域です。",
    topNeeds: ["都市部の駐車場拡張", "目隠しフェンス", "沿岸部の塩害対策", "雨水排水と浸水想定"],
    areas: [
      ["仙台都市圏", "狭小地や高低差のある宅地では、駐車場、目隠し、道路境界を丁寧に確認します。"],
      ["大崎・栗原", "冬の凍結、広い敷地、車複数台の動線を優先します。"],
      ["石巻・気仙沼沿岸", "海風、塩害、浸水想定を踏まえ、金物とブロック塀の安全性を確認します。"],
      ["県南", "住宅地と農地寄りの敷地差を見て、土間範囲と排水先を決めます。"],
    ],
    cities: ["仙台市", "石巻市", "大崎市", "名取市", "多賀城市", "気仙沼市"],
  },
  {
    slug: "akita",
    name: "秋田県",
    region: "東北",
    profile: "多雪・寒冷・日本海側の風を前提に、雪処理、耐雪カーポート、凍上、排水を優先したい地域です。",
    topNeeds: ["雪置き場の確保", "耐雪カーポート", "融雪・排水の確認", "凍上を避ける基礎"],
    areas: [
      ["秋田市周辺", "住宅地の除雪動線、風、雪置き場を一体で見ます。"],
      ["横手・湯沢", "積雪が多い内陸部では、カーポート耐雪、屋根雪、物置配置を先に決めます。"],
      ["大館・鹿角", "寒冷差と凍結を考え、門柱・フェンス柱・土間の下地を確認します。"],
      ["男鹿・能代沿岸", "海風と塩害に配慮して、金物、フェンス、照明を選びます。"],
    ],
    cities: ["秋田市", "横手市", "大館市", "大仙市", "能代市", "由利本荘市"],
  },
  {
    slug: "yamagata",
    name: "山形県",
    region: "東北",
    profile: "内陸盆地の雪・寒暖差、山あいの積雪、庄内の風を分け、雪に強い駐車場計画が重要です。",
    topNeeds: ["耐雪カーポート", "除雪しやすい土間", "凍結しにくい階段", "庄内の防風・塩害対策"],
    areas: [
      ["山形・村山", "盆地の雪と寒暖差を見て、凍結しにくいアプローチを計画します。"],
      ["米沢・置賜", "積雪と寒冷が強い場所では、基礎深さと雪下ろし動線を確認します。"],
      ["新庄・最上", "多雪地域では雪置き場、耐雪荷重、除雪機の動線を優先します。"],
      ["庄内", "海風、塩害、風の抜けを考え、フェンスと金物を選びます。"],
    ],
    cities: ["山形市", "米沢市", "鶴岡市", "酒田市", "天童市", "新庄市"],
  },
  {
    slug: "fukushima",
    name: "福島県",
    region: "東北",
    profile: "会津の多雪、中通りの寒暖差、浜通りの風・塩害を分けて、耐雪・排水・防風を整理したい地域です。",
    topNeeds: ["会津の耐雪外構", "中通りの駐車場拡張", "浜通りの塩害・風対策", "高低差と排水確認"],
    areas: [
      ["福島・郡山", "住宅地の駐車場、目隠し、勾配、排水をまとめて確認します。"],
      ["会津", "多雪と凍結を前提に、耐雪カーポート、雪置き場、滑りにくい舗装を重視します。"],
      ["いわき・浜通り", "海風、塩害、日射を踏まえ、金物と植栽を選びます。"],
      ["白河・県南", "寒暖差と高低差を見て、擁壁、階段、スロープを確認します。"],
    ],
    cities: ["福島市", "郡山市", "いわき市", "会津若松市", "白河市", "南相馬市"],
  },
  {
    slug: "ibaraki",
    name: "茨城県",
    region: "関東",
    profile: "平野部の駐車場需要、沿岸の塩害、台風時の強風、郊外の広い敷地を分けて計画したい地域です。",
    topNeeds: ["駐車場拡張", "台風時のフェンス強度", "沿岸部の塩害対策", "雨水排水"],
    areas: [
      ["水戸・県央", "戸建て外構では駐車場、門柱、目隠し、庭の管理範囲を先に決めます。"],
      ["つくば・県南", "新興住宅地ではデザイン統一、オープン外構、宅配ボックス需要を見ます。"],
      ["鹿行・沿岸", "海風と塩害、強風に配慮して金物とフェンスを選びます。"],
      ["県北・山間", "高低差と排水、土留め、アプローチの安全性を確認します。"],
    ],
    cities: ["水戸市", "つくば市", "日立市", "土浦市", "取手市", "鹿嶋市"],
  },
  {
    slug: "tochigi",
    name: "栃木県",
    region: "関東",
    profile: "内陸の寒暖差、雷雨、郊外住宅の車複数台需要、北部の凍結・積雪を整理したい地域です。",
    topNeeds: ["駐車場2台以上の動線", "雷雨時の排水", "北部の凍結対策", "目隠しと境界整理"],
    areas: [
      ["宇都宮・県央", "車利用を前提に、土間範囲、カーポート、宅配ボックスをまとめます。"],
      ["小山・県南", "平坦地の排水、道路境界、目隠しフェンスを確認します。"],
      ["那須・県北", "寒冷・積雪・別荘地の勾配を見て、舗装材と排水を選びます。"],
      ["足利・佐野", "暑さと西日、庭の雑草対策、駐車場拡張の相談が多い地域です。"],
    ],
    cities: ["宇都宮市", "小山市", "栃木市", "足利市", "那須塩原市", "佐野市"],
  },
  {
    slug: "gunma",
    name: "群馬県",
    region: "関東",
    profile: "内陸の暑さ、からっ風、北部の積雪・凍結、高低差を分けて外構仕様を決めたい地域です。",
    topNeeds: ["強風に強いフェンス", "夏の暑さ対策", "北部の凍結・積雪対策", "駐車場拡張"],
    areas: [
      ["前橋・高崎", "車利用、暑さ、強風を見て、カーポートとフェンスの仕様を決めます。"],
      ["太田・伊勢崎", "日射と強風、広い敷地の駐車場計画を重視します。"],
      ["沼田・利根沼田", "積雪・凍結を踏まえ、土間勾配と耐雪設備を確認します。"],
      ["吾妻・山間部", "高低差、凍結、別荘地の管理性を見て素材を選びます。"],
    ],
    cities: ["前橋市", "高崎市", "太田市", "伊勢崎市", "桐生市", "沼田市"],
  },
  {
    slug: "saitama",
    name: "埼玉県",
    region: "関東",
    profile: "都市部の狭小地、郊外の駐車場需要、夏の暑さ、ゲリラ豪雨時の排水を考えたい地域です。",
    topNeeds: ["狭小地の駐車場設計", "目隠しフェンス", "暑さと西日対策", "雨水排水"],
    areas: [
      ["さいたま・川口", "道路境界、駐車場、目隠し、宅配ボックスをコンパクトにまとめます。"],
      ["川越・所沢", "既存住宅のリフォームでは、駐車場拡張と庭の管理負担軽減が中心です。"],
      ["熊谷・北部", "暑さと日射を考え、カーポート、舗装材、植栽の配置を検討します。"],
      ["秩父", "高低差、擁壁、凍結、排水を先に確認します。"],
    ],
    cities: ["さいたま市", "川口市", "川越市", "所沢市", "熊谷市", "越谷市"],
  },
  {
    slug: "chiba",
    name: "千葉県",
    region: "関東",
    profile: "湾岸・外房・内陸で塩害、強風、台風、液状化想定、駐車場需要が変わる地域です。",
    topNeeds: ["台風時のカーポート耐風", "沿岸部の塩害対策", "液状化・浸水想定の確認", "目隠しフェンス"],
    areas: [
      ["千葉・湾岸", "海風、液状化想定、都市型外構を分けて確認します。"],
      ["船橋・市川・柏", "狭小地の駐車場、目隠し、境界、宅配ボックスを重視します。"],
      ["房総・外房", "台風、塩害、強風に配慮して、フェンスと金物を選びます。"],
      ["北総・内陸", "広い敷地の駐車場と雨水排水を先に整理します。"],
    ],
    cities: ["千葉市", "船橋市", "市川市", "柏市", "松戸市", "木更津市"],
  },
  {
    slug: "tokyo",
    name: "東京都",
    region: "関東",
    profile: "狭小地、道路境界、隣地距離、防犯、景観・地区計画、雨水処理を細かく確認したい地域です。",
    topNeeds: ["狭小地の駐車場・門まわり", "目隠しと防犯", "道路境界とセットバック確認", "地区計画・景観確認"],
    areas: [
      ["23区", "狭い敷地、接道、隣地距離を見て、門柱・駐輪場・宅配ボックスを整理します。"],
      ["多摩東部", "戸建て外構では駐車場、目隠し、植栽管理のバランスを見ます。"],
      ["多摩西部", "高低差、擁壁、階段、排水を先に確認します。"],
      ["島しょ", "塩害、強風、資材搬入、メンテナンス性を重視します。"],
    ],
    cities: ["新宿区", "世田谷区", "練馬区", "八王子市", "町田市", "立川市"],
  },
  {
    slug: "kanagawa",
    name: "神奈川県",
    region: "関東",
    profile: "横浜・川崎の都市型外構、湘南・三浦の塩害、県西の高低差を分けて確認したい地域です。",
    topNeeds: ["高低差と擁壁確認", "塩害に強い金物", "狭小地の駐車場", "目隠し・防犯"],
    areas: [
      ["横浜・川崎", "道路境界、高低差、駐車場、目隠しをコンパクトにまとめます。"],
      ["湘南・三浦", "潮風、砂、強風を見て、金物と植栽を選びます。"],
      ["県央", "車利用と住宅密度を踏まえ、駐車場とアプローチを整理します。"],
      ["県西・箱根", "斜面、擁壁、雨水、凍結の可能性を確認します。"],
    ],
    cities: ["横浜市", "川崎市", "相模原市", "藤沢市", "横須賀市", "小田原市"],
  },
  {
    slug: "niigata",
    name: "新潟県",
    region: "中部",
    profile: "日本海側の多雪・塩害、内陸の豪雪、平野部の広い敷地を分けて耐雪外構を考えたい地域です。",
    topNeeds: ["耐雪カーポート", "雪置き場と除雪動線", "海沿いの塩害対策", "凍上・排水確認"],
    areas: [
      ["新潟・下越", "沿岸風と積雪を見て、カーポート、金物、排水を確認します。"],
      ["長岡・中越", "多雪地域では耐雪荷重、雪下ろし、雪置き場を先に決めます。"],
      ["上越", "湿った雪と海風を踏まえ、土間勾配と金物を選びます。"],
      ["魚沼・山間部", "豪雪、凍結、除雪機動線を前提に外構を組みます。"],
    ],
    cities: ["新潟市", "長岡市", "上越市", "三条市", "柏崎市", "南魚沼市"],
  },
  {
    slug: "toyama",
    name: "富山県",
    region: "中部",
    profile: "湿った雪、凍結、海沿いの塩害、広い駐車場需要を踏まえて耐雪・排水を整えたい地域です。",
    topNeeds: ["耐雪カーポート", "除雪しやすい土間", "融雪・排水", "塩害に強い金物"],
    areas: [
      ["富山・射水", "住宅地では積雪、車複数台、雪置き場をセットで確認します。"],
      ["高岡・氷見", "海風と雪を見て、金物・フェンス・カーポートを選びます。"],
      ["砺波・南砺", "広い敷地と雪処理を踏まえ、動線を広めに取ります。"],
      ["黒部・新川", "山側の積雪差、沿岸の塩害、風を分けて計画します。"],
    ],
    cities: ["富山市", "高岡市", "射水市", "砺波市", "南砺市", "黒部市"],
  },
  {
    slug: "ishikawa",
    name: "石川県",
    region: "中部",
    profile: "加賀・能登で積雪、強風、塩害、景観配慮が変わり、金物と塀の安全性を確認したい地域です。",
    topNeeds: ["雪と雨に強い駐車場", "沿岸部の塩害対策", "強風時のフェンス強度", "景観・道路境界確認"],
    areas: [
      ["金沢・加賀", "雨雪、景観、住宅密度を見て、門まわりと目隠しを整えます。"],
      ["白山・野々市", "戸建て外構では駐車場、土間、排水を先に確認します。"],
      ["能登", "強風、塩害、地震後の塀・擁壁安全性を重視します。"],
      ["奥能登", "資材搬入、風、塩害、維持管理しやすい外構を優先します。"],
    ],
    cities: ["金沢市", "白山市", "小松市", "加賀市", "七尾市", "輪島市"],
  },
  {
    slug: "fukui",
    name: "福井県",
    region: "中部",
    profile: "日本海側の雪と雨、沿岸部の塩害、嶺北・嶺南の気候差を踏まえて外構を検討したい地域です。",
    topNeeds: ["耐雪カーポート", "雪置き場と排水", "海沿いの塩害対策", "凍結しにくいアプローチ"],
    areas: [
      ["福井・坂井", "雪処理、駐車場、カーポート、土間排水を一体で考えます。"],
      ["奥越", "積雪と凍結を前提に、基礎と除雪動線を確認します。"],
      ["丹南", "住宅地の駐車場拡張と庭の管理軽減を重視します。"],
      ["嶺南", "海風、塩害、風を踏まえ、金物とフェンスを選びます。"],
    ],
    cities: ["福井市", "坂井市", "越前市", "鯖江市", "敦賀市", "大野市"],
  },
  {
    slug: "yamanashi",
    name: "山梨県",
    region: "中部",
    profile: "内陸盆地の暑さ・寒さ、山麓の凍結、高低差、日射を踏まえた外構計画が必要な地域です。",
    topNeeds: ["凍結しにくいアプローチ", "日射・西日対策", "高低差と擁壁確認", "駐車場拡張"],
    areas: [
      ["甲府盆地", "暑さ、日射、車利用を見て、カーポートと舗装材を選びます。"],
      ["峡東・峡南", "傾斜地や農地隣接の敷地では、排水と土留めを先に確認します。"],
      ["富士北麓", "寒冷、凍結、積雪を踏まえ、滑りにくさと基礎を重視します。"],
      ["北杜・八ヶ岳周辺", "寒冷、風、別荘地の管理性を見て素材を決めます。"],
    ],
    cities: ["甲府市", "甲斐市", "南アルプス市", "笛吹市", "富士吉田市", "北杜市"],
  },
  {
    slug: "nagano",
    name: "長野県",
    region: "中部",
    profile: "寒冷・凍結・積雪・高低差が地域ごとに大きく、基礎、排水、耐雪、景観を同時に確認したい地域です。",
    topNeeds: ["凍上を避ける基礎", "耐雪カーポート", "高低差と擁壁確認", "景観配慮"],
    areas: [
      ["長野・北信", "積雪と凍結を見て、カーポート耐雪、雪置き場、土間勾配を確認します。"],
      ["松本・中信", "寒冷差、高低差、景観を踏まえ、素材と植栽を選びます。"],
      ["諏訪・伊那", "凍結、強風、日射を見て、舗装材とフェンスを決めます。"],
      ["軽井沢・東信", "寒冷地と景観規制、別荘地の管理性を先に確認します。"],
    ],
    cities: ["長野市", "松本市", "上田市", "佐久市", "飯田市", "諏訪市"],
  },
  {
    slug: "gifu",
    name: "岐阜県",
    region: "中部",
    profile: "美濃の暑さ、飛騨の雪と寒さ、山あいの高低差を分けて、外構仕様を変えたい地域です。",
    topNeeds: ["美濃の暑さ対策", "飛騨の耐雪・凍結対策", "高低差と擁壁確認", "駐車場動線"],
    areas: [
      ["岐阜・西濃", "暑さ、車利用、住宅密度を見て、カーポートと目隠しを整理します。"],
      ["東濃", "高低差、土留め、道路境界、排水を先に確認します。"],
      ["中濃", "戸建て外構では駐車場、庭管理、フェンスを組み合わせます。"],
      ["飛騨", "積雪・凍結を前提に、耐雪設備と滑りにくい舗装を選びます。"],
    ],
    cities: ["岐阜市", "大垣市", "多治見市", "各務原市", "高山市", "可児市"],
  },
  {
    slug: "shizuoka",
    name: "静岡県",
    region: "中部",
    profile: "温暖な沿岸、台風・強風、塩害、富士山麓の寒冷差、地震・津波想定を分けて考えたい地域です。",
    topNeeds: ["台風時の耐風", "塩害に強い金物", "地震時のブロック塀安全", "雨水排水"],
    areas: [
      ["静岡・中部", "住宅地の駐車場、目隠し、強風時のフェンス安全を確認します。"],
      ["浜松・西部", "風と日射、広い敷地の駐車場計画を重視します。"],
      ["沼津・伊豆", "塩害、斜面、津波浸水想定を踏まえ、金物と塀を選びます。"],
      ["富士・御殿場", "山麓の寒冷差、雨、勾配を見て排水を整理します。"],
    ],
    cities: ["静岡市", "浜松市", "沼津市", "富士市", "磐田市", "藤枝市"],
  },
  {
    slug: "aichi",
    name: "愛知県",
    region: "中部",
    profile: "都市部の狭小外構、郊外の駐車場需要、台風時の強風、夏の暑さを踏まえたい地域です。",
    topNeeds: ["駐車場2台以上の計画", "台風時のカーポート耐風", "目隠しフェンス", "暑さと西日対策"],
    areas: [
      ["名古屋・尾張", "狭小地と駐車場需要を見て、門柱・宅配ボックス・目隠しを配置します。"],
      ["三河", "車複数台、庭の管理、カーポート需要を整理します。"],
      ["知多・西三河沿岸", "塩害と風を見て、金物とフェンスを選びます。"],
      ["東三河", "風、雨、広い敷地の動線を確認します。"],
    ],
    cities: ["名古屋市", "豊田市", "岡崎市", "一宮市", "豊橋市", "春日井市"],
  },
  {
    slug: "mie",
    name: "三重県",
    region: "近畿",
    profile: "伊勢湾岸の塩害、台風・豪雨、南部の多雨、北勢の都市外構を分けて確認したい地域です。",
    topNeeds: ["台風時の耐風", "沿岸部の塩害対策", "豪雨時の排水", "ブロック塀安全確認"],
    areas: [
      ["津・中勢", "住宅地の駐車場、目隠し、雨水排水を整えます。"],
      ["四日市・北勢", "都市型外構と工業沿岸の塩害・風を分けて確認します。"],
      ["伊勢志摩", "海風、塩害、景観、観光地周辺の条件を見ます。"],
      ["東紀州", "多雨、斜面、台風を踏まえ、排水と土留めを優先します。"],
    ],
    cities: ["津市", "四日市市", "鈴鹿市", "松阪市", "桑名市", "伊勢市"],
  },
  {
    slug: "shiga",
    name: "滋賀県",
    region: "近畿",
    profile: "琵琶湖周辺の風、北部の積雪、南部の住宅地外構を分けて、排水と駐車場を確認したい地域です。",
    topNeeds: ["湖周辺の風対策", "北部の雪・凍結対策", "駐車場拡張", "雨水排水"],
    areas: [
      ["大津・湖南", "住宅密度、駐車場、目隠し、道路境界を確認します。"],
      ["草津・守山", "新興住宅地ではオープン外構、宅配ボックス、駐車場2台を整理します。"],
      ["湖東", "風と広い敷地の動線、庭管理を見ます。"],
      ["湖北・湖西", "積雪、凍結、湖岸の風を踏まえて外構を選びます。"],
    ],
    cities: ["大津市", "草津市", "守山市", "彦根市", "長浜市", "近江八幡市"],
  },
  {
    slug: "kyoto",
    name: "京都府",
    region: "近畿",
    profile: "京都市内の景観・狭小地、北部の雪と沿岸風、南部の住宅地外構を分けて確認したい地域です。",
    topNeeds: ["景観・地区計画確認", "狭小地の門まわり", "北部の雪・塩害対策", "道路境界確認"],
    areas: [
      ["京都市", "景観、町並み、狭小地、道路境界を確認し、門まわりを整えます。"],
      ["山城", "住宅地の駐車場、目隠し、庭管理の相談が中心です。"],
      ["丹波", "寒暖差と高低差、排水を見て仕様を決めます。"],
      ["丹後・舞鶴", "雪、海風、塩害を踏まえて金物とフェンスを選びます。"],
    ],
    cities: ["京都市", "宇治市", "亀岡市", "長岡京市", "舞鶴市", "福知山市"],
  },
  {
    slug: "osaka",
    name: "大阪府",
    region: "近畿",
    profile: "都市部の狭小外構、北摂の住宅地、湾岸部の塩害、南部の勾配地を分けて、駐車場・目隠し・補助制度を確認したい地域です。",
    topNeeds: ["駐車場拡張", "目隠しフェンス", "ブロック塀撤去補助の確認", "湾岸部の塩害対策"],
    areas: [
      ["大阪市内", "狭小地、道路境界、駐車場、目隠し、宅配ボックスをコンパクトに整理します。"],
      ["北摂", "千里ニュータウンや既存住宅地では、建替え外構、庭管理、ブロック塀を確認します。"],
      ["河内", "住宅密度と車利用を見て、駐車場、フェンス、排水を整えます。"],
      ["泉州・湾岸", "塩害、強風、沿岸部の排水を踏まえ、金物と舗装材を選びます。"],
    ],
    cities: ["大阪市", "堺市", "豊中市", "吹田市", "高槻市", "東大阪市"],
  },
  {
    slug: "hyogo",
    name: "兵庫県",
    region: "近畿",
    profile: "神戸・阪神の高低差、播磨の平野部、但馬の雪、淡路の風・塩害を分けて考えたい地域です。",
    topNeeds: ["高低差と擁壁確認", "目隠し・駐車場", "但馬の雪対策", "沿岸部の塩害対策"],
    areas: [
      ["神戸・阪神", "坂道、高低差、擁壁、狭小地の駐車場を確認します。"],
      ["播磨", "平坦地の駐車場、庭管理、目隠しを整理します。"],
      ["但馬", "積雪と凍結を踏まえ、耐雪と雪置き場を確認します。"],
      ["淡路", "海風、塩害、台風を見て金物とフェンスを選びます。"],
    ],
    cities: ["神戸市", "姫路市", "西宮市", "尼崎市", "明石市", "豊岡市"],
  },
  {
    slug: "nara",
    name: "奈良県",
    region: "近畿",
    profile: "盆地の暑さ・寒さ、住宅地の高低差、歴史景観、南部山間の斜面・排水を確認したい地域です。",
    topNeeds: ["高低差と擁壁確認", "景観配慮", "駐車場拡張", "排水と雑草対策"],
    areas: [
      ["奈良盆地北部", "住宅地の駐車場、目隠し、道路境界、景観を確認します。"],
      ["中和", "既存住宅の外構リフォームでは、駐車場拡張と庭管理が中心です。"],
      ["西和", "坂道や高低差のある宅地では、階段・スロープ・擁壁を見ます。"],
      ["南部・吉野", "山間地の斜面、排水、落葉、凍結を踏まえます。"],
    ],
    cities: ["奈良市", "橿原市", "生駒市", "大和郡山市", "香芝市", "天理市"],
  },
  {
    slug: "wakayama",
    name: "和歌山県",
    region: "近畿",
    profile: "沿岸部の塩害・台風、南部の多雨、山間地の斜面を踏まえ、排水と耐風を優先したい地域です。",
    topNeeds: ["台風時の耐風", "塩害に強い金物", "豪雨時の排水", "斜面・擁壁確認"],
    areas: [
      ["和歌山・紀北", "住宅地の駐車場、目隠し、台風時のフェンス強度を確認します。"],
      ["海南・有田", "海風と塩害、斜面、排水を見て外構を組みます。"],
      ["紀中・紀南", "多雨、台風、沿岸風を踏まえ、土間勾配と排水を優先します。"],
      ["山間部", "高低差、土留め、落葉、雨水処理を確認します。"],
    ],
    cities: ["和歌山市", "田辺市", "橋本市", "海南市", "岩出市", "新宮市"],
  },
  {
    slug: "tottori",
    name: "鳥取県",
    region: "中国",
    profile: "山陰の雪・雨、沿岸部の塩害、砂丘周辺の風、山間の凍結を整理したい地域です。",
    topNeeds: ["雪と雨に強い駐車場", "塩害対策", "風に強いフェンス", "凍結しにくいアプローチ"],
    areas: [
      ["鳥取・東部", "雪、海風、砂を見て、舗装材と金物を選びます。"],
      ["倉吉・中部", "住宅地の駐車場、庭管理、排水を整理します。"],
      ["米子・西部", "海風、雨、雪を踏まえ、カーポートとフェンスを確認します。"],
      ["山間部", "凍結と積雪、勾配、落葉管理を見ます。"],
    ],
    cities: ["鳥取市", "米子市", "倉吉市", "境港市"],
  },
  {
    slug: "shimane",
    name: "島根県",
    region: "中国",
    profile: "日本海側の雨・雪・塩害、山間部の高低差、石見・出雲の地域差を分けて考えたい地域です。",
    topNeeds: ["塩害に強い金物", "雪と雨の排水", "高低差と擁壁確認", "庭の管理負担軽減"],
    areas: [
      ["松江・出雲", "日本海側の雨風、住宅地の駐車場、目隠しを確認します。"],
      ["石見", "沿岸風と塩害、斜面、排水を踏まえます。"],
      ["雲南・奥出雲", "積雪、凍結、高低差を見て外構を選びます。"],
      ["隠岐", "強風、塩害、資材搬入、メンテナンス性を重視します。"],
    ],
    cities: ["松江市", "出雲市", "浜田市", "益田市", "大田市", "雲南市"],
  },
  {
    slug: "okayama",
    name: "岡山県",
    region: "中国",
    profile: "瀬戸内の少雨傾向、南部の都市外構、北部の積雪・寒冷、山あいの高低差を分けて確認したい地域です。",
    topNeeds: ["駐車場拡張", "北部の雪・凍結対策", "暑さと西日対策", "排水と境界確認"],
    areas: [
      ["岡山・倉敷", "都市型住宅では駐車場、目隠し、宅配ボックス、道路境界を整理します。"],
      ["備前・瀬戸内", "沿岸風と日射、塩害の可能性を見て素材を選びます。"],
      ["備中・井笠", "高低差や農地隣接では排水と土留めを先に確認します。"],
      ["美作・県北", "積雪・凍結を踏まえ、滑りにくい舗装とカーポートを検討します。"],
    ],
    cities: ["岡山市", "倉敷市", "津山市", "総社市", "玉野市", "笠岡市"],
  },
  {
    slug: "hiroshima",
    name: "広島県",
    region: "中国",
    profile: "都市部の狭小外構、瀬戸内沿岸の塩害、山地の土砂災害・高低差を分けて確認したい地域です。",
    topNeeds: ["高低差と土砂災害確認", "狭小地の駐車場", "沿岸部の塩害対策", "雨水排水"],
    areas: [
      ["広島都市圏", "坂道、高低差、擁壁、狭小地の駐車場を確認します。"],
      ["福山・備後", "車利用、日射、沿岸風を見て、カーポートとフェンスを選びます。"],
      ["呉・沿岸島しょ", "塩害、風、斜面、道路幅員を確認します。"],
      ["県北", "積雪、凍結、広い敷地の動線を整理します。"],
    ],
    cities: ["広島市", "福山市", "呉市", "東広島市", "尾道市", "三原市"],
  },
  {
    slug: "yamaguchi",
    name: "山口県",
    region: "中国",
    profile: "瀬戸内・日本海・内陸で風、塩害、雨、日射が変わり、金物と排水を分けて確認したい地域です。",
    topNeeds: ["塩害に強い金物", "台風時の耐風", "雨水排水", "駐車場と庭の管理軽減"],
    areas: [
      ["山口・防府", "住宅地の駐車場、目隠し、庭管理を整理します。"],
      ["下関・長門沿岸", "海風、塩害、強風を踏まえ、金物とフェンスを選びます。"],
      ["宇部・周南", "瀬戸内側の工業沿岸では塩害と風を確認します。"],
      ["岩国・県東部", "高低差と雨水、道路境界を見ます。"],
    ],
    cities: ["山口市", "下関市", "宇部市", "周南市", "岩国市", "防府市"],
  },
  {
    slug: "tokushima",
    name: "徳島県",
    region: "四国",
    profile: "台風・豪雨、沿岸部の塩害、吉野川流域の浸水想定、山間部の高低差を確認したい地域です。",
    topNeeds: ["台風時の耐風", "浸水想定と排水", "塩害対策", "斜面・擁壁確認"],
    areas: [
      ["徳島・鳴門", "海風、台風、住宅地の駐車場を見て仕様を決めます。"],
      ["吉野川流域", "浸水想定、雨水排水、土間勾配を先に確認します。"],
      ["阿南・南部沿岸", "塩害、強風、多雨を踏まえ、金物とフェンスを選びます。"],
      ["山間部", "高低差、土留め、落石・排水を確認します。"],
    ],
    cities: ["徳島市", "鳴門市", "阿南市", "吉野川市", "小松島市", "美馬市"],
  },
  {
    slug: "kagawa",
    name: "香川県",
    region: "四国",
    profile: "瀬戸内の少雨傾向、夏の日射、沿岸の塩害、狭小・平坦地の排水を整理したい地域です。",
    topNeeds: ["暑さと日射対策", "沿岸部の塩害対策", "駐車場拡張", "雨水利用・排水確認"],
    areas: [
      ["高松・東讃", "都市型住宅では駐車場、目隠し、日射対策を組み合わせます。"],
      ["丸亀・中讃", "平坦地の駐車場と道路境界、雨水排水を確認します。"],
      ["西讃", "沿岸風、塩害、広い敷地の車両動線を見ます。"],
      ["島しょ", "塩害、強風、資材搬入、メンテナンス性を重視します。"],
    ],
    cities: ["高松市", "丸亀市", "坂出市", "観音寺市", "さぬき市", "三豊市"],
  },
  {
    slug: "ehime",
    name: "愛媛県",
    region: "四国",
    profile: "瀬戸内沿岸の塩害、南予の斜面・豪雨、台風時の風を分けて計画したい地域です。",
    topNeeds: ["塩害に強い金物", "台風時の耐風", "斜面・擁壁確認", "雨水排水"],
    areas: [
      ["松山・中予", "住宅地の駐車場、目隠し、庭管理を整理します。"],
      ["今治・東予", "海風、塩害、工業沿岸の環境を見て金物を選びます。"],
      ["新居浜・西条", "車利用、日射、排水を先に確認します。"],
      ["宇和島・南予", "斜面、多雨、台風、塩害を踏まえ、土留めと排水を重視します。"],
    ],
    cities: ["松山市", "今治市", "新居浜市", "西条市", "宇和島市", "大洲市"],
  },
  {
    slug: "kochi",
    name: "高知県",
    region: "四国",
    profile: "台風・豪雨・沿岸塩害・山間部の高低差が外構仕様に直結するため、排水と耐風を最優先で確認したい地域です。",
    topNeeds: ["豪雨時の排水", "台風時の耐風", "塩害対策", "斜面・擁壁確認"],
    areas: [
      ["高知市周辺", "住宅地の駐車場、目隠し、豪雨時の排水を確認します。"],
      ["東部沿岸", "台風、塩害、強風を踏まえ、金物とフェンスを選びます。"],
      ["西部沿岸", "海風、多雨、浸水想定を確認します。"],
      ["山間部", "斜面、擁壁、土砂災害想定、排水経路を先に見ます。"],
    ],
    cities: ["高知市", "南国市", "四万十市", "香南市", "土佐市", "須崎市"],
  },
  {
    slug: "fukuoka",
    name: "福岡県",
    region: "九州",
    profile: "都市部の狭小外構、郊外の駐車場需要、沿岸の塩害、豪雨時の排水を分けて考えたい地域です。",
    topNeeds: ["狭小地の駐車場", "目隠しフェンス", "豪雨時の排水", "沿岸部の塩害対策"],
    areas: [
      ["福岡都市圏", "狭小地、駐車場、宅配ボックス、目隠しをコンパクトにまとめます。"],
      ["北九州", "沿岸風、塩害、坂道、高低差を確認します。"],
      ["筑後", "平坦地の排水、駐車場拡張、庭管理を重視します。"],
      ["筑豊", "住宅地の道路境界、土間、フェンスを整理します。"],
    ],
    cities: ["福岡市", "北九州市", "久留米市", "飯塚市", "春日市", "大牟田市"],
  },
  {
    slug: "saga",
    name: "佐賀県",
    region: "九州",
    profile: "平野部の水はけ、有明海沿岸の塩害・浸水想定、郊外住宅の駐車場需要を確認したい地域です。",
    topNeeds: ["雨水排水と水はけ", "駐車場拡張", "沿岸部の塩害対策", "浸水想定確認"],
    areas: [
      ["佐賀平野", "平坦地の排水、土間勾配、駐車場範囲を先に決めます。"],
      ["鳥栖・東部", "車利用と住宅密度を踏まえ、駐車場と目隠しを整えます。"],
      ["唐津・玄海沿岸", "海風、塩害、強風を見て金物を選びます。"],
      ["有明海沿岸", "浸水想定、塩害、排水先を確認します。"],
    ],
    cities: ["佐賀市", "唐津市", "鳥栖市", "伊万里市", "武雄市", "鹿島市"],
  },
  {
    slug: "nagasaki",
    name: "長崎県",
    region: "九州",
    profile: "坂道・高低差、島しょ部の塩害、台風時の強風、資材搬入条件を確認したい地域です。",
    topNeeds: ["高低差と擁壁確認", "塩害に強い金物", "台風時の耐風", "資材搬入と道路幅員確認"],
    areas: [
      ["長崎市周辺", "坂道、高低差、道路幅員、駐車場の取り方を先に確認します。"],
      ["佐世保・県北", "海風、塩害、斜面、目隠しを整理します。"],
      ["諫早・大村", "住宅地の駐車場、排水、庭管理を重視します。"],
      ["島原・五島・対馬", "塩害、台風、資材搬入、メンテナンス性を確認します。"],
    ],
    cities: ["長崎市", "佐世保市", "諫早市", "大村市", "島原市", "五島市"],
  },
  {
    slug: "kumamoto",
    name: "熊本県",
    region: "九州",
    profile: "地震時の塀安全、阿蘇周辺の高低差・寒冷、沿岸の塩害、豪雨時の排水を確認したい地域です。",
    topNeeds: ["ブロック塀安全確認", "豪雨時の排水", "高低差と擁壁", "沿岸部の塩害対策"],
    areas: [
      ["熊本都市圏", "地震時の塀安全、駐車場、目隠し、排水を整理します。"],
      ["阿蘇", "高低差、火山灰、寒冷差を踏まえ、舗装と排水を確認します。"],
      ["八代・県南", "豪雨、浸水想定、平坦地の排水を重視します。"],
      ["天草", "塩害、台風、資材搬入、維持管理を確認します。"],
    ],
    cities: ["熊本市", "八代市", "天草市", "玉名市", "合志市", "菊池市"],
  },
  {
    slug: "oita",
    name: "大分県",
    region: "九州",
    profile: "沿岸部の塩害、山間部の高低差・火山性地形、温泉地周辺の景観・排水を確認したい地域です。",
    topNeeds: ["塩害に強い金物", "高低差と擁壁確認", "雨水排水", "景観・温泉地周辺の配慮"],
    areas: [
      ["大分・別府", "沿岸風、高低差、住宅地の駐車場を確認します。"],
      ["中津・宇佐", "平坦地の排水、駐車場、庭管理を整理します。"],
      ["日田・玖珠", "内陸の寒暖差、雨、勾配を見て外構を決めます。"],
      ["佐伯・南部沿岸", "塩害、台風、雨水排水を重視します。"],
    ],
    cities: ["大分市", "別府市", "中津市", "佐伯市", "日田市", "宇佐市"],
  },
  {
    slug: "miyazaki",
    name: "宮崎県",
    region: "九州",
    profile: "台風・強雨・沿岸塩害・日射が外構の耐久性に影響しやすく、排水と耐風を優先したい地域です。",
    topNeeds: ["台風時の耐風", "豪雨時の排水", "塩害対策", "暑さと日射対策"],
    areas: [
      ["宮崎市周辺", "住宅地の駐車場、目隠し、台風時のフェンス強度を確認します。"],
      ["都城・内陸", "車利用、日射、雨水排水、庭管理を整理します。"],
      ["延岡・日向沿岸", "塩害、強風、浸水想定を確認します。"],
      ["県南", "台風、海風、多雨を踏まえ、金物と排水を重視します。"],
    ],
    cities: ["宮崎市", "都城市", "延岡市", "日向市", "日南市", "小林市"],
  },
  {
    slug: "kagoshima",
    name: "鹿児島県",
    region: "九州",
    profile: "台風、桜島の降灰、沿岸塩害、離島の強風・資材搬入を確認し、掃除しやすい外構にしたい地域です。",
    topNeeds: ["降灰に強い舗装・排水", "台風時の耐風", "塩害対策", "離島の搬入・維持管理"],
    areas: [
      ["鹿児島市周辺", "降灰、雨水排水、駐車場、掃除しやすさを重視します。"],
      ["霧島・姶良", "火山灰、日射、住宅地の駐車場需要を見ます。"],
      ["大隅・薩摩半島", "台風、塩害、豪雨を踏まえ、金物とフェンスを選びます。"],
      ["奄美・離島", "強風、塩害、資材搬入、メンテナンス性を確認します。"],
    ],
    cities: ["鹿児島市", "霧島市", "鹿屋市", "薩摩川内市", "姶良市", "奄美市"],
  },
  {
    slug: "okinawa",
    name: "沖縄県",
    region: "九州・沖縄",
    profile: "台風、強風、塩害、強い日射を前提に、耐風・防錆・排水・日陰づくりを重視したい地域です。",
    topNeeds: ["台風時の耐風", "塩害に強い金物", "強い日射への日陰計画", "雨水排水"],
    areas: [
      ["那覇・南部", "住宅密度、駐車場、目隠し、台風時の安全性を確認します。"],
      ["中部", "車利用、塩害、日射を見てカーポートとフェンスを選びます。"],
      ["北部", "強風、雨、自然環境との相性、排水を重視します。"],
      ["離島", "塩害、台風、資材搬入、修理しやすい仕様を優先します。"],
    ],
    cities: ["那覇市", "沖縄市", "浦添市", "宜野湾市", "うるま市", "名護市"],
  },
];

function html(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, "");
}

function listItems(items) {
  return items.map((item) => `<li>${html(item)}</li>`).join("\n");
}

function details(items) {
  return items.map(([title, body]) => `
        <details class="service-detail">
          <summary>${html(title)}</summary>
          <p>${html(body)}</p>
        </details>`).join("\n");
}

function cardGrid(items) {
  return items.map((item) => `<article class="keyword-card"><h3>${html(item)}</h3><p>${html(item)}は、地域条件・敷地条件・公式制度の確認結果で仕様が変わります。</p></article>`).join("\n");
}

function sourceList() {
  return sourceLinks.map((source) => `<li><a href="${source.url}">${html(source.label)}</a></li>`).join("\n");
}

function renderPrefecturePage(pref) {
  const url = `${baseUrl}/${pref.slug}/`;
  const title = `${pref.name}の外構工事・エクステリア地域相談ページ | ${siteName}`;
  const description = `${pref.name}で外構工事・エクステリア工事を検討する前に、地域事情、対応エリア、工事種類、素材、料金目安、補助・制度の確認先を整理。`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteName,
        url: `${baseUrl}/`,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "TOP", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: pref.name, item: url },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${pref.name}の外構工事・エクステリア地域相談ページ`,
        description,
        inLanguage: "ja",
        publisher: { "@id": `${baseUrl}/#organization` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: today,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${pref.name}で外構工事をする前に最初に確認することは何ですか？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "気象条件、道路境界、排水、駐車台数、ブロック塀や擁壁の安全性、市区町村の補助制度を分けて確認します。",
            },
          },
          {
            "@type": "Question",
            name: "補助金の金額はこのページだけで判断できますか？",
            acceptedAnswer: {
              "@type": "Answer",
              text: "判断できません。補助金は市区町村と年度で変わるため、このページでは未確認項目を要確認として扱い、公式情報で確認する前提で整理しています。",
            },
          },
        ],
      },
    ],
  };

  const areaDetails = details(pref.areas);
  const cityChips = pref.cities.map((city) => `<span class="chip">${html(city)}</span>`).join("\n");
  const costFactors = [
    "既存ブロック塀・土間・庭木の撤去量",
    "残土処分と搬出経路",
    "道路との高低差と排水先",
    "カーポート・フェンス・門柱のメーカー仕様",
    ...pref.topNeeds.slice(0, 2),
  ];

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${html(title)}</title>
  <meta name="description" content="${html(description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${html(`${pref.name}の外構工事・エクステリア地域相談ページ`)}">
  <meta property="og:description" content="${html(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${baseUrl}/assets/photos/real-exterior-garden-fence.jpg">
  <link rel="stylesheet" href="../assets/site.css">
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body class="prefecture-page ${pref.slug}-prefecture">
  <header class="site-header">
    <nav class="nav" aria-label="主要ナビゲーション">
      <a class="brand" href="../" aria-label="トップへ">${siteName}</a>
      <div class="nav-links city-nav-links">
        <a href="#needs">需要</a>
        <a href="#area">地域</a>
        <a href="#works">工事</a>
        <a href="#subsidy">補助</a>
        <a href="#faq">FAQ</a>
      </div>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="パンくずリスト">
    <a href="../">TOP</a>
    <span aria-current="page">${html(pref.name)}</span>
  </nav>

  <section class="hero city-hero" aria-label="${html(pref.name)}の外構工事・エクステリア情報">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow"><span>${html(pref.name)}で外構工事やエクステリア工事業者に依頼する前に確認すること</span></p>
        <h1>${html(pref.name)}の外構工事・エクステリア地域相談ページ</h1>
        <p class="hero-lead">${html(pref.profile)}</p>
        <div class="hero-actions">
          <a class="button primary" href="#needs">地域事情を見る</a>
          <a class="button" href="#subsidy">補助・制度を見る</a>
        </div>
      </div>
      <div class="hero-panel">
        <h2>${html(pref.name)}で特に確認したい外構項目</h2>
        <ul class="quick-list">
${listItems(pref.topNeeds)}
        </ul>
      </div>
    </div>
  </section>

  <div class="page-shell">
  <main id="content" class="page">
    <section class="tldr" aria-labelledby="intro-title">
      <div>
        <p class="section-label">はじめに</p>
        <h2 id="intro-title">${html(pref.name)}でエクステリア外構工事を検討している方へ</h2>
        <p>${html(pref.name)}の外構工事は、同じ県内でも市街地、沿岸部、山間部、盆地、島しょ部などで条件が変わります。このページでは、業者へ依頼する前に確認したい項目を「需要プロファイル」「地域情報」「工事種類」「素材」「料金」「補助・制度」の順に整理します。</p>
      </div>
    </section>

    <section class="numbered-toc" aria-labelledby="toc-title">
      <p class="section-label">ページ目次</p>
      <h2 id="toc-title">${html(pref.name)}ページで確認できること</h2>
      <ol>
        <li><a href="#needs">需要プロファイル</a><span>検索されやすい相談内容</span></li>
        <li><a href="#area">地域情報・対応エリア</a><span>地域ブロックと主要市町村</span></li>
        <li><a href="#types">外構タイプ</a><span>オープン・クローズ・リフォーム</span></li>
        <li><a href="#works">エクステリア外構工事の種類</a><span>クリックで詳細を確認</span></li>
        <li><a href="#materials">種類素材・デザイン</a><span>気候と素材の相性</span></li>
        <li><a href="#cost">料金目安</a><span>費用が変わる要因</span></li>
        <li><a href="#subsidy">補助・制度</a><span>公式確認が必要な項目</span></li>
        <li><a href="#contractor">施工の流れ・業者選び</a><span>比較前にそろえる条件</span></li>
        <li><a href="#faq">FAQ・Q&A</a><span>よくある質問</span></li>
      </ol>
    </section>

    <section id="needs" class="section">
      <div class="section-header">
        <p class="section-label">需要プロファイル</p>
        <h2>${html(pref.name)}で外構工事を調べるときに検索されやすい項目</h2>
        <p>${html(pref.profile)}</p>
      </div>
      <div class="keyword-grid">
${cardGrid(pref.topNeeds)}
      </div>
    </section>

    <section id="area" class="section">
      <div class="section-header">
        <p class="section-label">地域情報・対応エリア</p>
        <h2>${html(pref.name)}の地域事情をブロックで見る</h2>
        <p>県内でも、海沿い、山沿い、盆地、市街地、郊外で外構の優先順位は変わります。見積もり前に該当地域の条件をメモしておくと比較しやすくなります。</p>
      </div>
      <div class="faq">
${areaDetails}
      </div>
      <div class="chip-row" aria-label="${html(pref.name)}の主要対応エリア">
${cityChips}
      </div>
    </section>

    <section id="types" class="section">
      <div class="section-header">
        <p class="section-label">外構タイプ</p>
        <h2>${html(pref.name)}で考えたい外構タイプ</h2>
        <p>道路からの見え方だけでなく、車の入れやすさ、防犯、目隠し、排水、メンテナンスを同時に見ます。</p>
      </div>
      <div class="split-grid">
        <article class="split-card"><h3>オープン外構</h3><p>駐車しやすく費用を抑えやすい一方で、道路からの視線、防犯、境界の見せ方を整理します。</p></article>
        <article class="split-card"><h3>セミクローズ外構</h3><p>フェンスや門柱で必要な場所だけを区切り、視線と開放感のバランスを取ります。</p></article>
        <article class="split-card"><h3>外構リフォーム</h3><p>既存塀、土間、庭木、物置、排水の撤去・再利用範囲で費用が変わります。</p></article>
      </div>
    </section>

    <section id="works" class="section">
      <div class="section-header">
        <p class="section-label">工事</p>
        <h2>${html(pref.name)}で対応できるエクステリア外構工事の種類</h2>
        <p>各ブロックを開くと、依頼前に確認したいポイントを見られます。</p>
      </div>
      <div class="faq">
        <details class="service-detail"><summary>駐車場・土間コンクリート</summary><p>台数、勾配、排水、目地、残土処分、既存撤去を分けて見積もります。</p></details>
        <details class="service-detail"><summary>カーポート・サイクルポート</summary><p>${html(pref.topNeeds[0])}を踏まえ、耐風・耐雪・柱位置・屋根材を確認します。</p></details>
        <details class="service-detail"><summary>フェンス・目隠し</summary><p>高さ、目隠し率、風抜け、基礎、境界位置、隣地への圧迫感を確認します。</p></details>
        <details class="service-detail"><summary>門柱・宅配ボックス・照明</summary><p>表札、ポスト、宅配ボックス、電気配線、防犯灯の位置を動線に合わせます。</p></details>
        <details class="service-detail"><summary>ブロック塀・擁壁まわり</summary><p>古い塀や高低差がある場合は、撤去・補強・再構築の前に法令と安全性を確認します。</p></details>
        <details class="service-detail"><summary>庭・雑草対策・人工芝</summary><p>防草シート、砂利、人工芝、植栽範囲を、将来の管理負担から逆算します。</p></details>
      </div>
    </section>

    <section id="materials" class="section">
      <div class="section-header">
        <p class="section-label">種類素材・デザイン</p>
        <h2>${html(pref.name)}の気候に合わせた素材選び</h2>
        <p>素材は見た目だけでなく、雨、風、日射、塩害、凍結、雪、清掃のしやすさで選びます。</p>
      </div>
      <div class="material-grid">
        <article class="material-card"><h3>アルミ・スチール金物</h3><p>沿岸や強風地域では防錆、耐風、保証条件を確認します。</p></article>
        <article class="material-card"><h3>土間コンクリート</h3><p>勾配、目地、排水、ひび割れ対策、滑りにくさを確認します。</p></article>
        <article class="material-card"><h3>天然石・タイル・舗装材</h3><p>濡れたときの滑り、凍結、汚れ、清掃性を見て選びます。</p></article>
      </div>
    </section>

    <section id="cost" class="section">
      <div class="section-header">
        <p class="section-label">料金目安</p>
        <h2>${html(pref.name)}の外構費用で差が出るポイント</h2>
        <p>金額は施工面積だけでなく、撤去、搬入、排水、地盤、高低差、製品グレードで変わります。</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">確認項目</th><th scope="col">見積もりで見ること</th></tr></thead>
          <tbody>
${costFactors.map((factor) => `            <tr><th scope="row">${html(factor)}</th><td>数量、仕様、撤去範囲、追加費用が出る条件を書面で確認します。</td></tr>`).join("\n")}
          </tbody>
        </table>
      </div>
    </section>

    <section id="subsidy" class="section">
      <div class="section-header">
        <p class="section-label">補助・制度</p>
        <h2>${html(pref.name)}で確認できるエクステリア外構工事の補助・制度</h2>
        <p>ブロック塀撤去、生垣、雨水タンク、景観、耐震関連は市区町村で年度・受付期間・上限額が変わります。</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">制度種別</th><th scope="col">このページでの扱い</th><th scope="col">確認先</th></tr></thead>
          <tbody>
            <tr><th scope="row">ブロック塀撤去・改善</th><td>—／要確認</td><td>市区町村の耐震・建築指導・防災担当</td></tr>
            <tr><th scope="row">生垣・緑化助成</th><td>—／要確認</td><td>市区町村の公園緑地・環境担当</td></tr>
            <tr><th scope="row">雨水タンク・浸透ます</th><td>—／要確認</td><td>上下水道・環境・河川担当</td></tr>
            <tr><th scope="row">景観地区・地区計画</th><td>—／要確認</td><td>都市計画・景観担当</td></tr>
          </tbody>
        </table>
      </div>
      <p class="source-note">補助金の金額や対象工事は推測せず、公式ページで確認できるまで「—／要確認」として扱います。</p>
    </section>

    <section id="contractor" class="section">
      <div class="section-header">
        <p class="section-label">施工の流れ・業者選び</p>
        <h2>${html(pref.name)}で外構業者を比較する前にそろえる条件</h2>
        <p>同じ条件で比較できるように、施工範囲、素材、撤去、排水、保証、補助制度の確認状況をそろえます。</p>
      </div>
      <div class="process-grid">
        <article class="process-card"><h3>1. 現地条件</h3><p>道路幅、境界、高低差、排水、既存物を写真と図で共有します。</p></article>
        <article class="process-card"><h3>2. 仕様</h3><p>製品名、高さ、色、耐風・耐雪、舗装面積を明細に残します。</p></article>
        <article class="process-card"><h3>3. 制度確認</h3><p>補助金や条例は市区町村公式情報で年度と受付状況を確認します。</p></article>
        <article class="process-card"><h3>4. 比較</h3><p>保証、追加費用、工期、近隣対応、施工後の不具合対応を確認します。</p></article>
      </div>
      <div class="note top-gap" role="note">全国共通の比較軸は <a class="official-link" href="../guide/choose-contractor/">外構業者の選び方</a> と <a class="official-link" href="../guide/product-select/">設備・製品の選び方</a> も確認してください。</div>
    </section>

    <section id="faq" class="section">
      <div class="section-header">
        <p class="section-label">FAQ・Q&A</p>
        <h2>${html(pref.name)}の外構工事でよくある質問</h2>
      </div>
      <div class="faq">
        <details><summary>${html(pref.name)}では何を最初に確認すべきですか？</summary><p>${html(pref.topNeeds.join("、"))}を先に確認します。あわせて道路境界、排水、既存塀の安全性を見ます。</p></details>
        <details><summary>補助金はどこで確認しますか？</summary><p>市区町村の公式サイトで、ブロック塀撤去、生垣、雨水タンク、景観、耐震などの担当ページを確認します。金額は年度で変わるため、見積もり前に最新情報を確認します。</p></details>
        <details><summary>相見積もりで注意することは？</summary><p>同じ施工範囲、同じ製品グレード、同じ撤去範囲で比較します。一式表記だけではなく、数量と単価、保証条件を確認します。</p></details>
      </div>
    </section>

    <section id="policy" class="section">
      <div class="section-header">
        <p class="section-label">詳しい解説・公式情報</p>
        <h2>${html(pref.name)}ページの確認方針</h2>
        <p>このページは外構・エクステリアの地域情報を整理するポータルです。補助金申請、設計判断、法令判断、施工可否の代行ではありません。</p>
      </div>
      <div class="warning-card">
        <strong>未確認情報の扱い</strong>
        <p>市区町村別の補助金額、受付期間、条例、地区計画、景観条件は年度や所在地で変わるため、確認できていないものは「—／要確認」と表示します。</p>
      </div>
      <ul class="source-list top-gap">
${sourceList()}
      </ul>
    </section>

    <p class="date-row">最終更新日: <time datetime="${today}">2026年6月25日</time></p>
  </main>

  <aside class="page-aside" aria-label="${html(pref.name)}のページ内メニュー">
    <div class="side-card">
      <h2>ページ内メニュー</h2>
      <ul class="side-list">
        <li><a href="#needs">需要プロファイル</a></li>
        <li><a href="#area">地域情報・対応エリア</a></li>
        <li><a href="#types">外構タイプ</a></li>
        <li><a href="#works">工事の種類</a></li>
        <li><a href="#materials">素材・デザイン</a></li>
        <li><a href="#cost">料金目安</a></li>
        <li><a href="#subsidy">補助・制度</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </div>
    <div class="side-card">
      <h2>補助金・関連窓口と公式情報</h2>
      <ul class="side-list">
        <li>ブロック塀: —／要確認</li>
        <li>生垣・緑化: —／要確認</li>
        <li>雨水・浸透ます: —／要確認</li>
        <li><a href="https://www.data.jma.go.jp/stats/etrn/index.php">気象庁データ検索</a></li>
        <li><a href="https://disaportal.gsi.go.jp/">ハザードマップポータル</a></li>
        <li><a href="https://www.e-stat.go.jp/">e-Stat</a></li>
      </ul>
    </div>
  </aside>
  </div>
</body>
</html>
`;
}

function renderData(pref) {
  return `meta:
  slug: ${pref.slug}
  name: ${pref.name}
  region: ${pref.region}
  page_url: ${baseUrl}/${pref.slug}/
  date_modified: ${today}
  verified_date: ${today}
  content_depth: initial_prefecture_page

quality_gate:
  page_type: prefecture
  published: true
  full_gold_standard: pending
  unverified_subsidies_are_marked: true
  visible_todos: false
  photo_policy: real_photo_no_people_not_local施工実績

local_profile:
  summary: ${pref.profile}
  top_needs:
${pref.topNeeds.map((item) => `    - ${item}`).join("\n")}
  area_blocks:
${pref.areas.map(([name, note]) => `    - name: ${name}\n      note: ${note}`).join("\n")}
  major_areas:
${pref.cities.map((city) => `    - ${city}`).join("\n")}

official_source_policy:
${sourceLinks.map((source) => `  - label: ${source.label}\n    url: ${source.url}\n    verified_date: ${today}`).join("\n")}

unconfirmed_items:
  - 市区町村別のブロック塀撤去補助金額・受付期間
  - 生垣・緑化・雨水タンクなど年度更新型制度
  - 地区計画・景観地区・がけ条例など所在地別条件
`;
}

function writeGeneratedPages() {
  const existingSlugs = new Set(["hokkaido", "osaka"]);
  for (const pref of prefectures) {
    const dir = path.join(root, pref.slug);
    fs.mkdirSync(dir, { recursive: true });
    if (!existingSlugs.has(pref.slug)) {
      fs.writeFileSync(path.join(dir, "index.html"), renderPrefecturePage(pref), "utf8");
      fs.writeFileSync(path.join(root, "data", "prefectures", `${pref.slug}.yml`), renderData(pref), "utf8");
    }
  }
}

function updateIndex() {
  const indexPath = path.join(root, "index.html");
  let content = fs.readFileSync(indexPath, "utf8");
  const cards = prefectures.map((pref) => {
    const feature = pref.slug === "hokkaido" || pref.slug === "osaka" ? " region-feature" : "";
    return `        <a class="region${feature}" href="${pref.slug}/"><b>${html(pref.name)}</b><span>${html(stripTags(pref.profile))}</span></a>`;
  }).join("\n");
  if (!cards.includes('href="osaka/"')) {
    throw new Error("大阪府カードが生成対象に含まれていません。");
  }
  content = content.replace(
    /<p>自治体公式情報や一次統計を確認し、固有情報の条件を満たした地域から順に公開します。<\/p>/,
    "<p>47都道府県ページを公開しました。補助金や条例など年度更新の情報は、公式確認が必要なものを「—／要確認」として整理しています。</p>"
  );
  const regionPattern = /<div class="region-grid city-directory" aria-label="[^"]*">[\s\S]*?<\/div>\s*<div class="note" role="note">[\s\S]*?<\/div>/;
  if (!regionPattern.test(content)) {
    throw new Error("トップページの地域一覧置換対象が見つかりません。");
  }
  content = content.replace(regionPattern, `<div class="region-grid city-directory" aria-label="47都道府県ページ一覧">\n${cards}\n      </div>\n      <div class="note" role="note">\n        47都道府県ページを公開しました。大阪府内の市ページは大阪府ページから確認できます。市区町村別の補助金・条例・地区計画は年度や所在地で変わるため、詳細調査が済んだものから追記します。\n      </div>`);
  content = content.replace(/dateModified": "\d{4}-\d{2}-\d{2}"/, `dateModified": "${today}"`);
  fs.writeFileSync(indexPath, content, "utf8");
}

function walkHtml(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "assets" || entry.name === "data" || entry.name === "scripts" || entry.name === "partials" || entry.name === "templates") {
      return [];
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walkHtml(full);
    }
    return entry.name === "index.html" ? [full] : [];
  });
}

function updateSitemap() {
  const htmlFiles = walkHtml(root);
  const urls = htmlFiles.map((file) => {
    const rel = path.relative(root, path.dirname(file)).split(path.sep).join("/");
    const url = rel ? `${baseUrl}/${rel}/` : `${baseUrl}/`;
    return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  }).sort((a, b) => {
    const aLoc = a.match(/<loc>(.*?)<\/loc>/)[1];
    const bLoc = b.match(/<loc>(.*?)<\/loc>/)[1];
    if (aLoc === `${baseUrl}/`) return -1;
    if (bLoc === `${baseUrl}/`) return 1;
    return aLoc.localeCompare(bLoc);
  });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");
}

function updateProgress() {
  const progressPath = path.join(root, "data", "_progress.yml");
  const entries = prefectures.map((pref) => `  ${pref.slug}:
    status: published
    path: /${pref.slug}/
    page_url: ${baseUrl}/${pref.slug}/
    published_at: ${today}
    depth: ${pref.slug === "hokkaido" ? "gold_standard" : pref.slug === "osaka" ? "prefecture_plus_city_directory" : "initial_prefecture_page"}
    unverified_subsidies_are_marked: true`).join("\n");
  const content = `meta:
  updated_at: ${today}
  governance:
    - 外構・エクステリア地域ポータル 構築プロンプト v3
    - 県ページ構築プロンプト
    - 県ページ 地域特化コンテンツ 深掘り版

guides_done:
  - slug: gaiko-estimate
    path: /guide/gaiko-estimate/
    title: 外構見積もりの見方
    status: published
  - slug: choose-contractor
    path: /guide/choose-contractor/
    title: 外構業者の選び方
    status: published
  - slug: product-select
    path: /guide/product-select/
    title: 設備・製品の選び方
    status: published
  - slug: boundary-neighbor
    path: /guide/boundary-neighbor/
    title: 境界・近隣トラブルの備え
    status: published
  - slug: hm-vs-pro-cost
    path: /guide/hm-vs-pro-cost/
    title: HM経由と外構専門店の違い
    status: published
  - slug: after-construction
    path: /guide/after-construction/
    title: 施工後の不具合と対処
    status: published

guides_pending:
  - slug: snow-carport
    title: 耐雪カーポートの選び方
    status: not_created
  - slug: wind-resistant-carport
    title: 耐風カーポートの選び方
    status: not_created
  - slug: salt-damage-materials
    title: 塩害に強い外構素材
    status: not_created
  - slug: frost-heave-foundation
    title: 凍上対策と基礎
    status: not_created
  - slug: retaining-wall-cliff
    title: 擁壁とがけ条例
    status: not_created
  - slug: landscape-district-exterior
    title: 景観地区の外構
    status: not_created

prefectures:
${entries}

queue_next:
  - prefecture_detail_research
  - city_page_expansion
  - subsidy_official_confirmation

notes:
  - 47都道府県ページは公開済み。
  - 北海道は詳細調査済みのゴールドスタンダード。
  - その他の都府県は初期公開版として、市区町村別の補助金・条例・地区計画は「—／要確認」と表示する。
  - 未確認の補助金・制度は金額や対象を推測しない。
`;
  fs.writeFileSync(progressPath, content, "utf8");
}

function main() {
  writeGeneratedPages();
  updateIndex();
  updateSitemap();
  updateProgress();
  console.log(`Generated ${prefectures.length} prefecture entries. Created/updated missing pages, index, sitemap, and progress data.`);
}

main();
