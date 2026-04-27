// New unique product photos (Modern Bold style)
import pChocolateDream from "@/assets/p-chocolate-dream.jpg";
import pStrawberryShortcake from "@/assets/p-strawberry-shortcake.jpg";
import pTiramisuCake from "@/assets/p-tiramisu-cake.jpg";
import pSaltedCaramel from "@/assets/p-salted-caramel.jpg";
import pRedvelvetClassic from "@/assets/p-redvelvet-classic.jpg";
import pMatchaCake from "@/assets/p-matcha-cake.jpg";
import pBlackforest from "@/assets/p-blackforest.jpg";
import pRainbowCake from "@/assets/p-rainbow-cake.jpg";
import pCarrotCake from "@/assets/p-carrot-cake.jpg";
import pBlueberryCheesecake from "@/assets/p-blueberry-cheesecake.jpg";
import pButterCroissant from "@/assets/p-butter-croissant.jpg";
import pPainChocolat from "@/assets/p-pain-chocolat.jpg";
import pEclairChocolate from "@/assets/p-eclair-chocolate.jpg";
import pFruitTart from "@/assets/p-fruit-tart.jpg";
import pCinnamonRoll from "@/assets/p-cinnamon-roll.jpg";
import pSourdough from "@/assets/p-sourdough.jpg";
import pRyeBread from "@/assets/p-rye-bread.jpg";
import pBaguette from "@/assets/p-baguette.jpg";
import pFocaccia from "@/assets/p-focaccia.jpg";
import pMacaronBox from "@/assets/p-macaron-box.jpg";
import pChocchipCookies from "@/assets/p-chocchip-cookies.jpg";
import pMatchaCookies from "@/assets/p-matcha-cookies.jpg";
import pButterCookies from "@/assets/p-butter-cookies.jpg";
import pBiscotti from "@/assets/p-biscotti.jpg";
import pMadeleine from "@/assets/p-madeleine.jpg";
// Batch 2 — 25 more unique photos
import pLemonDrizzle from "@/assets/p-lemon-drizzle.jpg";
import pMochaPraline from "@/assets/p-mocha-praline.jpg";
import pVanillaBean from "@/assets/p-vanilla-bean.jpg";
import pFunfetti from "@/assets/p-funfetti.jpg";
import pPandanCoconut from "@/assets/p-pandan-coconut.jpg";
import pCookiesCream from "@/assets/p-cookies-cream.jpg";
import pHazelnutFerrero from "@/assets/p-hazelnut-ferrero.jpg";
import pMangoPassion from "@/assets/p-mango-passion.jpg";
import pLavaHeart from "@/assets/p-lava-heart.jpg";
import pAlmondCroissant from "@/assets/p-almond-croissant.jpg";
import pAppleTurnover from "@/assets/p-apple-turnover.jpg";
import pCheeseDanish from "@/assets/p-cheese-danish.jpg";
import pMillefeuille from "@/assets/p-millefeuille.jpg";
import pLemonMeringue from "@/assets/p-lemon-meringue.jpg";
import pWholewheat from "@/assets/p-wholewheat.jpg";
import pBrioche from "@/assets/p-brioche.jpg";
import pShokupan from "@/assets/p-shokupan.jpg";
import pPretzel from "@/assets/p-pretzel.jpg";
import pOatmealRaisin from "@/assets/p-oatmeal-raisin.jpg";
import pShortbread from "@/assets/p-shortbread.jpg";
import pGingerbread from "@/assets/p-gingerbread.jpg";
import pSnowball from "@/assets/p-snowball.jpg";
import pLinzer from "@/assets/p-linzer.jpg";
import pCoconutMacaroon from "@/assets/p-coconut-macaroon.jpg";
import pBrownieCookies from "@/assets/p-brownie-cookies.jpg";

export type Category = "kue-ulang-tahun" | "pastry" | "roti" | "kue-kering";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  bestseller?: boolean;
}

export const categoryLabels: Record<Category, string> = {
  "kue-ulang-tahun": "Kue Ulang Tahun",
  pastry: "Pastry",
  roti: "Roti",
  "kue-kering": "Kue Kering",
};

