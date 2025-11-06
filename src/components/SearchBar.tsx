import { useState } from "react";
import { Search, MapPin, DollarSign, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (priceMax) params.set("maxPrice", priceMax);
    if (propertyType) params.set("type", propertyType);
    
    navigate(`/logements?${params.toString()}`);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-elegant p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Destination
          </label>
          <Input
            placeholder="Paris, Lyon, Nice..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-muted"
          />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Home className="w-4 h-4 text-primary" />
            Type de logement
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="border-muted">
              <SelectValue placeholder="Tous types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Prix max */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            Budget max / nuit
          </label>
          <Input
            type="number"
            placeholder="200"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="border-muted"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            variant="hero"
            size="lg"
            className="w-full"
          >
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
