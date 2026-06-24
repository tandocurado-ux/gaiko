const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://tandocurado-ux.github.io/gaiko";
const BRAND = "エクステリア外構工事地域相談窓口Coooi";
const DATE = "2026-06-24";
const HERO_IMAGE = `${SITE_URL}/assets/photos/real-exterior-garden-fence.jpg`;

const guides = [
  "guide/gaiko-estimate/",
  "guide/choose-contractor/",
  "guide/after-construction/",
  "guide/boundary-neighbor/",
  "guide/hm-vs-pro-cost/",
  "guide/product-select/",
];

const profiles = {
  urbanDense: {
    label: "都市型・住宅密集地",
    issue: "前面道路、搬入動線、境界、駐車場の取り回しを先に確認します。",
    terrain: "敷地余白が少ない場所では、門柱・フェンス・自転車置き場の数十cmが使いやすさを左右します。",
    lead: "駅近や住宅密集地では、駐車場、門まわり、目隠し、宅配ボックスを同時に整理すると失敗しにくくなります。",
  },
  suburban: {
    label: "郊外住宅地・ニュータウン",
    issue: "既存塀、植栽、駐車台数、庭の維持管理を分けて見積もります。",
    terrain: "戸建て街区では、古い外構の撤去、残土、排水、庭木整理が費用差になりやすいです。",
    lead: "戸建て街区では、新築外構だけでなく経年外構の更新、庭の省管理化、駐車場拡張の相談が出やすい地域です。",
  },
  coastal: {
    label: "沿岸・臨海エリア",
    issue: "潮風、強風、雨水排水、サビにくい金物選びを確認します。",
    terrain: "大阪湾に近い場所では、フェンス、門扉、カーポート金物の耐候性とメンテナンス性を重視します。",
    lead: "沿岸部では、見た目だけでなく潮風・風雨・排水に強い素材選びが外構の持ちに関係します。",
  },
  hills: {
    label: "丘陵・山手住宅地",
    issue: "坂、擁壁、階段、排水、土留め、安全な動線を先に確認します。",
    terrain: "高低差のある敷地では、土間勾配、階段幅、手すり、擁壁まわりの扱いが重要です。",
    lead: "山手や丘陵地では、デザインの前に高低差、排水、土留め、階段まわりを安全側で確認します。",
  },
  mixed: {
    label: "市街地・郊外混在",
    issue: "駅近の狭小地と郊外戸建てで、確認する優先順位を分けます。",
    terrain: "市街地、幹線道路沿い、戸建て街区で、駐車動線・目隠し・排水の条件が変わります。",
    lead: "市街地と郊外住宅地が混在するため、外構タイプをひとつに決め打ちせず、敷地条件ごとに比較します。",
  },
  riverside: {
    label: "平坦地・河川沿い住宅地",
    issue: "排水、道路側への水はけ、搬入経路、境界を先に見ます。",
    terrain: "平坦地でも、既存マス、側溝、雨水の逃げ方で土間やアプローチの設計が変わります。",
    lead: "平坦な住宅地では、駐車場土間、玄関アプローチ、境界フェンスを排水計画と一緒に確認します。",
  },
};

