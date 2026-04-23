import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Package, Users, TrendingUp, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Eye, QrCode, Landmark, Wallet } from "lucide-react";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  user_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  notes: string | null;
  total_price: number;
  status: string;
  items: OrderItem[];
  created_at: string;
  payment_method: string;
  payment_proof_url: string | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
}

const STATUSES = [
  { value: "pending", label: "Menunggu Konfirmasi" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "delivered", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const PAYMENT_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  qris: { label: "QRIS", icon: <QrCode className="h-3 w-3" /> },
  bank_transfer: { label: "Transfer Bank", icon: <Landmark className="h-3 w-3" /> },
  cod: { label: "COD", icon: <Wallet className="h-3 w-3" /> },
};

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Panel Admin | ManisBakery";
  }, []);

  const load = async () => {
    const [ordersRes, profilesRes] = await Promise.all([
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    ]);
    if (ordersRes.error) toast.error("Gagal memuat pesanan");
    else setOrders((ordersRes.data ?? []) as unknown as Order[]);
    if (profilesRes.error) toast.error("Gagal memuat pelanggan");
    else setProfiles(profilesRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      toast.error("Gagal memperbarui status");
    } else {
      toast.success("Status pesanan diperbarui");
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    }
  };

  const viewProof = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("payment-proofs")
      .createSignedUrl(path, 300);
    if (error || !data) {
      toast.error("Gagal membuka bukti pembayaran");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const stats = useMemo(() => {
    const active = orders.filter((o) => o.status !== "cancelled");
    const revenue = active.reduce((s, o) => s + Number(o.total_price), 0);
    const productCounts: Record<string, { name: string; qty: number; revenue: number }> = {};
    active.forEach((o) => {
      o.items.forEach((it) => {
        if (!productCounts[it.product_id]) {
          productCounts[it.product_id] = { name: it.name, qty: 0, revenue: 0 };
        }
        productCounts[it.product_id].qty += it.quantity;
        productCounts[it.product_id].revenue += it.quantity * it.price;
      });
    });
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
    const byStatus = STATUSES.map((s) => ({
      ...s,
      count: orders.filter((o) => o.status === s.value).length,
    }));
    return {
      revenue,
      orderCount: orders.length,
      customerCount: profiles.length,
      topProducts,
      byStatus,
    };
  }, [orders, profiles]);

  if (loading) {
    return (
      <main className="pt-24 pb-20 min-h-[70vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold">Panel Admin</h1>
          <p className="text-muted-foreground mt-1">Kelola pesanan, pelanggan, dan pantau performa toko.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Total Pendapatan" value={formatPrice(stats.revenue)} />
          <StatCard icon={<ShoppingBag className="h-5 w-5" />} label="Total Pesanan" value={stats.orderCount.toString()} />
          <StatCard icon={<Package className="h-5 w-5" />} label="Menunggu" value={stats.byStatus.find((s) => s.value === "pending")?.count.toString() ?? "0"} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Total Pelanggan" value={stats.customerCount.toString()} />
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="stats">Statistik</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="bg-card border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Pembayaran</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Belum ada pesanan
                        </TableCell>
                      </TableRow>
                    )}
                    {orders.map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                          {new Date(o.created_at).toLocaleString("id-ID", { dateStyle: "short", timeStyle: "short" })}
                          <div className="font-mono mt-1">#{o.id.slice(0, 8)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{o.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{o.customer_phone}</div>
                          <div className="text-xs text-muted-foreground max-w-xs truncate">{o.customer_address}</div>
                          {o.notes && <div className="text-xs italic mt-1">"{o.notes}"</div>}
                        </TableCell>
                        <TableCell className="text-sm">
                          {o.items.map((it) => (
                            <div key={it.product_id}>
                              {it.name} × {it.quantity}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell className="text-right font-bold whitespace-nowrap">
                          {formatPrice(Number(o.total_price))}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs font-medium mb-1">
                            {PAYMENT_LABELS[o.payment_method]?.icon}
                            {PAYMENT_LABELS[o.payment_method]?.label ?? o.payment_method}
                          </div>
                          {o.payment_proof_url ? (
                            <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => viewProof(o.payment_proof_url!)}>
                              <Eye className="h-3 w-3" /> Bukti
                            </Button>
                          ) : o.payment_method === "cod" ? (
                            <span className="text-xs text-muted-foreground">—</span>
                          ) : (
                            <span className="text-xs text-destructive">Tanpa bukti</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                            <SelectTrigger className={`w-[180px] text-xs font-semibold border-0 ${statusColor[o.status] ?? ""}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                  {s.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <div className="bg-card border rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>No. HP</TableHead>
                    <TableHead>Alamat</TableHead>
                    <TableHead>Bergabung</TableHead>
                    <TableHead className="text-right">Total Pesanan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Belum ada pelanggan
                      </TableCell>
                    </TableRow>
                  )}
                  {profiles.map((p) => {
                    const userOrders = orders.filter((o) => o.user_id === p.id);
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.full_name || "—"}</TableCell>
                        <TableCell>{p.phone || "—"}</TableCell>
                        <TableCell className="max-w-xs truncate">{p.address || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(p.created_at).toLocaleDateString("id-ID", { dateStyle: "medium" })}
                        </TableCell>
                        <TableCell className="text-right font-semibold">{userOrders.length}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-display text-xl font-bold mb-4">Pesanan per Status</h3>
                <div className="space-y-3">
                  {stats.byStatus.map((s) => (
                    <div key={s.value} className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[s.value]}`}>
                        {s.label}
                      </span>
                      <span className="font-bold">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-display text-xl font-bold mb-4">Produk Terlaris</h3>
                {stats.topProducts.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Belum ada data penjualan.</p>
                ) : (
                  <div className="space-y-3">
                    {stats.topProducts.map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between border-b last:border-0 pb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-2xl font-bold text-primary">#{i + 1}</span>
                          <div>
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{formatPrice(p.revenue)}</div>
                          </div>
                        </div>
                        <span className="font-bold">{p.qty}×</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="bg-card border rounded-xl p-5">
    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
      {icon}
      <span>{label}</span>
    </div>
    <div className="font-display text-2xl font-bold truncate">{value}</div>
  </div>
);

export default Admin;