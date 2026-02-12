import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Keranjang Kosong</h1>
        <p className="text-muted-foreground mb-6">Yuk pilih kue favorit kamu!</p>
        <Button asChild>
          <Link to="/katalog">Lihat Katalog</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-display text-4xl font-bold mb-8">Keranjang Belanja</h1>
        <div className="flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 items-center bg-card border rounded-xl p-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <span className="font-bold w-28 text-right">{formatPrice(product.price * quantity)}</span>
              <Button size="icon" variant="ghost" onClick={() => removeItem(product.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-card border rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-muted-foreground text-sm">Total</p>
            <p className="font-display text-3xl font-bold">{formatPrice(totalPrice)}</p>
          </div>
          <Button size="lg" asChild>
            <Link to="/checkout">Checkout</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