const cities = [
  {
    slug: "osaka",
    name: "大阪市",
    group: "大阪市",
    officialUrl: "https://www.city.osaka.lg.jp/",
    profile: "urbanDense",
    districts: ["北区", "中央区", "天王寺区", "阿倍野区", "住吉区", "住之江区", "東淀川区", "平野区"],
    localNote: "都心部、住宅密集地、湾岸部、昔ながらの戸建て街区が混在します。",
    areaCards: [
      ["都心・駅近住宅地", "門柱や宅配ボックス、目隠しをコンパクトに納める設計が重要です。"],
      ["住宅密集地", "前面道路幅、搬入経路、隣地境界、工事中の近隣配慮を先に確認します。"],
      ["湾岸・河川沿い", "風雨、サビ、排水、浸水リスクの確認を素材選びと合わせて行います。"],
    ],
  },
  {
    slug: "sakai",
    name: "堺市",
    group: "泉北",
    officialUrl: "https://www.city.sakai.lg.jp/",
    profile: "mixed",
    districts: ["堺区", "北区", "中区", "東区", "西区", "南区", "美原区"],
    localNote: "政令市として市域が広く、臨海部、古い市街地、泉北ニュータウン、内陸住宅地で条件が変わります。",
    areaCards: [
      ["堺区・北区周辺", "市街地では道路幅、門柱位置、自転車置き場、隣地境界を細かく確認します。"],
      ["西区・臨海寄り", "潮風や風雨に配慮し、フェンスやカーポート金物は耐候性を重視します。"],
      ["南区・美原区周辺", "戸建て街区では駐車場拡張、庭の省管理化、既存塀撤去が検討軸です。"],
    ],
  },
  {
    slug: "kishiwada",
    name: "岸和田市",
    group: "泉南",
    officialUrl: "https://www.city.kishiwada.lg.jp/",
    profile: "mixed",
    districts: ["岸城町", "春木", "久米田", "東岸和田", "山直", "山滝", "牛滝"],
    localNote: "海側の市街地から山手住宅地まであり、潮風、坂、駐車場動線で外構条件が変わります。",
    areaCards: [
      ["岸和田駅・春木周辺", "市街地では前面道路、既存塀、駐車スペースの出入りを確認します。"],
      ["久米田・東岸和田周辺", "戸建て街区では庭木整理、フェンス更新、駐車場土間の相談が出やすいです。"],
      ["山直・山滝方面", "高低差、排水、擁壁、階段まわりを安全側で見積もります。"],
    ],
  },
  {
    slug: "toyonaka",
    name: "豊中市",
    group: "北摂",
    officialUrl: "https://www.city.toyonaka.osaka.jp/",
    profile: "mixed",
    districts: ["千里中央", "桃山台", "緑地公園", "服部", "庄内", "岡町", "桜塚", "蛍池"],
    existing: true,
  },
  {
    slug: "ikeda",
    name: "池田市",
    group: "北摂",
    officialUrl: "https://www.city.ikeda.osaka.jp/",
    profile: "hills",
    districts: ["池田駅周辺", "石橋阪大前", "五月山", "伏尾台", "鉢塚", "神田"],
    localNote: "駅周辺の市街地と五月山側の高低差がある住宅地で、駐車動線や階段まわりの条件が変わります。",
    areaCards: [
      ["池田駅・石橋阪大前周辺", "駅近住宅地では門まわり、駐輪、目隠しをコンパクトに整理します。"],
      ["五月山・伏尾台方面", "坂、階段、手すり、擁壁、排水を外構計画の早い段階で確認します。"],
      ["神田・鉢塚周辺", "既存塀や庭木の撤去、駐車場土間、境界フェンスを分けて見積もります。"],
    ],
  },
  {
    slug: "suita",
    name: "吹田市",
    group: "三島",
    officialUrl: "https://www.city.suita.osaka.jp/",
    profile: "mixed",
    districts: ["江坂", "千里山", "山田", "北千里", "南千里", "岸辺", "吹田駅周辺"],
    localNote: "江坂周辺の都市型住宅地、千里山・千里ニュータウン側の丘陵住宅地、岸辺周辺の更新街区で条件が分かれます。",
    areaCards: [
      ["江坂・吹田駅周辺", "狭小地や駅近住宅では、駐車動線、門柱、宅配ボックスの納まりを確認します。"],
      ["千里山・北千里・南千里", "丘陵地や建替え街区では、既存塀、擁壁、植栽、階段まわりを見ます。"],
      ["岸辺・山田周辺", "新旧住宅が混在するため、撤去範囲と新設範囲を写真で分けて比較します。"],
    ],
  },
  {
    slug: "izumiotsu",
    name: "泉大津市",
    group: "泉北",
    officialUrl: "https://www.city.izumiotsu.lg.jp/",
    profile: "coastal",
    districts: ["泉大津駅周辺", "松ノ浜", "北助松", "条南", "東雲町", "助松町"],
    localNote: "大阪湾に近い平坦な市街地が多く、潮風、風雨、道路側からの見え方を意識した外構が向きます。",
    areaCards: [
      ["泉大津駅・松ノ浜周辺", "駅近住宅では門まわり、駐車場、目隠しを省スペースで計画します。"],
      ["北助松・助松町周辺", "沿岸寄りでは金物のサビ、強風、カーポート屋根材の選定を確認します。"],
      ["条南・東雲町周辺", "平坦地では土間勾配、雨水マス、側溝への排水を先に見ます。"],
    ],
  },
  {
    slug: "takatsuki",
    name: "高槻市",
    group: "三島",
    officialUrl: "https://www.city.takatsuki.osaka.jp/",
    profile: "mixed",
    districts: ["高槻駅周辺", "富田", "摂津富田", "阿武山", "日吉台", "上牧", "城南町"],
    localNote: "JR・阪急沿線の市街地と北部の丘陵住宅地で、駐車動線、擁壁、庭の扱いが変わります。",
    areaCards: [
      ["高槻駅・富田周辺", "市街地では道路幅、駐車スペース、門柱位置を細かく確認します。"],
      ["阿武山・日吉台周辺", "高低差のある住宅地では階段、手すり、土留め、排水が重要です。"],
      ["上牧・城南町周辺", "戸建て更新では既存塀、庭木、駐車場土間の撤去範囲を分けます。"],
    ],
  },
  {
    slug: "kaizuka",
    name: "貝塚市",
    group: "泉南",
    officialUrl: "https://www.city.kaizuka.lg.jp/",
    profile: "mixed",
    districts: ["貝塚駅周辺", "二色浜", "水間", "東山", "名越", "三ツ松"],
    localNote: "海側の市街地と水間方面の山手住宅地があり、潮風と高低差の両方を意識します。",
    areaCards: [
      ["貝塚駅・二色浜周辺", "沿岸寄りでは耐候性、目隠し、駐車場土間の排水を確認します。"],
      ["水間・三ツ松方面", "坂、階段、擁壁、庭木整理を外構費用に含めて見ます。"],
      ["東山・名越周辺", "戸建て街区ではフェンス更新、駐車場拡張、庭の省管理化が検討軸です。"],
    ],
  },
  {
    slug: "moriguchi",
    name: "守口市",
    group: "北河内",
    officialUrl: "https://www.city.moriguchi.osaka.jp/",
    profile: "urbanDense",
    districts: ["守口市駅周辺", "大日", "土居", "滝井", "八雲", "佐太"],
    localNote: "大阪市に近い住宅密集地が多く、狭い前面道路、駐輪、宅配ボックス、目隠しの納まりが重要です。",
    areaCards: [
      ["守口市駅・土居・滝井周辺", "駅近の狭小地では門柱位置と駐輪スペースを一緒に考えます。"],
      ["大日・佐太周辺", "幹線道路や商業施設周辺では視線、車の出入り、夜間照明を確認します。"],
      ["八雲周辺", "既存塀や境界フェンスを更新する場合は、撤去範囲と隣地側の見え方を整理します。"],
    ],
  },
  {
    slug: "hirakata",
    name: "枚方市",
    group: "北河内",
    officialUrl: "https://www.city.hirakata.osaka.jp/",
    profile: "mixed",
    districts: ["枚方市駅周辺", "樟葉", "香里ケ丘", "津田", "長尾", "牧野", "御殿山"],
    localNote: "京阪沿線、香里ケ丘や長尾方面の住宅地、丘陵地で外構の優先順位が変わります。",
    areaCards: [
      ["枚方市駅・御殿山・牧野周辺", "駅近住宅では駐車動線、門まわり、目隠しをコンパクトに整理します。"],
      ["樟葉・香里ケ丘周辺", "戸建て街区では既存植栽、フェンス、庭の省管理化を比較します。"],
      ["津田・長尾方面", "高低差や道路勾配がある場合は、階段、土間勾配、排水を確認します。"],
    ],
  },
  {
    slug: "ibaraki",
    name: "茨木市",
    group: "三島",
    officialUrl: "https://www.city.ibaraki.osaka.jp/",
    profile: "mixed",
    districts: ["茨木市駅周辺", "JR茨木", "彩都", "山手台", "総持寺", "南茨木"],
    localNote: "中心市街地、彩都・山手台などの住宅地、幹線道路沿いで道路条件と高低差が変わります。",
    areaCards: [
      ["茨木市駅・JR茨木周辺", "市街地では駐車場、門柱、駐輪、宅配ボックスの配置を先に決めます。"],
      ["彩都・山手台周辺", "丘陵住宅地では擁壁、階段、手すり、排水を安全側で確認します。"],
      ["総持寺・南茨木周辺", "既存塀や庭木の撤去、境界フェンス、車の出入りを分けて見積もります。"],
    ],
  },
  {
    slug: "yao",
    name: "八尾市",
    group: "中河内",
    officialUrl: "https://www.city.yao.osaka.jp/",
    profile: "mixed",
    districts: ["近鉄八尾", "久宝寺", "志紀", "高安", "恩智", "山本", "八尾南"],
    localNote: "平坦な市街地と東部の山手に近い住宅地があり、駐車場土間、境界、坂・排水の条件を分けます。",
    areaCards: [
      ["近鉄八尾・久宝寺周辺", "市街地では駐車場、門まわり、目隠し、駐輪スペースを整理します。"],
      ["高安・恩智・山本周辺", "東側の住宅地では勾配、土留め、階段、雨水処理を確認します。"],
      ["志紀・八尾南周辺", "平坦地では土間コンクリートの勾配、側溝、既存マスを先に見ます。"],
    ],
  },
  {
    slug: "izumisano",
    name: "泉佐野市",
    group: "泉南",
    officialUrl: "https://www.city.izumisano.lg.jp/",
    profile: "mixed",
    districts: ["泉佐野駅周辺", "りんくうタウン", "日根野", "長滝", "上之郷", "鶴原"],
    localNote: "空港・りんくう周辺の沿岸部、日根野方面の住宅地、内陸側で風・排水・高低差の見方が変わります。",
    areaCards: [
      ["泉佐野駅・鶴原周辺", "市街地では道路幅、駐車動線、門柱と宅配ボックスの配置を確認します。"],
      ["りんくうタウン周辺", "沿岸寄りでは潮風、強風、カーポート屋根材、金物の耐候性を見ます。"],
      ["日根野・上之郷方面", "内陸側では庭木、坂、排水、駐車場拡張を分けて検討します。"],
    ],
  },
  {
    slug: "tondabayashi",
    name: "富田林市",
    group: "南河内",
    officialUrl: "https://www.city.tondabayashi.lg.jp/",
    profile: "hills",
    districts: ["富田林駅周辺", "金剛", "寺池台", "喜志", "川西", "東条"],
    localNote: "金剛・寺池台などの住宅地と石川沿い、山手寄りの地形で、庭・駐車場・高低差の確認が必要です。",
    areaCards: [
      ["富田林駅・喜志周辺", "既存塀、門まわり、駐車場土間を道路条件と合わせて確認します。"],
      ["金剛・寺池台周辺", "戸建て街区では庭木整理、フェンス更新、駐車場拡張を検討します。"],
      ["東条・山手方面", "高低差、擁壁、階段、雨水排水を安全側で見積もります。"],
    ],
  },
  {
    slug: "neyagawa",
    name: "寝屋川市",
    group: "北河内",
    officialUrl: "https://www.city.neyagawa.osaka.jp/",
    profile: "urbanDense",
    districts: ["寝屋川市駅周辺", "香里園", "萱島", "寝屋", "打上", "成田"],
    localNote: "京阪沿線の住宅密集地と丘陵寄りの住宅地で、前面道路、駐車場、目隠しの条件が変わります。",
    areaCards: [
      ["寝屋川市駅・萱島周辺", "狭い道路では搬入、駐車動線、門柱位置を数値で確認します。"],
      ["香里園・成田周辺", "丘陵寄りでは階段、手すり、土留め、排水を含めて見積もります。"],
      ["寝屋・打上周辺", "戸建て更新では既存塀、庭木、駐車場土間の撤去を分けます。"],
    ],
  },
  {
    slug: "kawachinagano",
    name: "河内長野市",
    group: "南河内",
    officialUrl: "https://www.city.kawachinagano.lg.jp/",
    profile: "hills",
    districts: ["河内長野駅周辺", "三日市町", "千代田", "美加の台", "南花台", "天野町"],
    localNote: "山手住宅地が多く、高低差、擁壁、庭木、階段、排水計画が外構費用を左右します。",
    areaCards: [
      ["河内長野駅・千代田周辺", "既存塀、駐車場、門まわりを道路条件と合わせて見ます。"],
      ["美加の台・南花台周辺", "高低差のある街区では手すり、階段、土留め、排水が重要です。"],
      ["三日市町・天野町方面", "庭木整理、法面、搬入経路、車両進入条件を先に確認します。"],
    ],
  },
  {
    slug: "matsubara",
    name: "松原市",
    group: "南河内",
    officialUrl: "https://www.city.matsubara.lg.jp/",
    profile: "urbanDense",
    districts: ["河内松原", "高見ノ里", "布忍", "天美", "三宅", "岡"],
    localNote: "大阪市に近い平坦な住宅地が多く、狭い前面道路、境界、駐車場土間、目隠しを整理します。",
    areaCards: [
      ["河内松原・高見ノ里周辺", "駅近住宅では門柱、駐輪、宅配ボックスを省スペースで納めます。"],
      ["天美・布忍周辺", "住宅密集地では搬入経路、境界、フェンス高さ、近隣配慮を確認します。"],
      ["三宅・岡周辺", "平坦地の駐車場土間は勾配、側溝、雨水マスの位置を先に見ます。"],
    ],
  },
  {
    slug: "daito",
    name: "大東市",
    group: "北河内",
    officialUrl: "https://www.city.daito.lg.jp/",
    profile: "mixed",
    districts: ["住道", "野崎", "四条畷駅周辺", "深野", "諸福", "御供田"],
    localNote: "住道周辺の平坦な市街地と生駒山地側の住宅地で、排水と高低差の確認が変わります。",
    areaCards: [
      ["住道・諸福周辺", "平坦地では駐車場土間、門まわり、排水計画を先に確認します。"],
      ["野崎・四条畷駅周辺", "山手寄りでは坂、階段、擁壁、手すりの扱いを見ます。"],
      ["深野・御供田周辺", "既存塀や境界フェンスを更新する場合は撤去範囲を明確にします。"],
    ],
  },
  {
    slug: "izumi",
    name: "和泉市",
    group: "泉北",
    officialUrl: "https://www.city.osaka-izumi.lg.jp/",
    profile: "mixed",
    districts: ["和泉中央", "光明池", "府中町", "北信太", "池上町", "槇尾山方面"],
    localNote: "泉北ニュータウン周辺、JR沿線、山手方面で、庭、駐車場、高低差、植栽管理の比重が変わります。",
    areaCards: [
      ["和泉中央・光明池周辺", "戸建て街区では庭の省管理化、フェンス、駐車場拡張を検討します。"],
      ["府中町・北信太周辺", "市街地では道路幅、門柱、駐輪、駐車動線を確認します。"],
      ["槇尾山方面", "山手では勾配、擁壁、排水、搬入経路を安全側で見ます。"],
    ],
  },
  {
    slug: "minoh",
    name: "箕面市",
    group: "北摂",
    officialUrl: "https://www.city.minoh.lg.jp/",
    profile: "hills",
    districts: ["箕面駅周辺", "桜井", "小野原", "船場", "彩都", "粟生間谷", "森町"],
    localNote: "山手住宅地、彩都・森町などの新しい街区、船場周辺で、高低差と植栽計画の考え方が変わります。",
    areaCards: [
      ["箕面駅・桜井周辺", "坂、階段、既存塀、植栽、車の出入りをまとめて確認します。"],
      ["小野原・彩都周辺", "戸建て街区ではフェンス、庭、カーポート、宅配ボックスを一体で検討します。"],
      ["船場・森町周辺", "新しい街区では景観、道路側からの見え方、駐車台数を先に整えます。"],
    ],
  },
  {
    slug: "kashiwara",
    name: "柏原市",
    group: "中河内",
    officialUrl: "https://www.city.kashiwara.osaka.jp/",
    profile: "hills",
    districts: ["柏原駅周辺", "河内国分", "高井田", "法善寺", "堅下", "国分本町"],
    localNote: "大和川沿いの住宅地と生駒山地側の高低差がある街区で、排水、土留め、道路条件が変わります。",
    areaCards: [
      ["柏原駅・法善寺周辺", "市街地では門まわり、駐車場土間、境界フェンスを整理します。"],
      ["河内国分・国分本町周辺", "坂や高低差がある敷地では階段、擁壁、排水を確認します。"],
      ["高井田・堅下周辺", "既存塀、庭木、車両搬入、土間勾配を分けて見積もります。"],
    ],
  },
  {
    slug: "habikino",
    name: "羽曳野市",
    group: "南河内",
    officialUrl: "https://www.city.habikino.lg.jp/",
    profile: "mixed",
    districts: ["古市", "恵我ノ荘", "高鷲", "羽曳が丘", "誉田", "駒ヶ谷"],
    localNote: "古市周辺の歴史的な街区、羽曳が丘などの住宅地、山手寄りで道路条件と高低差が変わります。",
    areaCards: [
      ["古市・誉田周辺", "道路側の見え方、境界、既存塀、駐車場の出入りを確認します。"],
      ["恵我ノ荘・高鷲周辺", "平坦な住宅地では土間勾配、駐輪、フェンス高さを整理します。"],
      ["羽曳が丘・駒ヶ谷方面", "丘陵地では階段、手すり、庭木、排水を安全側で見ます。"],
    ],
  },
  {
    slug: "kadoma",
    name: "門真市",
    group: "北河内",
    officialUrl: "https://www.city.kadoma.osaka.jp/",
    profile: "urbanDense",
    districts: ["古川橋", "門真市駅周辺", "大和田", "萱島東", "三ツ島", "五月田"],
    localNote: "住宅密集地が多く、門まわり、駐輪、駐車場、隣地境界を省スペースで納める設計が重要です。",
    areaCards: [
      ["古川橋・門真市駅周辺", "駅近住宅では門柱、宅配ボックス、駐輪スペースをまとめて考えます。"],
      ["大和田・萱島東周辺", "前面道路が狭い場合は車の出入りと工事搬入を先に確認します。"],
      ["三ツ島・五月田周辺", "既存塀や境界フェンスの更新では撤去範囲と隣地側の見え方を整理します。"],
    ],
  },
  {
    slug: "settsu",
    name: "摂津市",
    group: "三島",
    officialUrl: "https://www.city.settsu.osaka.jp/",
    profile: "riverside",
    districts: ["千里丘", "正雀", "南摂津", "鳥飼", "別府", "一津屋"],
    localNote: "淀川・安威川周辺の平坦な住宅地があり、排水、道路側への水はけ、駐車場土間の勾配を確認します。",
    areaCards: [
      ["千里丘・正雀周辺", "駅近住宅では門まわり、駐輪、目隠しをコンパクトに計画します。"],
      ["南摂津・一津屋周辺", "幹線道路や物流動線に近い場所では車の出入りと視線対策を確認します。"],
      ["鳥飼・別府周辺", "平坦地では土間勾配、側溝、雨水マス、境界を先に見ます。"],
    ],
  },
  {
    slug: "takaishi",
    name: "高石市",
    group: "泉北",
    officialUrl: "https://www.city.takaishi.lg.jp/",
    profile: "coastal",
    districts: ["高石駅周辺", "羽衣", "東羽衣", "富木", "綾園", "加茂"],
    localNote: "大阪湾に近い住宅地が多く、潮風、強風、金物の耐候性、駐車場土間の排水を重視します。",
    areaCards: [
      ["高石駅・綾園周辺", "市街地では門まわり、駐輪、駐車場の出入りを整理します。"],
      ["羽衣・東羽衣周辺", "沿岸寄りではフェンス、門扉、カーポートの耐候性を確認します。"],
      ["富木・加茂周辺", "平坦地では土間勾配、雨水マス、境界フェンスを先に見ます。"],
    ],
  },
  {
    slug: "fujiidera",
    name: "藤井寺市",
    group: "南河内",
    officialUrl: "https://www.city.fujiidera.lg.jp/",
    profile: "urbanDense",
    districts: ["藤井寺駅周辺", "土師ノ里", "道明寺", "小山", "林", "沢田"],
    localNote: "コンパクトな市域に住宅地が広がり、道路幅、境界、駐車場、門まわりの納まりを丁寧に確認します。",
    areaCards: [
      ["藤井寺駅・小山周辺", "駅近住宅では門柱、宅配ボックス、駐輪を省スペースで納めます。"],
      ["土師ノ里・道明寺周辺", "歴史的な街区では道路側の見え方と既存塀の扱いを確認します。"],
      ["林・沢田周辺", "戸建て更新では駐車場土間、フェンス、庭木整理を分けて見積もります。"],
    ],
  },
  {
    slug: "higashiosaka",
    name: "東大阪市",
    group: "中河内",
    officialUrl: "https://www.city.higashiosaka.lg.jp/",
    profile: "mixed",
    districts: ["布施", "河内小阪", "八戸ノ里", "瓢箪山", "石切", "吉田", "荒本"],
    localNote: "市街地、工業地域に近い住宅地、生駒山地側の高低差がある住宅地で条件が変わります。",
    areaCards: [
      ["布施・河内小阪・八戸ノ里周辺", "住宅密集地では道路幅、門柱、駐輪、目隠しを細かく確認します。"],
      ["吉田・荒本周辺", "幹線道路や事業所が近い場所では視線、駐車動線、照明を整理します。"],
      ["瓢箪山・石切方面", "山手寄りでは坂、階段、擁壁、排水を安全側で見ます。"],
    ],
  },
  {
    slug: "sennan",
    name: "泉南市",
    group: "泉南",
    officialUrl: "https://www.city.sennan.lg.jp/",
    profile: "mixed",
    districts: ["樽井", "岡田浦", "新家", "和泉砂川", "信達", "りんくう南浜"],
    localNote: "沿岸部、JR沿線、山手寄りの住宅地があり、潮風、排水、高低差を分けて確認します。",
    areaCards: [
      ["樽井・岡田浦・りんくう南浜", "沿岸寄りでは耐候性、強風、カーポート屋根材、フェンス材を確認します。"],
      ["和泉砂川・信達周辺", "住宅地では駐車場土間、門まわり、境界フェンスを整理します。"],
      ["新家方面", "高低差や庭木がある敷地では撤去、排水、階段を見積もりに含めます。"],
    ],
  },
  {
    slug: "shijonawate",
    name: "四條畷市",
    group: "北河内",
    officialUrl: "https://www.city.shijonawate.lg.jp/",
    profile: "hills",
    districts: ["忍ケ丘", "四条畷駅周辺", "田原台", "岡山", "南野", "清滝"],
    localNote: "生駒山地側の高低差がある住宅地と駅周辺の市街地で、坂、階段、排水の確認が重要です。",
    areaCards: [
      ["忍ケ丘・岡山周辺", "住宅地では駐車場、門まわり、境界フェンスを道路条件と合わせて見ます。"],
      ["田原台・清滝方面", "丘陵地では擁壁、階段、手すり、排水を安全側で確認します。"],
      ["四条畷駅・南野周辺", "狭い道路や高低差がある場合は搬入経路と土間勾配を先に見ます。"],
    ],
  },
  {
    slug: "katano",
    name: "交野市",
    group: "北河内",
    officialUrl: "https://www.city.katano.osaka.jp/",
    profile: "hills",
    districts: ["交野市駅周辺", "私市", "星田", "郡津", "倉治", "妙見坂"],
    localNote: "山手の緑が近い住宅地が多く、庭、植栽、坂、擁壁、排水を含めて外構を考えます。",
    areaCards: [
      ["交野市駅・郡津周辺", "駅近住宅では門まわり、駐輪、駐車スペースをコンパクトに整理します。"],
      ["私市・妙見坂周辺", "高低差、階段、擁壁、手すり、排水を安全側で確認します。"],
      ["星田・倉治周辺", "戸建て街区では庭木整理、フェンス更新、駐車場拡張を検討します。"],
    ],
  },
  {
    slug: "osakasayama",
    name: "大阪狭山市",
    group: "南河内",
    officialUrl: "https://www.city.osakasayama.osaka.jp/",
    profile: "suburban",
    districts: ["狭山池周辺", "金剛", "大野台", "半田", "茱萸木", "西山台"],
    localNote: "戸建て住宅地が多く、庭の省管理化、駐車場拡張、フェンス更新、道路側からの見え方を確認します。",
    areaCards: [
      ["狭山池・半田周辺", "住宅地では門まわり、フェンス、庭木整理を道路側の見え方と合わせます。"],
      ["金剛・西山台周辺", "戸建て街区では駐車場拡張、庭の省管理化、宅配ボックスを検討します。"],
      ["大野台・茱萸木周辺", "高低差や植栽がある場合は階段、排水、撤去範囲を確認します。"],
    ],
  },
  {
    slug: "hannan",
    name: "阪南市",
    group: "泉南",
    officialUrl: "https://www.city.hannan.lg.jp/",
    profile: "mixed",
    districts: ["尾崎", "鳥取ノ荘", "箱作", "和泉鳥取", "舞", "山中渓"],
    localNote: "海側の住宅地と山手寄りの街区があり、潮風、高低差、排水、庭木の扱いを分けて考えます。",
    areaCards: [
      ["尾崎・鳥取ノ荘・箱作周辺", "沿岸寄りではフェンス、門扉、カーポートの耐候性と強風対策を確認します。"],
      ["和泉鳥取・舞周辺", "住宅地では駐車場土間、目隠し、庭の省管理化を検討します。"],
      ["山中渓方面", "高低差、搬入経路、階段、排水、庭木撤去を先に見ます。"],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function slugUrl(city) {
  return `${SITE_URL}/osaka/${city.slug}/`;
}

function pageTitle(city) {
  return `${city.name}の外構工事・エクステリア費用と確認ポイント`;
}

function metaDescription(city) {
  return `${city.name}で外構工事やエクステリア工事業者に依頼する前に確認したい、費用目安、対応エリア、外構タイプ、補助・制度の確認順、業者比較のポイントを整理。`;
}

function profileOf(city) {
  return profiles[city.profile] || profiles.mixed;
}

function spanJoin(parts) {
  return parts.map((part) => `<span>${escapeHtml(part)}</span>`).join("");
}

function buildAreaCards(city) {
  const cards = city.areaCards || [
    [`${city.districts[0]}周辺`, "駅近住宅地では、門まわり、駐輪、駐車場動線をコンパクトに整理します。"],
    [`${city.districts.slice(1, 4).join("・")}周辺`, "戸建て街区では、既存塀、庭木、フェンス、駐車場土間を分けて見積もります。"],
    [`${city.districts.slice(4, 7).join("・")}周辺`, "道路幅、高低差、排水、搬入経路を現地写真で確認してから比較します。"],
  ];
  return cards
    .map(([title, body]) => `
        <article class="area-pattern">
          <b>${escapeHtml(title)}</b>
          <span>${escapeHtml(body)}</span>
        </article>`)
    .join("");
}

function cityFaq(city) {
  return [
    {
      q: `${city.name}で外構工事の補助金は使えますか。`,
      a: `${city.name}の補助制度は年度、受付期間、対象工事で変わります。ブロック塀撤去、生垣・緑化、雨水貯留、耐震関連などは、契約・着工前に${city.name}公式サイトで最新条件を確認してください。`,
    },
    {
      q: `${city.name}で外構業者を探すときは市内だけに絞るべきですか。`,
      a: `市内業者に限定せず、近隣市まで対応できる外構専門店も含めて2から3社で比較すると、現地確認、見積内訳、保証条件を見やすくなります。`,
    },
    {
      q: `${city.name}の駐車場コンクリート工事はいくら見ればよいですか。`,
      a: `初期検討では1台分15万円から40万円程度を目安にし、掘削、残土、砕石、ワイヤーメッシュ、目地、排水、搬入経路で増減を確認します。`,
    },
    {
      q: `${city.name}でブロック塀を撤去するときの注意点は何ですか。`,
      a: `道路側の安全、隣地境界、撤去後のフェンス高さ、基礎、補助制度の申請順を確認します。補助対象になる場合でも、交付決定前の契約や着工は対象外になることがあります。`,
    },
    {
      q: `${city.name}でカーポートを付けるときは何を確認しますか。`,
      a: `柱位置、屋根の張り出し、道路への出入り、隣地境界、雨樋の排水、強風時の耐風性能を確認します。狭い敷地では自転車動線も同時に見ます。`,
    },
  ];
}

function faqDetails(city) {
  return cityFaq(city)
    .map((item) => `
        <details>
          <summary>${escapeHtml(item.q)}</summary>
          <p>${escapeHtml(item.a)}</p>
        </details>`)
    .join("");
}

function keywordAccordions(city) {
  const p = profileOf(city);
  const keywords = [
    ["外構工事", `${city.name}で外構工事を考えるときは、道路側の安全、駐車動線、境界、排水を分けて確認します。${p.lead}`],
    ["エクステリア", `エクステリアは門柱、フェンス、カーポート、照明、宅配ボックス、植栽をまとめて整える計画です。${city.name}では、見た目だけでなく日常動線と維持管理を重視します。`],
    ["駐車場 コンクリート", `駐車場コンクリートは面積だけでなく、掘削深さ、残土、砕石、ワイヤーメッシュ、目地、勾配、排水で費用が変わります。${city.name}では前面道路と搬入経路も確認します。`],
    ["カーポート", `カーポートは柱位置、屋根材、耐風性能、雨樋の排水、隣地境界を確認します。${city.name}の敷地条件に合わせて、車と自転車の出入りを同時に見ます。`],
    ["フェンス", `フェンスは目隠し、境界、安全、風の抜け方を分けて考えます。高さや色だけでなく、基礎、柱ピッチ、道路側からの見え方を確認します。`],
    ["ブロック塀", `ブロック塀は安全点検、撤去、軽量フェンス化、補助制度の順序確認が重要です。${city.name}公式サイトで対象条件と申請時期を確認してから契約します。`],
    ["門まわり", `門柱、ポスト、表札、照明、インターホン、宅配ボックスは一体で計画すると配線や柱の手戻りを避けやすくなります。`],
    ["庭 リフォーム", `庭リフォームでは、防草シート、砂利、人工芝、植栽整理、ウッドデッキ、物置を暮らし方に合わせて選びます。撤去費と残土処分を先に見積もります。`],
  ];
  return keywords
    .map(([label, body]) => `
        <details>
          <summary>${escapeHtml(`${city.name} ${label}`)}</summary>
          <p>${escapeHtml(body)}</p>
        </details>`)
    .join("");
}

function jsonLd(city) {
  const faq = cityFaq(city).slice(0, 4).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));
  return JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: BRAND,
          url: `${SITE_URL}/`,
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${slugUrl(city)}#breadcrumb`,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "TOP", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "大阪府", item: `${SITE_URL}/osaka/` },
            { "@type": "ListItem", position: 3, name: city.name, item: slugUrl(city) },
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${slugUrl(city)}#webpage`,
          url: slugUrl(city),
          name: pageTitle(city),
          description: metaDescription(city),
          inLanguage: "ja",
          publisher: { "@id": `${SITE_URL}/#organization` },
          breadcrumb: { "@id": `${slugUrl(city)}#breadcrumb` },
          dateModified: DATE,
        },
        {
          "@type": "FAQPage",
          "@id": `${slugUrl(city)}#faq`,
          mainEntity: faq,
        },
      ],
    },
    null,
    2,
  );
}

