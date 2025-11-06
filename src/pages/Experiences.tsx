import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Experiences = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-full mb-6">
            <Star className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Expériences Uniques
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Découvrez bientôt des expériences exceptionnelles proposées par nos hôtes et prestataires : 
            cours de cuisine, visites guidées, ateliers artisanaux et bien plus encore.
          </p>

          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Réservation Simple</h3>
              <p className="text-sm text-muted-foreground">
                Réservez votre expérience en quelques clics
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Guides Experts</h3>
              <p className="text-sm text-muted-foreground">
                Accompagnés par des professionnels passionnés
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Moments Inoubliables</h3>
              <p className="text-sm text-muted-foreground">
                Des souvenirs qui dureront toute une vie
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Restez Informés</h3>
            <p className="text-muted-foreground mb-6">
              Cette section sera bientôt disponible. Inscrivez-vous à notre newsletter pour être informé du lancement.
            </p>
            <Button variant="hero" size="lg">
              Je m'inscris
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Experiences;
