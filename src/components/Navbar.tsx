import { Home, Building2, Wrench, Star, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Haven & Help
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/logements"
              className="px-4 py-2 rounded-lg transition-smooth hover:bg-muted"
              activeClassName="bg-muted text-primary"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Hébergements</span>
              </div>
            </NavLink>
            <NavLink
              to="/services"
              className="px-4 py-2 rounded-lg transition-smooth hover:bg-muted"
              activeClassName="bg-muted text-secondary"
            >
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Services</span>
              </div>
            </NavLink>
            <NavLink
              to="/experiences"
              className="px-4 py-2 rounded-lg transition-smooth hover:bg-muted"
              activeClassName="bg-muted"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>Expériences</span>
              </div>
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <NavLink
              to="/logements"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-smooth"
              activeClassName="bg-muted text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building2 className="w-5 h-5" />
              <span>Hébergements</span>
            </NavLink>
            <NavLink
              to="/services"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-smooth"
              activeClassName="bg-muted text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Wrench className="w-5 h-5" />
              <span>Services</span>
            </NavLink>
            <NavLink
              to="/experiences"
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-muted transition-smooth"
              activeClassName="bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Star className="w-5 h-5" />
              <span>Expériences</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