function cityPage(city) {
  const p = profileOf(city);
  const districtText = city.districts.slice(0, 6).join("・");
  const lead = city.localNote || `${districtText}など、地区ごとの道路条件や住宅地の成り立ちに合わせて外構計画を確認します。`;
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle(city))} | ${escapeHtml(BRAND)}</title>
  <meta name="description" content="${escapeHtml(metaDescription(city))}">
  <link rel="canonical" href="${slugUrl(city)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(pageTitle(city))}">
  <meta property="og:description" content="${escapeHtml(metaDescription(city))}">
  <meta property="og:url" content="${slugUrl(city)}">
  <meta property="og:image" content="${HERO_IMAGE}">
  <link rel="stylesheet" href="../../assets/site.css">
  <script type="application/ld+json">
${jsonLd(city)}
  </script>
</head>
<body>
  <header class="site-header">
    <nav class="nav" aria-label="主要ナビゲーション">
      <a class="brand" href="../../" aria-label="トップへ">${escapeHtml(BRAND)}</a>
      <div class="nav-links city-nav-links">
        <a href="#profile">需要</a>
        <a href="#local">地域</a>
        <a href="#area">エリア</a>
        <a href="#style">タイプ</a>
        <a href="#services">工事</a>
        <a href="#costs">料金</a>
        <a href="#systems">制度</a>
        <a href="#faq">FAQ</a>
      </div>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="パンくずリスト">
    <a href="../../">TOP</a>
    <a href="../">大阪府</a>
    <span aria-current="page">${escapeHtml(city.name)}</span>
  </nav>

  <section class="city-hero hero" aria-label="${escapeHtml(city.name)}の外構工事ガイド">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">${spanJoin([`${city.name}でエクステリア外構工事をする前に`, "確認したいこと"])}</p>
        <h1>${spanJoin([`${city.name}で外構工事や`, "エクステリア工事業者に依頼する前に", "確認すること"])}</h1>
        <p class="hero-lead">${spanJoin([lead, `${districtText}など、地区ごとの道路条件・駐車動線・境界を整理します。`])}</p>
        <div class="hero-actions">
          <a class="button primary" href="#systems">補助制度を見る</a>
          <a class="button" href="#costs">費用目安を見る</a>
        </div>
        <div class="hero-badges" aria-label="${escapeHtml(city.name)}の外構検討で重視したい特徴">
          <div class="badge"><b>相見積もり前提</b><span>撤去・残土・基礎・商品代を分けて比較</span></div>
          <div class="badge"><b>公式制度を確認</b><span>補助金・届出・道路条件は契約前に確認</span></div>
          <div class="badge"><b>${escapeHtml(p.label)}</b><span>${escapeHtml(p.issue)}</span></div>
          <div class="badge"><b>写真で共有</b><span>道路、境界、排水、既存塀を現地写真で共有</span></div>
        </div>
      </div>
      <div class="hero-panel">
        <h2>${escapeHtml(city.name)}で先に確認すること</h2>
        <ul class="quick-list">
          <li>前面道路幅、搬入経路、駐車場の出入りを写真で共有する。</li>
          <li>既存塀、庭木、土間、残土の撤去範囲を見積もり前に分ける。</li>
          <li>補助金や届出は、${escapeHtml(city.name)}公式サイトで年度と申請順を確認する。</li>
          <li>フェンス、カーポート、門柱は型番・高さ・色・保証範囲をそろえて比較する。</li>
        </ul>
      </div>
    </div>
  </section>

  <div class="page-shell">
  <main id="content" class="page">
    <section class="numbered-toc" aria-labelledby="toc-title">
      <p class="section-label">ページ目次</p>
      <h2 id="toc-title">このページでわかること</h2>
      <ol>
        <li><a href="#intro">はじめに</a><span>${escapeHtml(city.name)}で検討する前の見方を整理します。</span></li>
        <li><a href="#profile">需要プロファイル</a><span>地域タイプと初期確認ポイントを見ます。</span></li>
        <li><a href="#local">地域情報</a><span>道路、地形、住宅地の違いを見ます。</span></li>
        <li><a href="#area">対応エリア</a><span>${escapeHtml(districtText)}などを確認します。</span></li>
        <li><a href="#style">外構タイプ</a><span>オープン、クローズ、セミクローズを比べます。</span></li>
        <li><a href="#services">工事</a><span>門まわり、フェンス、駐車場、庭の工事を整理します。</span></li>
        <li><a href="#materials">種類・素材・デザイン</a><span>素材ごとの特徴を確認します。</span></li>
        <li><a href="#costs">料金目安</a><span>工事項目別の初期目安を見ます。</span></li>
        <li><a href="#systems">補助・制度</a><span>公式確認が必要な制度を整理します。</span></li>
        <li><a href="#process">施工の流れ・業者選び</a><span>相談から完了までの順番を見ます。</span></li>
        <li><a href="#compare">業者比較</a><span>見積書と保証の比較軸を見ます。</span></li>
        <li><a href="#vendor-basics">業者の選び方</a><span>許可、保険、保証、写真の見方を確認します。</span></li>
        <li><a href="#faq">FAQ</a><span>よくある質問を確認します。</span></li>
        <li><a href="#keywords">詳しい解説</a><span>検索されやすい項目を解説します。</span></li>
        <li><a href="#qa">Q&amp;A</a><span>共通の悩みをガイドへ整理しています。</span></li>
      </ol>
    </section>

    <section id="intro" class="section">
      <div class="section-header">
        <p class="section-label">はじめに</p>
        <h2>${escapeHtml(city.name)}でエクステリア外構工事を検討している方へ</h2>
        <p>${escapeHtml(city.name)}で外構工事を依頼する前に、道路条件、境界、既存撤去、排水、補助制度の順番をそろえておくと、見積もり比較がしやすくなります。</p>
      </div>
      <div class="split-grid">
        <article class="split-card">
          <h3>新築外構</h3>
          <p>門柱、アプローチ、駐車場、フェンス、庭、照明をまとめて計画します。建物引渡し時期と外構工期のずれも確認します。</p>
        </article>
        <article class="split-card">
          <h3>外構リフォーム</h3>
          <p>古い塀、庭木、土間、門柱の撤去費が差になりやすい工事です。補助制度は契約前申請が必要な場合があります。</p>
        </article>
        <article class="split-card">
          <h3>単体エクステリア</h3>
          <p>カーポート、フェンス、宅配ボックス、物置などは、既存外構との取り合い、保証、排水を見ます。</p>
        </article>
      </div>
      <div class="status-box">
        <strong>${escapeHtml(city.name)}で特に多い外構エクステリア工事相談</strong>
        <p>駐車場コンクリート、カーポート、フェンス、ブロック塀撤去、門柱・宅配ボックス、庭の省管理化を中心に、地域事情を踏まえて整理します。</p>
      </div>
    </section>

    <section id="profile" class="section">
      <div class="section-header">
        <p class="section-label">需要プロファイル</p>
        <h2>${escapeHtml(city.name)}の外構需要を地域タイプで見る</h2>
        <p>${escapeHtml(city.name)}は「${escapeHtml(p.label)}」として、${escapeHtml(p.issue)} 市別の詳細統計は今後の拡充対象とし、このページでは見積もり前に確認しやすい実務項目を優先します。</p>
      </div>
      <div class="stat-grid" aria-label="${escapeHtml(city.name)}の外構需要プロファイル">
        <div class="stat-card"><span>地域タイプ</span><strong>${escapeHtml(p.label)}</strong><p>${escapeHtml(p.lead)}</p></div>
        <div class="stat-card"><span>道路・駐車</span><strong>要確認</strong><p>前面道路幅、車の出入り、駐輪、搬入経路を写真で確認します。</p></div>
        <div class="stat-card"><span>撤去費</span><strong>差が出る</strong><p>既存塀、庭木、土間、残土処分を見積書で分けます。</p></div>
        <div class="stat-card"><span>公式制度</span><strong>契約前</strong><p>補助金や届出は着工前・契約前の確認が重要です。</p></div>
      </div>
      <p class="source-note">このページでは、未確認の市別補助金額や統計値を断定して掲載しません。具体額・受付年度は各市公式情報で確認してください。</p>
    </section>

    <section id="local" class="section">
      <div class="section-header">
        <p class="section-label">地域情報</p>
        <h2>${escapeHtml(city.name)}の地域情報</h2>
        <p>${escapeHtml(lead)} ${escapeHtml(p.terrain)}</p>
      </div>
      <div class="contact-grid">
        <article class="contact-card"><b>道路条件</b><p>前面道路、歩道、側溝、車両搬入、道路占用や切下げの要否を確認します。</p></article>
        <article class="contact-card"><b>境界</b><p>隣地境界、ブロック塀の所有、フェンス位置、室外機や雨樋の干渉を見ます。</p></article>
        <article class="contact-card"><b>排水</b><p>土間勾配、雨水マス、側溝、庭の水はけを先に整理します。</p></article>
        <article class="contact-card"><b>景観・地区ルール</b><p>景観計画、地区計画、建築協定などは公式サイトで対象区域を確認します。</p></article>
      </div>
    </section>

    <section id="area" class="section">
      <div class="section-header">
        <p class="section-label">対応エリア</p>
        <h2>${escapeHtml(city.name)}の対応エリア</h2>
        <p>${escapeHtml(city.name)}内の地区例をもとに、外構工事で確認しやすい観点を整理します。</p>
      </div>
      <div class="chip-row" aria-label="${escapeHtml(city.name)}内の地区例">
        ${city.districts.map((district) => `<span class="chip">${escapeHtml(district)}</span>`).join("\n        ")}
      </div>
      <div class="area-pattern-grid">
