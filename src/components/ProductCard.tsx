import { Product, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({ title: "Ditambahkan!", description: `${product.name} masuk ke keranjang.` });
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group cursor-pointer rounded-xl overflow-hidden bg-card border shadow-sm hover:shadow-xl transition-shadow"
      onClick={onClick}
    >
      <div className="aspect-square overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.bestseller && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            Best Seller
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg">{product.name}</h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          <Button size="sm" onClick={handleAdd} className="gap-1">
            <ShoppingCart className="h-4 w-4" /> Tambah
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
