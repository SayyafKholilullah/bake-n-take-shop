import { Award, Heart, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-bakery.jpg";

const About = () => (
  <main className="pt-24 pb-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6">Tentang ManisBakery</h1>
      <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
        Perjalanan kami dimulai dari dapur kecil dengan satu misi: menghadirkan kue artisan terbaik untuk setiap momen spesial Anda.
      </p>

      <img src={heroImage} alt="Toko ManisBakery" className="w-full h-64 md:h-96 object-cover rounded-2xl mb-12" />

      <div className="prose prose-lg max-w-none mb-16">
        <p className="text-muted-foreground leading-relaxed">
          Sejak 2020, ManisBakery telah melayani ribuan pelanggan dengan kue dan pastry berkualitas tinggi. 
          Kami menggunakan bahan-bahan terbaik — mentega Prancis, cokelat Belgia, dan buah segar pilihan — 
          untuk menciptakan produk yang tidak hanya indah dipandang, tapi juga luar biasa rasanya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Heart, title: "Dibuat dengan Cinta", desc: "Setiap kue dibuat oleh baker berpengalaman dengan penuh dedikasi." },
          { icon: Leaf, title: "Bahan Alami", desc: "Tanpa pengawet, tanpa pewarna buatan. Hanya bahan alami terbaik." },
          { icon: Award, title: "Kualitas Premium", desc: "Standar tinggi di setiap proses, dari adonan hingga dekorasi." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center bg-card border rounded-xl p-8">
            <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default About;