${buildAreaCards(city)}
      </div>
    </section>

    <section id="style" class="section">
      <div class="section-header">
        <p class="section-label">外構タイプ</p>
        <h2>${escapeHtml(city.name)}で考える外構タイプ</h2>
        <p>敷地の広さ、道路側からの見え方、駐車動線、防犯、費用のバランスで選びます。</p>
      </div>
      <div class="split-grid">
        <article class="split-card"><h3>オープン外構</h3><p>開放感と駐車のしやすさを優先。狭小地や車の出入りが多い敷地に向きます。</p></article>
        <article class="split-card"><h3>クローズ外構</h3><p>門扉や塀で囲う形。プライバシーは高い一方で、費用と圧迫感に注意します。</p></article>
        <article class="split-card"><h3>セミクローズ外構</h3><p>必要な部分だけフェンスや植栽で隠す形。費用と暮らしやすさのバランスを取りやすいです。</p></article>
      </div>
    </section>

    <section id="services" class="section">
      <div class="section-header">
        <p class="section-label">工事</p>
        <h2>エクステリア外構工事の種類</h2>
        <p>各ブロックを開くと、見積もり前に確認する項目を見られます。</p>
      </div>
      <div class="system-grid">
        <details class="system-card service-detail"><summary>門まわり・アプローチ</summary><p>門柱、表札、ポスト、宅配ボックス、照明、インターホン、段差をまとめて確認します。</p></details>
        <details class="system-card service-detail"><summary>駐車場・カーポート</summary><p>台数、柱位置、土間勾配、排水、屋根材、耐風性能、道路への出入りを確認します。</p></details>
        <details class="system-card service-detail"><summary>フェンス・目隠し</summary><p>高さ、透け感、風抜け、基礎、隣地境界、道路側からの見え方を確認します。</p></details>
        <details class="system-card service-detail"><summary>庭・雑草対策</summary><p>防草シート、砂利、人工芝、植栽整理、ウッドデッキ、物置の配置を考えます。</p></details>
      </div>
    </section>

    <section id="materials" class="section">
      <div class="section-header">
        <p class="section-label">種類・素材・デザイン</p>
        <h2>${escapeHtml(city.name)}で選ぶ素材とデザイン</h2>
        <p>素材は見た目だけでなく、耐久性、掃除のしやすさ、将来の交換性で選びます。</p>
      </div>
      <div class="material-grid">
        <article class="material-card"><h3>土間コンクリート</h3><p>駐車場の定番。勾配、目地、排水、ひび割れ対策を確認します。</p></article>
        <article class="material-card"><h3>アルミフェンス</h3><p>軽量で扱いやすく、目隠しと風抜けのバランスを選べます。</p></article>
        <article class="material-card"><h3>人工芝・砂利</h3><p>庭の省管理化に向きます。防草シートの品質と端部処理が大切です。</p></article>
        <article class="material-card"><h3>植栽</h3><p>道路側からの見え方を柔らかくできます。成長後の高さと管理頻度を見ます。</p></article>
      </div>
    </section>

    <section id="costs" class="section">
      <div class="section-header">
        <p class="section-label">料金目安</p>
        <h2>${escapeHtml(city.name)}で外構費用を見るときの料金目安</h2>
        <p>下の金額は初期検討用の全国的な目安です。実際の見積もりは、搬入経路、既存撤去、残土、勾配、排水、素材で変わります。</p>
      </div>
      <div class="table-wrap">
        <table>
          <caption class="small">外構工事の初期費用目安</caption>
          <thead><tr><th scope="col">工事項目</th><th scope="col">目安</th><th scope="col">${escapeHtml(city.name)}で確認したいこと</th></tr></thead>
          <tbody>
            <tr><th scope="row">新築外構一式</th><td>50万円から200万円</td><td>門まわり、駐車場、フェンス、庭、照明の範囲を分ける。</td></tr>
            <tr><th scope="row">駐車場コンクリート1台分</th><td>15万円から40万円</td><td>掘削、残土、砕石、目地、勾配、排水、搬入経路を確認。</td></tr>
            <tr><th scope="row">カーポート1台分</th><td>20万円から60万円</td><td>柱位置、屋根材、耐風性能、雨樋排水、境界との離隔を確認。</td></tr>
            <tr><th scope="row">フェンス1m</th><td>5,000円から30,000円</td><td>高さ、目隠し率、基礎、柱ピッチ、風抜けを確認。</td></tr>
            <tr><th scope="row">ブロック塀撤去</th><td>1平方メートル1万円から3万円</td><td>補助制度、撤去範囲、処分費、軽量フェンス化の費用を確認。</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="systems" class="section">
      <div class="section-header">
        <p class="section-label">補助・制度</p>
        <h2>${escapeHtml(city.name)}で確認できるエクステリア外構工事の補助・制度</h2>
        <p>制度は年度で変わるため、このページでは未確認の金額を断定せず、確認すべき窓口と順序を整理します。</p>
      </div>
      <div class="table-wrap">
        <table>
          <caption class="small">${escapeHtml(city.name)}で外構工事前に確認したい制度</caption>
          <thead><tr><th scope="col">制度・確認項目</th><th scope="col">確認タイミング</th><th scope="col">確認先</th></tr></thead>
          <tbody>
            <tr><th scope="row">ブロック塀撤去・改善補助</th><td>契約・着工前。交付決定前の着工は対象外になる場合があります。</td><td><a class="official-link" href="${escapeHtml(city.officialUrl)}">${escapeHtml(city.name)}公式サイト</a></td></tr>
            <tr><th scope="row">生垣・緑化・雨水貯留</th><td>設置前。対象区域、上限額、受付期間を確認します。</td><td><a class="official-link" href="${escapeHtml(city.officialUrl)}">${escapeHtml(city.name)}公式サイト</a></td></tr>
            <tr><th scope="row">景観・地区計画・建築協定</th><td>設計段階。高さ、色、配置、届出対象区域を確認します。</td><td><a class="official-link" href="${escapeHtml(city.officialUrl)}">${escapeHtml(city.name)}公式サイト</a></td></tr>
            <tr><th scope="row">道路占用・乗入れ・境界</th><td>駐車場工事前。道路側工事や側溝、切下げの扱いを確認します。</td><td><a class="official-link" href="${escapeHtml(city.officialUrl)}">${escapeHtml(city.name)}公式サイト</a></td></tr>
          </tbody>
        </table>
      </div>
      <p class="source-note">補助制度は受付終了、予算到達、年度変更があるため、必ず契約前に公式ページで最新条件を確認してください。</p>
    </section>

    <section id="process" class="section">
      <div class="section-header">
        <p class="section-label">施工の流れ・業者選び</p>
        <h2>${escapeHtml(city.name)}で外構工事を進める流れ</h2>
        <p>最初に写真と要望をそろえると、見積もりの比較がしやすくなります。</p>
      </div>
      <div class="process-grid">
        <article class="process-card"><h3>1. 現地写真</h3><p>道路、境界、既存塀、排水、庭木、車の出入りを撮影します。</p></article>
        <article class="process-card"><h3>2. 要望整理</h3><p>駐車台数、目隠し、庭の使い方、予算、優先順位を決めます。</p></article>
        <article class="process-card"><h3>3. 相見積もり</h3><p>同じ写真・同じ要望で2から3社に依頼し、内訳を比較します。</p></article>
        <article class="process-card"><h3>4. 契約前確認</h3><p>補助制度、保証、追加費用、工期、近隣対応を書面で確認します。</p></article>
      </div>
    </section>

    <section id="compare" class="section">
      <div class="section-header">
        <p class="section-label">業者比較</p>
        <h2>${escapeHtml(city.name)}で外構業者を比較するポイント</h2>
        <p>金額だけでなく、現地確認の深さ、見積内訳、保証、説明の具体性を見ます。</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">比較項目</th><th scope="col">見ること</th></tr></thead>
          <tbody>
            <tr><th scope="row">現地確認</th><td>道路、境界、排水、既存撤去、搬入経路を見ているか。</td></tr>
            <tr><th scope="row">見積内訳</th><td>撤去、残土、基礎、商品代、施工費、諸経費が分かれているか。</td></tr>
            <tr><th scope="row">保証</th><td>土間、フェンス、カーポート、門柱の保証範囲と期間が明確か。</td></tr>
            <tr><th scope="row">制度理解</th><td>補助金や届出の申請順を契約前に説明できるか。</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="vendor-basics" class="section">
      <div class="section-header">
        <p class="section-label">業者の選び方</p>
        <h2>${escapeHtml(city.name)}で外構業者を探すときの進め方</h2>
        <p>${escapeHtml(city.name)}内だけで無理に絞らず、近隣市まで対応できる外構専門店、工務店、ハウスメーカー経由を同じ要望書で比較します。</p>
      </div>
      <div class="warning-card">
        <strong>写真と見積条件をそろえる</strong>
        <p>同じ写真・同じ要望・同じ工事範囲で依頼しないと、金額差の理由が見えにくくなります。選び方の詳しい確認軸は<a class="official-link" href="../../guide/choose-contractor/">外構業者の選び方ガイド</a>にまとめています。</p>
      </div>
    </section>

    <section id="faq" class="section">
      <div class="section-header">
        <p class="section-label">FAQ</p>
        <h2>${escapeHtml(city.name)}の外構工事でよくある質問</h2>
        <p>補助制度、費用、業者比較で迷いやすい点をまとめます。</p>
      </div>
      <div class="faq">
