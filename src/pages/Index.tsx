import { ArrowRight, Building2, Wrench, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-home.jpg";
import properties from "@/data/properties.json";

const Index = () => {
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Trouvez Votre Lieu Idéal
            <br />
            <span className="text-primary-light">ou Le Service Parfait</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Haven & Help combine location d'hébergements de qualité et services professionnels de confiance
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild variant="hero" size="lg">
              <Link to="/logements">
                <Building2 className="mr-2" />
                Explorer les Hébergements
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="service" size="lg">
              <Link to="/services">
                <Wrench className="mr-2" />
                Découvrir les Services
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold">Hébergements Populaires</h2>
              </div>
              <p className="text-muted-foreground">
                Les destinations préférées de nos voyageurs
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/logements">
                Voir tout
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Wrench className="w-8 h-8 text-secondary" />
              <h2 className="text-3xl font-bold">Services Professionnels</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des artisans qualifiés et certifiés pour tous vos besoins à domicile
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Plomberie", icon: "🔧", path: "/services?category=plomberie" },
              { name: "Électricité", icon: "⚡", path: "/services?category=electricite" },
              { name: "Menuiserie", icon: "🪚", path: "/services?category=menuiserie" },
              { name: "Jardinage", icon: "🌿", path: "/services?category=jardinage" },
              { name: "Peinture", icon: "🎨", path: "/services?category=peinture" },
              { name: "Climatisation", icon: "❄️", path: "/services?category=climatisation" },
            ].map((service) => (
              <Link
                key={service.name}
                to={service.path}
                className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-secondary hover:shadow-md transition-smooth group"
              >
                <div className="text-4xl group-hover:scale-110 transition-smooth">
                  {service.icon}
                </div>
                <span className="text-sm font-medium text-center group-hover:text-secondary transition-smooth">
                  {service.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="service" size="lg">
              <Link to="/services">
                Tous les Services
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Hébergements</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80">Professionnels</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-white/80">Clients Satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8⭐</div>
              <div className="text-white/80">Note Moyenne</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
