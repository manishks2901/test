import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Wadhwa & Co. provided exceptional guidance during our company's merger. Their expertise and attention to detail made a complex process remarkably smooth.",
    author: "Vikram Mehta",
    title: "CEO, TechCorp India",
    caseType: "Corporate M&A",
  },
  {
    quote:
      "The litigation team's strategic approach helped us win a crucial intellectual property dispute. Their dedication to our case was outstanding.",
    author: "Dr. Sunita Rao",
    title: "Director, Innovate Labs",
    caseType: "IP Litigation",
  },
  {
    quote:
      "Their real estate team guided our company through multiple property acquisitions with professionalism and deep market knowledge.",
    author: "Arjun Singh",
    title: "Managing Director, BuildRight Group",
    caseType: "Real Estate",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our commitment to excellence has earned us the trust of leading 
            businesses and individuals across diverse industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border border-border/50 bg-card"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-gold/30 mb-6" />
                <blockquote className="text-foreground leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border pt-6">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </p>
                  <p className="text-xs text-gold mt-2 font-medium">
                    {testimonial.caseType}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
