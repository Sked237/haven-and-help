import { useParams } from "react-router-dom";
import { useState } from "react";
import { Star, Award, MapPin, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import services from "@/data/services.json";

const ServiceDetail = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Service non trouvé</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast.error("Veuillez sélectionner une date");
      return;
    }
    if (!formData.name || !formData.email || !formData.description) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    toast.success("Demande de devis envoyée avec succès !");
    setFormData({ name: "", email: "", phone: "", description: "" });
    setSelectedDate(undefined);
  };

  const whatsappNumber = "+237621721403";
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite obtenir plus d'informations sur le service "${service.title}"`
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Badge className="mb-4 bg-secondary text-secondary-foreground">
            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
          </Badge>
          <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-muted-foreground">({service.reviews} avis)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{service.location}</span>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-8">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Provider Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xl">
                        {service.provider.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{service.provider}</h3>
                      <p className="text-sm text-muted-foreground">{service.experience} d'expérience</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-secondary">{service.price} XAF</div>
                    <div className="text-sm text-muted-foreground">par {service.priceUnit}</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                  <h4 className="font-semibold">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.certifications.map((cert) => (
                      <Badge key={cert} variant="outline" className="border-secondary text-secondary">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Description du service</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                <h3 className="font-semibold mb-3">Services proposés :</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.services.map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Contact direct</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span>+237 621 72 14 03</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-secondary" />
                    <span>contact@service.cm</span>
                  </div>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-smooth"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Contacter via WhatsApp</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Avis clients</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarFallback>C{i}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">Client {i}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Service professionnel et efficace. Très satisfait du résultat !
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-elegant">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Demander un devis</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div>
                    <Label>Date souhaitée *</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description de la mission *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Décrivez votre besoin..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" variant="service" size="lg" className="w-full">
                    Envoyer la demande
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Le prestataire vous contactera sous 24h
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
