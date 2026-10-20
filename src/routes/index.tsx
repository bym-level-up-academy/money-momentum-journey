import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/Funnel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boost Your Money — Le canal privé WhatsApp" },
      { name: "description", content: "Le canal privé qui va faire exploser ton argent, même si tu pars de zéro. Accès 100% gratuit." },
      { property: "og:title", content: "Boost Your Money — Le canal privé WhatsApp" },
      { property: "og:description", content: "Crypto sans jargon, bons plans et pépites d'investissement. Accès 100% gratuit." },
    ],
  }),
  component: LandingPage,
});
