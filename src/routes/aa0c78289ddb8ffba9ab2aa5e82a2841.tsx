import { createFileRoute } from "@tanstack/react-router";
import { ThanksPage } from "@/components/Funnel";

export const Route = createFileRoute("/aa0c78289ddb8ffba9ab2aa5e82a2841")({
  head: () => ({
    meta: [
      { title: "Merci ! Rejoins le canal Boost Your Money" },
      { name: "description", content: "Ton inscription est confirmée : clique pour rejoindre le canal WhatsApp Boost Your Money." },
      { property: "og:title", content: "Merci ! Rejoins le canal Boost Your Money" },
      { property: "og:description", content: "Clique pour rejoindre le canal WhatsApp Boost Your Money." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ThanksPage,
});
