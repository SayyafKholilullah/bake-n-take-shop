import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <CheckCircle className="h-20 w-20 text-primary mb-6" />
        <h1 className="font-display text-4xl font-bold mb-2">Pesanan Dikonfirmasi!</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Terima kasih telah memesan di ManisBakery. Tim kami akan segera menghubungi Anda untuk konfirmasi.
        </p>
        <Button asChild>
          <Link to="/">Kembali ke Beranda</Link>
        </Button>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-3xl font-bold mb-4">Keranjang kosong</h1>
        <Button asChild>
          <Link to="/katalog">Lihat Katalog</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-display text-xl font-semibold mb-4">Data Pemesan</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" required placeholder="Nama Anda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input id="phone" required placeholder="08xxxxxxxxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Pengiriman</Label>
              <Textarea id="address" required placeholder="Alamat lengkap..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan (opsional)</Label>
              <Textarea id="notes" placeholder="Catatan khusus untuk pesanan..." />
            </div>
            <Button type="submit" size="lg" className="w-full mt-4">
              Konfirmasi Pesanan
            </Button>
          </form>

          <div>
            <h2 className="font-display text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
            <div className="bg-card border rounded-xl p-4 space-y-3">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span>{product.name} × {quantity}</span>
                  <span className="font-medium">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
