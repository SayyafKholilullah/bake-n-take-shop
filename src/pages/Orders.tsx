import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Loader2, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer_name: string;
  total_price: number;
  status: string;
  items: OrderItem[];
  created_at: string;
  payment_method: string;
}

const statusLabel: Record<string, string> = {
  pending: "Menunggu Konfirmasi",
  confirmed: "Dikonfirmasi",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};

const paymentLabel: Record<string, string> = {
  qris: "QRIS",
  bank_transfer: "Transfer Bank",
  cod: "Bayar di Tempat",
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Riwayat Pesanan | ManisBakery";
  }, []);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        toast.error("Gagal memuat pesanan");
      } else {
        setOrders((data ?? []) as unknown as Order[]);
      }
      setLoading(false);
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Belum Ada Pesanan</h1>
        <p className="text-muted-foreground mb-6">Yuk pesan kue favorit Anda!</p>
        <Button asChild>
          <Link to="/katalog">Lihat Katalog</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-bold mb-8">Riwayat Pesanan</h1>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border rounded-xl p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })}
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {statusLabel[order.status] ?? order.status}
                </span>
              </div>
              <div className="space-y-1 text-sm border-t pt-3">
                {order.items.map((item) => (
                  <div key={item.product_id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(Number(order.total_price))}</span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground text-right">
                Metode: {paymentLabel[order.payment_method] ?? order.payment_method}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Orders;