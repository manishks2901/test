import { Link } from "wouter";
import { Scale, MapPin, Phone, Mail, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "./NewsletterSignup";

const practiceAreas = [
  "Corporate Law",
  "Commercial Litigation",
  "Real Estate Law",
  "Intellectual Property",
  "Employment Law",
  "Tax Advisory",
];

const quickLinks = [
  { href: "/services", label: "Our Services" },
  { href: "/team", label: "Our Team" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Scale className="h-8 w-8 text-gold" />
              <div>
                <h3 className="font-serif text-xl font-bold">Wadhwa & Co.</h3>
                <p className="text-xs uppercase tracking-[0.15em] text-primary-foreground/70">
                  Advocates & Solicitors
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Providing exceptional legal services with integrity, expertise, and a 
              commitment to achieving the best outcomes for our clients since 1985.
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-gold hover:bg-primary-foreground/10"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-gold hover:bg-primary-foreground/10"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {practiceAreas.map((area) => (
                <li key={area}>
                  <Link
                    href="/services"
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                    data-testid={`link-footer-${area.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-primary-foreground/80">
                  Suite 1200, Legal Tower<br />
                  100 Business District<br />
                  Mumbai 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="tel:+912212345678"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  data-testid="link-footer-phone"
                >
                  +91 22 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="mailto:contact@wadhwa-law.com"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-colors"
                  data-testid="link-footer-email"
                >
                  contact@wadhwa-law.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="max-w-md">
            <h4 className="font-serif text-lg font-semibold mb-2">
              Subscribe to Our Newsletter
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Stay informed with our latest legal insights and firm updates.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/60">
              &copy; {new Date().getFullYear()} Wadhwa & Co. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-xs text-primary-foreground/60 hover:text-gold transition-colors"
                data-testid="link-footer-privacy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-primary-foreground/60 hover:text-gold transition-colors"
                data-testid="link-footer-terms"
              >
                Terms of Service
              </Link>
              <Link
                href="/disclaimer"
                className="text-xs text-primary-foreground/60 hover:text-gold transition-colors"
                data-testid="link-footer-disclaimer"
              >
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