${faqDetails(city)}
      </div>
    </section>

    <section id="keywords" class="section">
      <div class="section-header">
        <p class="section-label">詳しい解説</p>
        <h2>${escapeHtml(city.name)}の外構エクステリア工事の詳しい解説</h2>
        <p>${escapeHtml(city.name)}で外構工事を調べるときに検索されやすい項目を、地域事情を踏まえて整理します。</p>
      </div>
      <div class="faq keyword-accordion">
${keywordAccordions(city)}
      </div>
    </section>

    <section id="qa" class="section">
      <div class="section-header">
        <p class="section-label">Q&amp;A</p>
        <h2>外構工事のQ&amp;A</h2>
        <p>境界、見積もり、施工後の不具合など、地域を問わず出やすい疑問はガイドに集約しています。</p>
      </div>
      <div class="contact-grid">
        <article class="contact-card"><b>見積もりの見方</b><p><a class="official-link" href="../../guide/gaiko-estimate/">外構見積もりの見方</a>で、一式見積もりと諸経費を確認します。</p></article>
        <article class="contact-card"><b>境界トラブル</b><p><a class="official-link" href="../../guide/boundary-neighbor/">境界・近隣トラブルの備え</a>で、フェンス位置と工事中の配慮を確認します。</p></article>
      </div>
    </section>

    <section class="section" id="operator">
      <div class="warning-card">
        <strong>運営者情報・ポリシー</strong>
        <p>このページは外構・エクステリアの地域情報を整理するポータル/メディアです。特定の施工業者、施工実績、見積もり代行サービスとして表示していません。</p>
        <p>掲載画像は人が写らない庭先外構のイメージ画像で、${escapeHtml(city.name)}の施工実績ではありません。補助金や届出は制度変更があるため、契約・着工前に${escapeHtml(city.name)}公式ページで最新条件を確認してください。</p>
      </div>
    </section>

    <p class="date-row">最終更新日: <time datetime="${DATE}">2026年6月24日</time></p>
  </main>

  <aside class="page-aside" aria-label="${escapeHtml(city.name)}外構ガイド補助ナビ">
    <div class="side-card">
      <h2>${escapeHtml(city.name)}で重視すること</h2>
      <ul class="side-list">
        <li>${escapeHtml(p.issue)}</li>
        <li>既存撤去、残土、排水、搬入経路を見積もりに含める</li>
        <li>補助制度は契約前に公式情報で年度確認</li>
        <li>写真と同じ要望書で2から3社を比較</li>
      </ul>
    </div>
    <div class="side-card">
      <h2>ページ内メニュー</h2>
      <ul class="side-list">
        <li><a href="#profile">需要プロファイル</a></li>
        <li><a href="#local">地域情報</a></li>
        <li><a href="#area">対応エリア</a></li>
        <li><a href="#style">外構タイプ</a></li>
        <li><a href="#services">工事</a></li>
        <li><a href="#materials">種類・素材</a></li>
        <li><a href="#costs">料金目安</a></li>
        <li><a href="#systems">補助・制度</a></li>
        <li><a href="#process">施工の流れ</a></li>
        <li><a href="#compare">業者比較</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li><a href="#keywords">詳しい解説</a></li>
      </ul>
    </div>
    <div class="side-card">
      <h2>補助金・関連窓口</h2>
      <ul class="side-list side-contact-list">
        <li><b>${escapeHtml(city.name)}公式サイト</b><span><a href="${escapeHtml(city.officialUrl)}">補助金・都市計画・建築指導を確認</a></span></li>
        <li><b>確認順</b><span>契約前、着工前、交付決定前の扱いを確認</span></li>
      </ul>
    </div>
    <div class="side-card">
      <h2>公式情報</h2>
      <ul class="side-list">
        <li><a href="${escapeHtml(city.officialUrl)}">${escapeHtml(city.name)}公式サイト</a></li>
        <li><a href="https://www.pref.osaka.lg.jp/">大阪府公式サイト</a></li>
        <li><a href="../">大阪府の市ページ一覧</a></li>
      </ul>
    </div>
    <div class="side-card">
      <h2>サイト情報</h2>
      <p><strong>${escapeHtml(BRAND)}</strong></p>
      <p class="small">ポータル/メディアとして、確認済みの地域情報から順次公開しています。</p>
      <p class="small credit">画像: 人が写らない庭先外構のイメージ画像。${escapeHtml(city.name)}の施工実績写真ではありません。</p>
    </div>
  </aside>
  </div>
