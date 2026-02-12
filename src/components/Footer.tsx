import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background py-12 mt-20">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-display text-2xl font-bold mb-4">
          <span className="text-primary">Manis</span>Bakery
        </h3>
        <p className="text-background/60 text-sm leading-relaxed">
          Kue artisan dengan bahan premium untuk momen spesial Anda. Dibuat dengan cinta sejak 2020.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Menu</h4>
        <div className="flex flex-col gap-2 text-sm text-background/60">
          <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
          <Link to="/katalog" className="hover:text-primary transition-colors">Katalog</Link>
          <Link to="/tentang" className="hover:text-primary transition-colors">Tentang Kami</Link>
          <Link to="/kontak" className="hover:text-primary transition-colors">Kontak</Link>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Kontak</h4>
        <div className="flex flex-col gap-2 text-sm text-background/60">
          <p>Jl. Kue Manis No. 42, Jakarta</p>
          <p>+62 812 3456 7890</p>
          <p>halo@manisbakery.id</p>
          <p>Buka: 08.00 - 20.00 WIB</p>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-8 border-t border-background/10 text-center text-xs text-background/40">
      © 2026 ManisBakery. Semua hak dilindungi.
    </div>
  </footer>
);

export default Footer;
