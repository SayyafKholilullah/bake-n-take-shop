import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <main className="pt-24 pb-20">
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-6">Hubungi Kami</h1>
      <p className="text-center text-muted-foreground text-lg mb-12">
        Ada pertanyaan? Kami senang membantu Anda!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: MapPin, title: "Alamat", value: "Jl. Kue Manis No. 42\nJakarta Selatan 12345" },
          { icon: Phone, title: "Telepon", value: "+62 812 3456 7890" },
          { icon: Clock, title: "Jam Operasional", value: "Senin - Sabtu\n08.00 - 20.00 WIB" },
          { icon: MessageCircle, title: "WhatsApp", value: "Chat langsung dengan kami" },
        ].map(({ icon: Icon, title, value }) => (
          <div key={title} className="bg-card border rounded-xl p-6 flex gap-4 items-start">
            <Icon className="h-6 w-6 text-primary mt-1 shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm whitespace-pre-line">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" asChild className="gap-2">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" /> Chat via WhatsApp
          </a>
        </Button>
      </div>

      {/* Map embed */}
      <div className="mt-12 rounded-2xl overflow-hidden border h-64 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.194741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Lokasi ManisBakery"
        />
      </div>
    </div>
  </main>
);

export default Contact;
