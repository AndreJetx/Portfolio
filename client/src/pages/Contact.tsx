import { PageTransition } from "@/components/layout/PageTransition";
import { useContact, useProfile } from "@/hooks/use-portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function Contact() {
  const { data: profile } = useProfile();
  const mutation = useContact();
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof insertMessageSchema>) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left Column: Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold">{t.contact.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {(profile?.contactEmail ?? "").trim() && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t.contact.email}</h3>
                    <a href={`mailto:${profile?.contactEmail?.trim()}`} className="text-muted-foreground hover:text-white transition-colors">
                      {profile?.contactEmail?.trim()}
                    </a>
                  </div>
                </div>
              )}
              {(profile?.contactLocation ?? "").trim() && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t.contact.location}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{profile?.contactLocation?.trim()}</p>
                  </div>
                </div>
              )}
              {(profile?.contactPhone ?? "").trim() && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{t.contact.phone}</h3>
                    <p className="text-muted-foreground">{profile?.contactPhone?.trim()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-card/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">{t.contact.name}</Label>
                        <FormControl>
                          <Input 
                            placeholder={t.contact.namePlaceholder} 
                            {...field} 
                            className="bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 h-12 rounded-xl transition-all"
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
                        <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">{t.contact.email}</Label>
                        <FormControl>
                          <Input 
                            placeholder={t.contact.emailPlaceholder} 
                            {...field} 
                            className="bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 h-12 rounded-xl transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">{t.contact.phone}</Label>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder={t.contact.phonePlaceholder} 
                          {...field} 
                          className="bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 h-12 rounded-xl transition-all"
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
                        <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">{t.contact.message}</Label>
                        <FormControl>
                          <Textarea 
                            placeholder={t.contact.messagePlaceholder}
                          {...field} 
                          className="bg-black/20 border-white/10 focus:border-primary/50 focus:bg-black/40 min-h-[150px] rounded-xl resize-none transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                >
                  {mutation.isPending ? t.contact.sending : (
                    <>
                      {t.contact.send} <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
