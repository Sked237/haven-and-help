import { Star, Award, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  id: string;
  title: string;
  provider: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  priceUnit: string;
  image: string;
  category: string;
  experience?: string;
}

const ServiceCard = ({
  id,
  title,
  provider,
  location,
  rating,
  reviews,
  price,
  priceUnit,
  image,
  category,
  experience,
}: ServiceCardProps) => {
  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      plomberie: "Plomberie",
      electricite: "Électricité",
      menuiserie: "Menuiserie",
      jardinage: "Jardinage",
      peinture: "Peinture",
      climatisation: "Climatisation",
    };
    return labels[cat] || cat;
  };

  return (
    <Link to={`/services/${id}`}>
      <Card className="group overflow-hidden hover:shadow-elegant transition-smooth cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
          />
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
            {getCategoryLabel(category)}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-secondary transition-smooth">
                {title}
              </h3>
              <p className="text-sm font-medium text-foreground">{provider}</p>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-xs text-muted-foreground">({reviews})</span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </div>
            {experience && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>{experience} d'expérience</span>
              </div>
            )}
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-secondary">{price}€</span>
            <span className="text-sm text-muted-foreground">/ {priceUnit}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
