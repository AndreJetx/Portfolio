import { PageTransition } from "@/components/layout/PageTransition";
import { useContact } from "@/hooks/use-portfolio";
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
  const mutation = useContact();
  
  const form = useForm<z.infer<typeof insertMessageSchema>>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
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
              <h2 className="font-display text-4xl font-bold">Entre em Contato</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">E-mail</h3>
                  <a href="mailto:hello@alex.design" className="text-muted-foreground hover:text-white transition-colors">
                    hello@alex.design
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Localização</h3>
                  <p className="text-muted-foreground">
                    São Paulo, SP<br />
                    Disponível para Remoto
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Telefone</h3>
                  <p className="text-muted-foreground">+55 (11) 99999-9999</p>
                </div>
              </div>
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
                        <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">Nome</Label>
                        <FormControl>
                          <Input 
                            placeholder="Seu nome" 
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
                        <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">E-mail</Label>
                        <FormControl>
                          <Input 
                            placeholder="seu@email.com" 
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="text-xs uppercase tracking-wide font-bold text-muted-foreground ml-1">Mensagem</Label>
                      <FormControl>
                        <Textarea 
                          placeholder="Conte-me sobre seu projeto..." 
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
                  {mutation.isPending ? "Enviando..." : (
                    <>
                      Enviar Mensagem <Send className="ml-2 w-5 h-5" />
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
