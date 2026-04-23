import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, Loader2, QrCode, Landmark, Wallet, Upload, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import qrisImage from "@/assets/qris-placeholder.png";
import { BANK_ACCOUNTS, QRIS_MERCHANT } from "@/data/payment-info";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  phone: z.string().trim().min(8, "No. telepon tidak valid").max(20).regex(/^[0-9+\-\s()]+$/, "Format no. telepon tidak valid"),
  address: z.string().trim().min(10, "Alamat minimal 10 karakter").max(500),
  notes: z.string().trim().max(500).optional(),
});

type PaymentMethod = "qris" | "bank_transfer" | "cod";

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qris");
  const [proofFile, setProofFile] = useState<File | null>(null);

  // Auto-fill from profile
  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, phone, address")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setName(data.full_name || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        }
      });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const parsed = checkoutSchema.safeParse({ name, phone, address, notes });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    // Require proof for QRIS / Bank Transfer
    if (paymentMethod !== "cod" && !proofFile) {
      toast.error("Mohon upload bukti pembayaran terlebih dahulu");
      return;
    }

    if (proofFile) {
      if (proofFile.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }
      if (!proofFile.type.startsWith("image/")) {
        toast.error("File bukti harus berupa gambar");
        return;
      }
    }

    setSubmitting(true);

    // Upload proof if any
    let proofUrl: string | null = null;
    if (proofFile) {
      const ext = proofFile.name.split(".").pop() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("payment-proofs")
        .upload(path, proofFile, { contentType: proofFile.type, upsert: false });
      if (uploadError) {
        setSubmitting(false);
        toast.error("Gagal upload bukti: " + uploadError.message);
        return;
      }
      proofUrl = path;
    }

    const orderItems = items.map(({ product, quantity }) => ({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    }));

    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      customer_name: parsed.data.name,
      customer_phone: parsed.data.phone,
      customer_address: parsed.data.address,
      notes: parsed.data.notes || null,
      items: orderItems,
      total_price: totalPrice,
      payment_method: paymentMethod,
      payment_proof_url: proofUrl,
    });

    // Save profile data for next time
    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: parsed.data.name,
      phone: parsed.data.phone,
      address: parsed.data.address,
    });

    setSubmitting(false);
    if (error) {
      toast.error("Gagal membuat pesanan: " + error.message);
      return;
    }

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
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
          <Button asChild>
            <Link to="/pesanan">Lihat Pesanan Saya</Link>
          </Button>
        </div>
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
              <Input id="name" required placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input id="phone" required placeholder="08xxxxxxxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={20} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat Pengiriman</Label>
              <Textarea id="address" required placeholder="Alamat lengkap..." value={address} onChange={(e) => setAddress(e.target.value)} maxLength={500} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan (opsional)</Label>
              <Textarea id="notes" placeholder="Catatan khusus untuk pesanan..." value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} />
            </div>

            {/* Payment method */}
            <div className="space-y-3 pt-2">
              <Label>Metode Pembayaran</Label>
              <RadioGroup value={paymentMethod} onValueChange={(v) => { setPaymentMethod(v as PaymentMethod); setProofFile(null); }} className="grid gap-2">
                <PaymentOption value="qris" icon={<QrCode className="h-4 w-4" />} label="QRIS" desc="Scan QR, transfer, lalu upload bukti" />
                <PaymentOption value="bank_transfer" icon={<Landmark className="h-4 w-4" />} label="Transfer Bank" desc="Transfer manual ke rekening kami" />
                <PaymentOption value="cod" icon={<Wallet className="h-4 w-4" />} label="Bayar di Tempat (COD)" desc="Bayar tunai saat pesanan diterima" />
              </RadioGroup>
            </div>

            {/* Payment instructions */}
            {paymentMethod === "qris" && (
              <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                <p className="text-sm font-medium">Scan QRIS berikut, transfer sebesar <span className="font-bold text-primary">{formatPrice(totalPrice)}</span></p>
                <div className="flex justify-center bg-background rounded-lg p-3 border">
                  <img src={qrisImage} alt="QRIS ManisBakery" width={200} height={250} loading="lazy" className="max-w-[200px]" />
                </div>
                <p className="text-xs text-muted-foreground text-center">{QRIS_MERCHANT.name} · NMID: {QRIS_MERCHANT.nmid}</p>
              </div>
            )}

            {paymentMethod === "bank_transfer" && (
              <div className="rounded-xl border bg-muted/30 p-4 space-y-3">
                <p className="text-sm">Transfer sebesar <span className="font-bold text-primary">{formatPrice(totalPrice)}</span> ke salah satu rekening berikut:</p>
                <div className="space-y-2">
                  {BANK_ACCOUNTS.map((b) => (
                    <div key={b.bank} className="flex items-center justify-between bg-background rounded-lg p-3 border">
                      <div>
                        <div className="text-xs text-muted-foreground">{b.bank} a.n. {b.holder}</div>
                        <div className="font-mono font-semibold">{b.number}</div>
                      </div>
                      <Button type="button" size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(b.number); toast.success("No. rekening disalin"); }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {paymentMethod !== "cod" && (
              <div className="space-y-2">
                <Label htmlFor="proof">Upload Bukti Pembayaran</Label>
                <div className="relative">
                  <Input id="proof" type="file" accept="image/*" onChange={(e) => setProofFile(e.target.files?.[0] ?? null)} />
                </div>
                {proofFile && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Upload className="h-3 w-3" /> {proofFile.name} ({(proofFile.size / 1024).toFixed(0)} KB)
                  </p>
                )}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full mt-4" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Konfirmasi Pesanan"}
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
