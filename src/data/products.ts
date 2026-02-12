import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeStrawberry from "@/assets/cake-strawberry.jpg";
import pastryCroissant from "@/assets/pastry-croissant.jpg";
import cakeMacaron from "@/assets/cake-macaron.jpg";
import breadSourdough from "@/assets/bread-sourdough.jpg";
import cakeRedvelvet from "@/assets/cake-redvelvet.jpg";
import cakeTiramisu from "@/assets/cake-tiramisu.jpg";
import cookiesButter from "@/assets/cookies-butter.jpg";

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
    price: 285000,
    category: "kue-ulang-tahun",
    image: cakeChocolate,
    description: "Kue cokelat berlapis tiga dengan ganache premium dan dekorasi elegan. Cocok untuk perayaan spesial.",
    bestseller: true,
  },
  {
    id: "2",
    name: "Strawberry Shortcake",
    price: 265000,
    category: "kue-ulang-tahun",
    image: cakeStrawberry,
    description: "Kue lembut dengan krim segar dan stroberi pilihan. Rasa manis yang sempurna.",
    bestseller: true,
  },
  {
    id: "3",
    name: "Butter Croissant",
    price: 35000,
    category: "pastry",
    image: pastryCroissant,
    description: "Croissant renyah berlapis-lapis dengan mentega Prancis premium. Dipanggang segar setiap hari.",
    bestseller: true,
  },
  {
    id: "4",
    name: "French Macaron Box",
    price: 120000,
    category: "kue-kering",
    image: cakeMacaron,
    description: "Set 12 macaron dengan berbagai rasa: vanilla, cokelat, strawberry, matcha, dan lainnya.",
  },
  {
    id: "5",
    name: "Sourdough Artisan",
    price: 55000,
    category: "roti",
    image: breadSourdough,
    description: "Roti sourdough artisan dengan fermentasi alami 24 jam. Tekstur renyah di luar, lembut di dalam.",
  },
  {
    id: "6",
    name: "Red Velvet Cake",
    price: 295000,
    category: "kue-ulang-tahun",
    image: cakeRedvelvet,
    description: "Kue red velvet klasik dengan cream cheese frosting yang lembut. Tampilan mewah untuk acara istimewa.",
    bestseller: true,
  },
  {
    id: "7",
    name: "Tiramisu Glass",
    price: 75000,
    category: "pastry",
    image: cakeTiramisu,
    description: "Tiramisu otentik Italia dalam gelas elegan. Lapisan mascarpone dan espresso yang sempurna.",
  },
  {
    id: "8",
    name: "Butter Cookies Tin",
    price: 95000,
    category: "kue-kering",
    image: cookiesButter,
    description: "Aneka kue kering mentega dalam kaleng premium. Hadiah sempurna untuk orang tersayang.",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(price);