</body>
</html>
`;
}

function osakaIndexPage() {
  const groups = ["大阪市", "北摂", "三島", "泉北", "泉南", "北河内", "中河内", "南河内"];
  const grouped = groups
    .map((group) => {
      const items = cities.filter((city) => city.group === group);
      return `
        <section class="section city-list-section" aria-labelledby="${group}-title">
          <div class="section-header">
            <p class="section-label">${escapeHtml(group)}</p>
            <h2 id="${group}-title">${escapeHtml(group)}の市ページ</h2>
          </div>
          <div class="region-grid city-directory">
            ${items
              .map((city) => `<a class="region" href="${city.slug}/"><b>${escapeHtml(city.name)}</b><span>${escapeHtml(city.districts.slice(0, 4).join("・"))}</span></a>`)
              .join("\n            ")}
          </div>
        </section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>大阪府の外構工事・エクステリア市ページ一覧 | ${escapeHtml(BRAND)}</title>
  <meta name="description" content="大阪府内33市の外構工事・エクステリア情報ページ一覧。大阪市、堺市、豊中市、吹田市、枚方市、東大阪市など、市別に費用目安、地域事情、補助制度の確認順を整理。">
  <link rel="canonical" href="${SITE_URL}/osaka/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="大阪府の外構工事・エクステリア市ページ一覧">
  <meta property="og:description" content="大阪府内33市の外構工事・エクステリア情報ページ一覧です。">
  <meta property="og:url" content="${SITE_URL}/osaka/">
  <meta property="og:image" content="${HERO_IMAGE}">
  <link rel="stylesheet" href="../assets/site.css">
