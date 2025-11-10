import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import propertiesData from "@/data/properties.json";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState(propertiesData);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  useEffect(() => {
    let filtered = [...propertiesData];

    // Filter by URL params
    const location = searchParams.get("location");
    const maxPrice = searchParams.get("maxPrice");
    const type = searchParams.get("type");

    if (location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseInt(maxPrice));
    }

    if (type && type !== "all") {
      filtered = filtered.filter((p) => p.type === type);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter by type
    if (selectedType.length > 0) {
      filtered = filtered.filter((p) => selectedType.includes(p.type));
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((p) =>
        selectedAmenities.every((amenity) => p.amenities.includes(amenity))
      );
    }

    setProperties(filtered);
  }, [searchParams, priceRange, selectedType, selectedAmenities]);

  const toggleType = (type: string) => {
    setSelectedType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Budget par nuit</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100000}
            step={5000}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0]} XAF</span>
            <span>{priceRange[1]} XAF</span>
          </div>
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-semibold mb-4">Type de logement</h3>
        <div className="space-y-3">
          {["apartment", "house", "studio"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedType.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              <Label htmlFor={type} className="cursor-pointer">
                {type === "apartment" ? "Appartement" : type === "house" ? "Maison" : "Studio"}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold mb-4">Équipements</h3>
        <div className="space-y-3">
          {["wifi", "piscine", "parking", "climatisation", "jardin"].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label htmlFor={amenity} className="cursor-pointer capitalize">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([0, 100000]);
          setSelectedType([]);
          setSelectedAmenities([]);
        }}
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Hébergements Disponibles</h1>
            <p className="text-muted-foreground">
              {properties.length} logement{properties.length > 1 ? "s" : ""} trouvé{properties.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Filtres
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Properties Grid */}
          <div className="flex-1">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Aucun hébergement ne correspond à vos critères
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 100000]);
                    setSelectedType([]);
                    setSelectedAmenities([]);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
