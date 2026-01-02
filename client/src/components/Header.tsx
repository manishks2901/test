import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Practice Areas" },
  { href: "/team", label: "Our Team" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location === href || location.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            data-testid="link-logo"
            aria-label="Wadhwa & Co."
          >
            <img
              src="/logo-wordmark.png"
              alt="Wadhwa & Co. logo"
              className="h-auto w-[140px] drop-shadow-sm sm:w-[180px] md:w-[220px] lg:w-[260px]"
              loading="lazy"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="ghost"
                  className={`font-sans text-sm ${
                    isActive(link.href)
                      ? "text-gold"
                      : "text-foreground/80 hover:text-gold"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/admin">
                  <Button variant="outline" size="sm" data-testid="link-admin-dashboard">
                    Dashboard
                  </Button>
                </Link>
                <a href="/api/logout">
                  <Button variant="ghost" size="sm" data-testid="button-logout">
                    Logout
                  </Button>
                </a>
              </div>
            ) : (
              <a href="/api/login" className="hidden sm:block">
                <Button variant="default" size="sm" data-testid="button-admin-login">
                  Admin Login
                </Button>
              </a>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-sans ${
                      isActive(link.href)
                        ? "text-gold bg-accent"
                        : "text-foreground/80 hover:text-gold"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              
              <div className="border-t border-border mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/admin">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="link-mobile-admin"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <a href="/api/logout">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        data-testid="button-mobile-logout"
                      >
                        Logout
                      </Button>
                    </a>
                  </>
                ) : (
                  <a href="/api/login">
                    <Button
                      variant="default"
                      className="w-full"
                      data-testid="button-mobile-login"
                    >
                      Admin Login
                    </Button>
                  </a>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