</head>
<body>
  <header class="site-header">
    <nav class="nav" aria-label="主要ナビゲーション">
      <a class="brand" href="../" aria-label="トップへ">${escapeHtml(BRAND)}</a>
      <div class="nav-links">
        <a href="#cities">市一覧</a>
        <a href="../guide/gaiko-estimate/">見積もり</a>
        <a href="../guide/choose-contractor/">業者選び</a>
      </div>
    </nav>
  </header>

  <nav class="breadcrumb" aria-label="パンくずリスト">
    <a href="../">TOP</a>
    <span aria-current="page">大阪府</span>
  </nav>

  <section class="hero city-hero" aria-label="大阪府の外構工事ページ一覧">
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow">大阪府の外構工事・エクステリア</p>
        <h1>大阪府内33市の外構工事ページ一覧</h1>
        <p class="hero-lead">大阪市、堺市、豊中市、吹田市、枚方市、東大阪市など、大阪府内の市ごとに外構工事の確認ポイントを整理しています。</p>
        <div class="hero-actions">
          <a class="button primary" href="#cities">市一覧を見る</a>
          <a class="button" href="../guide/choose-contractor/">業者選びを見る</a>
        </div>
      </div>
      <div class="hero-panel">
        <h2>掲載方針</h2>
        <ul class="quick-list">
          <li>豊中市は確認済みデータを反映した詳細版です。</li>
          <li>その他の市は、公式確認前の金額断定を避けた公開版です。</li>
          <li>補助金・届出は、契約前に各市公式サイトで確認してください。</li>
        </ul>
      </div>
    </div>
  </section>

  <main id="cities">
    <section class="section">
      <div class="section-header">
        <p class="section-label">大阪府</p>
        <h2>市から探す</h2>
        <p>大阪府内の33市ページを公開しました。町村ページは別途追加対象です。</p>
      </div>
      <div class="note" role="note">
        補助金や届出は年度で変わるため、具体額を掲載していない市ページでは、契約・着工前に各市公式サイトで最新条件を確認してください。
      </div>
    </section>
