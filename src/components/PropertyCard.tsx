import { Star, Users, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  image: string;
  bedrooms?: number;
  guests?: number;
  type: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  priceUnit,
  rating,
  reviews,
  image,
  bedrooms,
  guests,
  type,
}: PropertyCardProps) => {
  return (
    <Link to={`/logements/${id}`}>
      <Card className="group overflow-hidden hover:shadow-elegant transition-smooth cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {type === "house" ? "Maison" : type === "apartment" ? "Appartement" : "Studio"}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-smooth">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            {bedrooms && (
              <div className="flex items-center gap-1">
                <Home className="w-4 h-4" />
                <span>{bedrooms} ch.</span>
              </div>
            )}
            {guests && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{guests} pers.</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">{price} XAF</span>
            <span className="text-sm text-muted-foreground">/ {priceUnit}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
