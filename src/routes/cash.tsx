import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/Funnel";

export const Route = createFileRoute("/cash")({
  head: () => ({
    meta: [
      { title: "Boost Your Money — Rejoins le canal privé" },
      { name: "description", content: "Inscris-toi gratuitement au canal WhatsApp privé Boost Your Money." },
      { property: "og:title", content: "Boost Your Money — Rejoins le canal privé" },
      { property: "og:description", content: "Inscris-toi gratuitement au canal WhatsApp privé Boost Your Money." },
    ],
  }),
  component: LandingPage,
});
