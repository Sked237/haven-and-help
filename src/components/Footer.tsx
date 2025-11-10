import { Home, Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const whatsappNumber = "+237621721403"; // Numéro WhatsApp pour support
  const whatsappMessage = encodeURIComponent("Bonjour, j'ai besoin d'aide avec Haven & Help");

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Haven & Help
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre plateforme de confiance pour la location d'hébergements et la réservation de services professionnels.
            </p>
          </div>

          {/* Hébergements */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Hébergements</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/logements" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Tous les logements
                </Link>
              </li>
              <li>
                <Link to="/logements?type=apartment" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Appartements
                </Link>
              </li>
              <li>
                <Link to="/logements?type=house" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Maisons
                </Link>
              </li>
              <li>
                <Link to="/logements?type=studio" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Studios
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-secondary">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Tous les services
                </Link>
              </li>
              <li>
                <Link to="/services?category=plomberie" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Plomberie
                </Link>
              </li>
              <li>
                <Link to="/services?category=electricite" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Électricité
                </Link>
              </li>
              <li>
                <Link to="/services?category=menuiserie" className="text-muted-foreground hover:text-foreground transition-smooth">
                  Menuiserie
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:contact@havenhelp.cm" className="hover:text-foreground transition-smooth">
                  contact@havenhelp.cm
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+237 621 72 14 03</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-smooth"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Support WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Haven & Help. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
