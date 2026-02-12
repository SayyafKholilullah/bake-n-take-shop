import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products, formatPrice } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, Award, Clock } from "lucide-react";
import heroImage from "@/assets/hero-bakery.jpg";

const bestsellers = products.filter((p) => p.bestseller);

const testimonials = [
  { name: "Rina S.", text: "Kue cokelat terbaik yang pernah saya coba! Tekstur lembut, rasa premium.", rating: 5 },
  { name: "Dimas P.", text: "Selalu pesan untuk setiap acara keluarga. Tidak pernah mengecewakan!", rating: 5 },
  { name: "Ayu L.", text: "Croissant-nya renyah sempurna. Serasa di Paris!", rating: 5 },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Bakery display" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold text-background leading-tight">
              Kue Artisan untuk Momen <span className="text-primary">Istimewa</span>
            </h1>
            <p className="mt-6 text-background/80 text-lg">
              Dibuat dengan bahan premium dan cinta. Setiap gigitan adalah pengalaman yang tak terlupakan.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild className="text-base">
                <Link to="/katalog">Lihat Menu <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-background/10 text-background border-background/30 hover:bg-background/20">
                <Link to="/tentang">Tentang Kami</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Award, label: "Bahan Premium" },
            { icon: Clock, label: "Segar Setiap Hari" },
            { icon: Truck, label: "Gratis Ongkir*" },
            { icon: Star, label: "Rating 4.9/5" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 py-4">
              <Icon className="h-8 w-8 text-primary" />
              <span className="font-semibold text-sm">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold">Kue Terlaris</h2>
            <p className="text-muted-foreground mt-2">Pilihan favorit pelanggan kami</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/katalog">Lihat Semua Menu <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold">🎉 Promo Spesial</h2>
          <p className="mt-4 text-xl opacity-90">Diskon 15% untuk pembelian pertama!</p>
          <p className="mt-2 opacity-70">Gunakan kode: MANIS15</p>
          <Button size="lg" variant="secondary" asChild className="mt-8">
            <Link to="/katalog">Belanja Sekarang</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Kata Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border rounded-xl p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{t.text}"</p>
                <p className="mt-4 font-semibold text-sm">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