export const products: Product[] = [
  {
    id: "1",
    name: "Chocolate Dream Cake",
    price: 345000,
    category: "kue-ulang-tahun",
    image: pChocolateDream,
    description: "Kue cokelat berlapis tiga dengan ganache premium dan dekorasi elegan.",
    bestseller: true,
  },
  {
    id: "2",
    name: "Strawberry Shortcake",
    price: 260000,
    category: "kue-ulang-tahun",
    image: pStrawberryShortcake,
    description: "Kue lembut dengan krim segar dan stroberi pilihan.",
    bestseller: true,
  },
  {
    id: "3",
    name: "Red Velvet Classic",
    price: 245000,
    category: "kue-ulang-tahun",
    image: pRedvelvetClassic,
    description: "Red velvet klasik dengan cream cheese frosting yang lembut.",
  },
  {
    id: "4",
    name: "Black Forest Royale",
    price: 360000,
    category: "kue-ulang-tahun",
    image: pBlackforest,
    description: "Kue cokelat dengan cherry segar dan whipped cream.",
  },
  {
    id: "5",
    name: "Rainbow Layer Cake",
    price: 285000,
    category: "kue-ulang-tahun",
    image: pRainbowCake,
    description: "Tujuh lapis warna pelangi dengan vanilla buttercream.",
  },
  {
    id: "6",
    name: "Tiramisu Cake",
    price: 280000,
    category: "kue-ulang-tahun",
    image: pTiramisuCake,
    description: "Kue tiramisu dengan mascarpone dan espresso autentik.",
    bestseller: true,
  },
  {
    id: "7",
    name: "Lemon Drizzle",
    price: 280000,
    category: "kue-ulang-tahun",
    image: pLemonDrizzle,
    description: "Kue lemon segar dengan glaze manis-asam.",
  },
  {
    id: "8",
    name: "Carrot Walnut Cake",
    price: 265000,
    category: "kue-ulang-tahun",
    image: pCarrotCake,
    description: "Kue wortel dengan kenari dan cream cheese frosting.",
  },
  {
    id: "9",
    name: "Mocha Praline",
    price: 360000,
    category: "kue-ulang-tahun",
    image: pMochaPraline,
    description: "Kue mocha dengan praline kacang dan ganache.",
  },
  {
    id: "10",
    name: "Vanilla Bean Bliss",
    price: 260000,
    category: "kue-ulang-tahun",
    image: pVanillaBean,
    description: "Vanilla bean asli Madagascar dengan buttercream halus.",
  },
  {
    id: "11",
    name: "Funfetti Birthday",
    price: 350000,
    category: "kue-ulang-tahun",
    image: pFunfetti,
    description: "Kue ulang tahun penuh sprinkles warna-warni.",
  },
  {
    id: "12",
    name: "Matcha Green Tea Cake",
    price: 360000,
    category: "kue-ulang-tahun",
    image: pMatchaCake,
    description: "Kue matcha premium Jepang dengan azuki bean.",
  },
  {
    id: "13",
    name: "Pandan Coconut Cake",
    price: 385000,
    category: "kue-ulang-tahun",
    image: pPandanCoconut,
    description: "Kue pandan harum dengan kelapa parut segar.",
  },
  {
    id: "14",
    name: "Cookies & Cream",
    price: 330000,
    category: "kue-ulang-tahun",
    image: pCookiesCream,
    description: "Kue dengan remahan cookies oreo dan vanilla cream.",
  },
  {
    id: "15",
    name: "Salted Caramel Cake",
    price: 255000,
    category: "kue-ulang-tahun",
    image: pSaltedCaramel,
    description: "Lapisan caramel asin dengan butter cake lembut.",
    bestseller: true,
  },
  {
    id: "16",
    name: "Hazelnut Ferrero Cake",
    price: 335000,
    category: "kue-ulang-tahun",
    image: pHazelnutFerrero,
    description: "Kue hazelnut dengan Ferrero Rocher di atasnya.",
  },
  {
    id: "17",
    name: "Mango Passion Cake",
    price: 310000,
    category: "kue-ulang-tahun",
    image: pMangoPassion,
    description: "Mangga dan markisa dengan sponge ringan.",
  },
  {
    id: "18",
    name: "Blueberry Cheesecake",
    price: 250000,
    category: "kue-ulang-tahun",
    image: pBlueberryCheesecake,
    description: "Cheesecake klasik dengan topping blueberry segar.",
  },
  {
    id: "19",
    name: "Chocolate Lava Heart",
    price: 280000,
    category: "kue-ulang-tahun",
    image: pLavaHeart,
    description: "Kue cokelat dengan lava lumer di tengah.",
  },
  {
    id: "20",
    name: "Butter Croissant",
    price: 65000,
    category: "pastry",
    image: pButterCroissant,
    description: "Croissant renyah berlapis-lapis dengan mentega Prancis premium.",
    bestseller: true,
  },
  {
    id: "21",
    name: "Almond Croissant",
    price: 55000,
    category: "pastry",
    image: pAlmondCroissant,
    description: "Croissant dengan filling almond cream dan irisan almond.",
  },
  {
    id: "22",
    name: "Pain au Chocolat",
    price: 40000,
    category: "pastry",
    image: pPainChocolat,
    description: "Pastry Prancis dengan dua batang cokelat dark.",
    bestseller: true,
  },
  {
    id: "23",
    name: "Apple Turnover",
    price: 70000,
    category: "pastry",
    image: pAppleTurnover,
    description: "Pastry isi apel kayu manis yang hangat.",
  },
  {
    id: "24",
    name: "Cheese Danish",
    price: 45000,
    category: "pastry",
    image: pCheeseDanish,
    description: "Danish dengan cream cheese dan glaze vanilla.",
  },
  {
    id: "25",
    name: "Eclair Chocolate",
    price: 90000,
    category: "pastry",
    image: pEclairChocolate,
    description: "Eclair klasik dengan cream patissière dan glaze cokelat.",
    bestseller: true,
  },
  {
    id: "26",
    name: "Vanilla Mille-feuille",
    price: 25000,
    category: "pastry",
    image: pMillefeuille,
    description: "Pastry tiga lapis dengan vanilla cream.",
  },
  {
    id: "27",
    name: "Cinnamon Roll",
    price: 85000,
    category: "pastry",
    image: pCinnamonRoll,
    description: "Cinnamon roll lembut dengan cream cheese glaze.",
  },
  {
    id: "28",
    name: "Fruit Tart",
    price: 35000,
    category: "pastry",
    image: pFruitTart,
    description: "Tart dengan vanilla custard dan buah segar.",
  },
  {
    id: "29",
    name: "Lemon Meringue Tart",
    price: 80000,
    category: "pastry",
    image: pLemonMeringue,
    description: "Tart lemon dengan meringue panggang.",
  },
  {
    id: "30",
    name: "Sourdough Artisan",
    price: 60000,
    category: "roti",
    image: pSourdough,
    description: "Roti sourdough dengan fermentasi alami 24 jam.",
    bestseller: true,
  },
  {
    id: "31",
    name: "Whole Wheat Loaf",
    price: 55000,
    category: "roti",
    image: pWholewheat,
    description: "Roti gandum utuh sehat dengan biji-bijian.",
  },
  {
    id: "32",
    name: "French Baguette",
    price: 35000,
    category: "roti",
    image: pBaguette,
    description: "Baguette Prancis renyah klasik.",
  },
  {
    id: "33",
    name: "Rye Bread",
    price: 75000,
    category: "roti",
    image: pRyeBread,
    description: "Roti rye dark dengan caraway seeds.",
    bestseller: true,
  },
  {
    id: "34",
    name: "Brioche Loaf",
    price: 40000,
    category: "roti",
    image: pBrioche,
    description: "Brioche butter yang lembut dan kaya.",
  },
  {
    id: "35",
    name: "Focaccia Rosemary",
    price: 40000,
    category: "roti",
    image: pFocaccia,
    description: "Focaccia dengan rosemary dan olive oil.",
  },
  {
    id: "36",
    name: "Milk Bread Japanese",
    price: 35000,
    category: "roti",
    image: pShokupan,
    description: "Shokupan Jepang yang super lembut.",
  },
  {
    id: "37",
    name: "Pretzel Soft",
    price: 40000,
    category: "roti",
    image: pPretzel,
    description: "Pretzel lembut dengan garam laut.",
  },
  {
    id: "38",
    name: "French Macaron Box",
    price: 95000,
    category: "kue-kering",
    image: pMacaronBox,
    description: "Set 12 macaron dengan berbagai rasa.",
    bestseller: true,
  },
  {
    id: "39",
    name: "Butter Cookies Tin",
    price: 125000,
    category: "kue-kering",
    image: pButterCookies,
    description: "Aneka kue mentega dalam kaleng premium.",
  },
  {
    id: "40",
    name: "Chocolate Chip Cookies",
    price: 155000,
    category: "kue-kering",
    image: pChocchipCookies,
    description: "Cookies klasik dengan chunks cokelat besar.",
    bestseller: true,
  },
  {
    id: "41",
    name: "Oatmeal Raisin",
    price: 110000,
    category: "kue-kering",
    image: pOatmealRaisin,
    description: "Oatmeal cookies dengan kismis manis.",
  },
  {
    id: "42",
    name: "Shortbread Scottish",
    price: 80000,
    category: "kue-kering",
    image: pShortbread,
    description: "Shortbread Skotlandia yang renyah.",
  },
  {
    id: "43",
    name: "Almond Biscotti",
    price: 110000,
    category: "kue-kering",
    image: pBiscotti,
    description: "Biscotti almond Italia untuk kopi.",
  },
  {
    id: "44",
    name: "Madeleine Vanilla",
    price: 110000,
    category: "kue-kering",
    image: pMadeleine,
    description: "Madeleine bentuk shell klasik Prancis.",
  },
  {
    id: "45",
    name: "Gingerbread Cookies",
    price: 95000,
    category: "kue-kering",
    image: pGingerbread,
    description: "Cookies jahe dengan icing hias.",
  },
  {
    id: "46",
    name: "Snowball Cookies",
    price: 165000,
    category: "kue-kering",
    image: pSnowball,
    description: "Cookies bulat dengan icing sugar.",
  },
  {
    id: "47",
    name: "Linzer Cookies",
    price: 160000,
    category: "kue-kering",
    image: pLinzer,
    description: "Linzer dengan jam raspberry di tengah.",
  },
  {
    id: "48",
    name: "Matcha Cookies",
    price: 150000,
    category: "kue-kering",
    image: pMatchaCookies,
    description: "Cookies matcha hijau dengan white choc chips.",
    bestseller: true,
  },
  {
    id: "49",
    name: "Coconut Macaroon",
    price: 90000,
    category: "kue-kering",
    image: pCoconutMacaroon,
    description: "Macaroon kelapa dengan dasar cokelat.",
  },
  {
    id: "50",
    name: "Brownie Cookies",
    price: 165000,
    category: "kue-kering",
    image: pBrownieCookies,
    description: "Cookies brownie fudgy dan chewy.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
