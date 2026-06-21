import { MapPin } from "lucide-react";

const ServiceMap = () => {
  // OpenStreetMap embed centered on Burundi, with a marker on Bujumbura
  const bbox = "28.95,-4.45,30.85,-2.30"; // Burundi bounding box
  const marker = "-3.3614,29.3599"; // Bujumbura
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  const locations = [
    { name: "Bujumbura", region: "Bujumbura Mairie", desc: "Headquarters & main programs" },
    { name: "Gitega", region: "Gitega Province", desc: "Education & vocational training" },
    { name: "Ngozi", region: "Ngozi Province", desc: "Agriculture & community outreach" },
    { name: "Muyinga", region: "Muyinga Province", desc: "Mentorship & youth leadership" },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="font-semibold tracking-widest uppercase mb-3 text-sm text-primary">
            Where We Work
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            Our Service Locations in Burundi
          </h2>
          <p className="text-muted-foreground text-lg">
            We serve youth and communities across multiple provinces of Burundi —
            from our headquarters in Bujumbura to rural programs upcountry.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
            <iframe
              title="Map of Aspire and Thrive Initiative service locations in Burundi"
              src={mapSrc}
              className="w-full h-[450px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-3 text-xs text-muted-foreground text-center bg-secondary/50">
              <a
                href={`https://www.openstreetmap.org/?mlat=-3.3614&mlon=29.3599#map=8/-3.4/29.9`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                View larger map on OpenStreetMap →
              </a>
            </div>
          </div>

          {/* Locations list */}
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-bold text-foreground mb-4">
              Active Locations
            </h3>
            {locations.map((loc) => (
              <div
                key={loc.name}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{loc.name}</p>
                  <p className="text-xs text-muted-foreground mb-1">{loc.region}</p>
                  <p className="text-sm text-muted-foreground">{loc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
