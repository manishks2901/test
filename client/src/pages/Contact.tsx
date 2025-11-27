import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Linkedin,
  Twitter,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  practiceArea: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const practiceAreas = [
  "Corporate Law",
  "Commercial Litigation",
  "Real Estate Law",
  "Intellectual Property",
  "Employment Law",
  "Tax Advisory",
  "Other",
];

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    details: ["Suite 1200, Legal Tower", "100 Business District", "Mumbai 400001"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 22 1234 5678", "+91 22 1234 5679"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@wadhwa-law.com", "inquiries@wadhwa-law.com"],
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 2:00 PM"],
  },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      practiceArea: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Us - Schedule a Consultation"
        description="Contact Wadhwa & Co. to schedule a confidential consultation with our experienced attorneys. Office located in Mumbai."
        keywords="contact lawyer, legal consultation, law firm contact, Mumbai lawyer, schedule consultation, legal advice"
      />
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-primary">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="max-w-3xl">
              <span className="inline-block text-gold font-semibold text-sm uppercase tracking-wider mb-4">
                Get In Touch
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Schedule a confidential consultation with our experienced attorneys 
                to discuss your legal needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Card className="border border-border/50">
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-8 w-8 text-success" />
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                          Message Sent Successfully
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Thank you for contacting us. One of our attorneys will 
                          respond to your inquiry within 24 hours.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setIsSubmitted(false)}
                          data-testid="button-send-another"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-6"
                        >
                          <div className="grid sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John Doe"
                                      {...field}
                                      data-testid="input-name"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="john@example.com"
                                      {...field}
                                      data-testid="input-email"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="+91 98765 43210"
                                      {...field}
                                      data-testid="input-phone"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="practiceArea"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Practice Area</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger data-testid="select-practice-area">
                                        <SelectValue placeholder="Select a practice area" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {practiceAreas.map((area) => (
                                        <SelectItem key={area} value={area}>
                                          {area}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Brief description of your inquiry"
                                    {...field}
                                    data-testid="input-subject"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Please describe your legal matter in detail..."
                                    className="min-h-[150px] resize-none"
                                    {...field}
                                    data-testid="input-message"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full sm:w-auto"
                            disabled={mutation.isPending}
                            data-testid="button-submit-contact"
                          >
                            {mutation.isPending ? (
                              "Sending..."
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border border-border/50"
                    data-testid={`card-contact-${info.title.toLowerCase()}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                          <info.icon className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {info.title}
                          </h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-sm text-muted-foreground">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="border border-border/50 bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Connect With Us</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground/70 hover:text-gold hover:bg-primary-foreground/10"
                        data-testid="link-contact-linkedin"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary-foreground/70 hover:text-gold hover:bg-primary-foreground/10"
                        data-testid="link-contact-twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="h-[400px] bg-muted">
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-gold/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gold/50 mx-auto mb-4" />
              <p className="text-muted-foreground">Map placeholder</p>
              <p className="text-sm text-muted-foreground">
                Suite 1200, Legal Tower, Mumbai 400001
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