${grouped}
  </main>
</body>
</html>
`;
}

function cityCard(city) {
  return `<a class="region" href="osaka/${city.slug}/"><b>${escapeHtml(city.name)}</b><span>${escapeHtml(city.group)} / ${escapeHtml(city.districts.slice(0, 3).join("・"))}</span></a>`;
}

function updateHomePage() {
  const file = path.join(ROOT, "index.html");
  const html = fs.readFileSync(file, "utf8");
  const cityGrid = `      <div class="region-grid city-directory" aria-label="地域ページ一覧">
        <a class="region region-feature" href="osaka/"><b>大阪府の市一覧</b><span>府内33市のページを公開</span></a>
        ${cities.map(cityCard).join("\n        ")}
      </div>
      <div class="note" role="note">
        大阪府内33市のページを公開しました。補助金、条例、地区計画、住宅統計などは各市公式情報で確認し、詳細調査が済んだ地域から内容を拡充します。
      </div>`;
  const sectionStart = html.indexOf('    <section id="regions"');
  const blockStart = html.indexOf('      <div class="region-grid', sectionStart);
  const blockEnd = html.indexOf("    </section>", blockStart);

  if (sectionStart === -1 || blockStart === -1 || blockEnd === -1) {
    throw new Error("Could not replace region grid in index.html");
  }

  const updated = `${html.slice(0, blockStart)}${cityGrid}\n${html.slice(blockEnd)}`;
  fs.writeFileSync(file, updated, "utf8");
}

function writeSitemap() {
  const urls = [
    { url: "", lastmod: DATE },
    { url: "osaka/", lastmod: DATE },
    ...cities.map((city) => ({ url: `osaka/${city.slug}/`, lastmod: DATE })),
    ...guides.map((guide) => ({ url: guide, lastmod: "2026-06-22" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}/${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
}

function main() {
  const osakaDir = path.join(ROOT, "osaka");
  fs.mkdirSync(osakaDir, { recursive: true });
  if (process.env.REBUILD_OSAKA_DIRECTORY === "1") {
    fs.writeFileSync(path.join(osakaDir, "index.html"), osakaIndexPage(), "utf8");
  }

  for (const city of cities) {
    if (city.existing) continue;
    const dir = path.join(osakaDir, city.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), cityPage(city), "utf8");
  }

  updateHomePage();
  writeSitemap();
  console.log(`Generated ${cities.length - 1} city pages plus Osaka index.`);
}

main();
