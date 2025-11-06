import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import servicesData from "@/data/services.json";

const Services = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState(servicesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    let filtered = [...servicesData];

    // Filter by URL params
    const category = searchParams.get("category");
    if (category) {
      filtered = filtered.filter((s) => s.category === category);
      setSelectedCategories([category]);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (s) => s.price >= priceRange[0] && s.price <= priceRange[1]
    );

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((s) => selectedCategories.includes(s.category));
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter((s) => s.rating >= minRating);
    }

    setServices(filtered);
  }, [searchParams, searchQuery, priceRange, selectedCategories, minRating]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const categories = [
    { value: "plomberie", label: "Plomberie" },
    { value: "electricite", label: "Électricité" },
    { value: "menuiserie", label: "Menuiserie" },
    { value: "jardinage", label: "Jardinage" },
    { value: "peinture", label: "Peinture" },
    { value: "climatisation", label: "Climatisation" },
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4">Tarif horaire</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0]}€/h</span>
            <span>{priceRange[1]}€/h</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-4">Catégories</h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center space-x-2">
              <Checkbox
                id={cat.value}
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={() => toggleCategory(cat.value)}
              />
              <Label htmlFor={cat.value} className="cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-4">Note minimale</h3>
        <div className="space-y-3">
          {[4.5, 4.0, 3.5].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer">
                {rating}⭐ et plus
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPriceRange([0, 100]);
          setSelectedCategories([]);
          setMinRating(0);
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
          <div className="bg-card border border-border rounded-2xl shadow-elegant p-4 md:p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher un service ou un prestataire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button variant="service" size="lg">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services Professionnels</h1>
            <p className="text-muted-foreground">
              {services.length} service{services.length > 1 ? "s" : ""} disponible{services.length > 1 ? "s" : ""}
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
                <SlidersHorizontal className="w-5 h-5 text-secondary" />
                Filtres
              </h2>
              <FilterContent />
            </div>
          </aside>

          {/* Services Grid */}
          <div className="flex-1">
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Aucun service ne correspond à vos critères
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 100]);
                    setSelectedCategories([]);
                    setMinRating(0);
                    setSearchQuery("");
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

export default Services;
