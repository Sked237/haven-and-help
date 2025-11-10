import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Users, Home, MapPin, Wifi, Car, Wind, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import properties from "@/data/properties.json";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Logement non trouvé</p>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [property.image, property.image, property.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    parking: Car,
    climatisation: Wind,
    cuisine: UtensilsCrossed,
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const totalPrice = calculateNights() * property.price;

  const handleReservation = () => {
    if (!checkIn || !checkOut) {
      toast.error("Veuillez sélectionner les dates de séjour");
      return;
    }
    toast.success("Réservation simulée avec succès !");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{property.rating}</span>
              <span className="text-muted-foreground">({property.reviews} avis)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group">
            <img
              src={images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={prevImage}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-smooth"
              onClick={nextImage}
            >
              <ChevronRight />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    idx === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {property.host.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Hôte : {property.host}</h3>
                      <p className="text-sm text-muted-foreground">Membre depuis 2020</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    Superhôte
                  </Badge>
                </div>

                <Separator className="my-6" />

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{property.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">Chambres</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">Salles de bain</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold">{property.guests}</p>
                      <p className="text-xs text-muted-foreground">Voyageurs</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">À propos de ce logement</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Équipements</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Avis des voyageurs</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Voyageur {i}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellent séjour ! Le logement était exactement comme sur les photos.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-primary">{property.price} XAF</span>
                  <span className="text-muted-foreground">/ nuit</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Arrivée</label>
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Départ</label>
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => !checkIn || date <= checkIn}
                      className="rounded-md border"
                    />
                  </div>
                </div>

                {calculateNights() > 0 && (
                  <div className="space-y-2 mb-6 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>
                        {property.price} XAF × {calculateNights()} nuit{calculateNights() > 1 ? "s" : ""}
                      </span>
                      <span>{totalPrice} XAF</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">{totalPrice} XAF</span>
                    </div>
                  </div>
                )}

                <Button variant="hero" size="lg" className="w-full" onClick={handleReservation}>
                  Réserver
                </Button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Vous ne serez pas débité pour le moment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Localisation</h2>
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Carte Google Maps - {property.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
