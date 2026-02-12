import { useState } from "react";
import { products, categoryLabels, Category } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const allCategories: (Category | "semua")[] = ["semua", "kue-ulang-tahun", "pastry", "roti", "kue-kering"];

const Catalog = () => {
  const [active, setActive] = useState<Category | "semua">("semua");
  const [selected, setSelected] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { toast } = useToast();

  const filtered = active === "semua" ? products : products.filter((p) => p.category === active);

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="font-display text-4xl font-bold text-center">Katalog Kue</h1>
        <p className="text-muted-foreground text-center mt-2 mb-10">Temukan kue favorit Anda</p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {allCategories.map((cat) => (
            <Button
              key={cat}
              variant={active === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(cat)}
            >
              {cat === "semua" ? "Semua" : categoryLabels[cat]}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <img src={selected.image} alt={selected.name} className="w-full aspect-video object-cover rounded-lg" />
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selected.name}</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">{selected.description}</p>
              <p className="text-sm text-muted-foreground">Kategori: {categoryLabels[selected.category]}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold">{formatPrice(selected.price)}</span>
                <Button
                  onClick={() => {
                    addItem(selected);
                    toast({ title: "Ditambahkan!", description: `${selected.name} masuk ke keranjang.` });
                    setSelected(null);
                  }}
                  className="gap-2"
                >
                  <ShoppingCart className="h-4 w-4" /> Tambah ke Keranjang
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Catalog;
