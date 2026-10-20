import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import visuel from "@/assets/visuel.png";
import { supabase } from "@/integrations/supabase/client";

export const WHATSAPP_URL = "https://chat.whatsapp.com/D1FnaM8AqB98LHxYc0JNEY";
export const THANKS_PATH = "/aa0c78289ddb8ffba9ab2aa5e82a2841";

const PREFIXES = [
  ["🇫🇷", "+33"], ["🇧🇪", "+32"], ["🇨🇭", "+41"], ["🇱🇺", "+352"], ["🇨🇦", "+1"],
  ["🇲🇦", "+212"], ["🇩🇿", "+213"], ["🇹🇳", "+216"], ["🇸🇳", "+221"], ["🇨🇮", "+225"],
  ["🇨🇲", "+237"], ["🇷🇪", "+262"], ["🇬🇵", "+590"], ["🇲🇶", "+596"], ["🇬🇫", "+594"],
  ["🇪🇸", "+34"], ["🇮🇹", "+39"], ["🇩🇪", "+49"], ["🇬🇧", "+44"], ["🇺🇸", "+1"],
];

function Header({ last }: { last: string }) {
  return (
    <>
      <img src={logo} alt="Boost Your Money" className="mx-auto w-72 md:w-96" />
      <h1 className="funnel-title mt-6">💸 Le canal privé qui va faire exploser ton argent (même si tu pars de zéro)</h1>
      <div className="funnel-text mt-8 space-y-1">
        <p>Tu veux :</p>
        <p>➤ Gagner plus et plus te faire plaisir</p>
        <p>➤ Accéder à des pépites financières simples et puissantes</p>
        <p>➤ Comprendre la crypto (sans jargon)</p>
        <p>➤ {last}</p>
      </div>
    </>
  );
}

function Body({ cta }: { cta: React.ReactNode }) {
  return (
    <>
      <h2 className="funnel-title mt-14">🔥 Bienvenue dans Boost Your Money, le canal WhatsApp qui transforme ton mindset… et ton compte en banque.</h2>
      <div className="funnel-text mt-10 space-y-8">
        <p>💰 Ici, pas de blabla. Juste des vraies infos. Des vraies opportunités.<br />Et une vraie communauté qui avance ENSEMBLE.</p>
        <div className="space-y-1">
          <p>Je te partage :</p>
          <p>🚀 Les bases de la crypto pour débutantes (enfin expliquées simplement)</p>
          <p>🔎 Des bons plans et astuces du quotidien qui t’aident à économiser & gagner +++</p>
          <p>💎 Des pépites d’investissement simples, accessibles et efficaces</p>
          <p>👑 Et un vrai mindset de queen pour devenir libre, pas juste "survivre"</p>
        </div>
        <img src={visuel} alt="Boost Your Money" className="mx-auto w-full max-w-md rounded-2xl" />
        <p>🛍 Ce canal, c’est les soldes privées toute l’année ! 🤑 Pas de cashback de 3 centimes quand tu fais tes courses.</p>
        <p>🚀 On parle de gains concrets. D’astuces puissantes. Et de vraies transformations.</p>
        <p>🎁 L’accès est 100% gratuit. Le changement et la transformation sont réels.</p>
        <p className="text-center font-semibold">👇 Clique ici pour rejoindre le canal WhatsApp 👇</p>
      </div>
      <div className="mt-6">{cta}</div>
    </>
  );
}

function LeadForm() {
  const navigate = useNavigate();
  const [prefix, setPrefix] = useState("+33");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    setLoading(true);
    setError("");
    const { error } = await supabase.from("leads").insert({
      last_name: v("last_name"),
      first_name: v("first_name"),
      email: v("email"),
      phone: `${prefix} ${v("phone")}`,
    });
    setLoading(false);
    if (error) return setError("Oups, une erreur est survenue. Réessaie.");
    navigate({ to: THANKS_PATH });
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-4">
      <input name="last_name" required maxLength={100} placeholder="Votre nom" className="funnel-input" />
      <input name="first_name" required maxLength={100} placeholder="Votre prénom" className="funnel-input" />
      <input name="email" type="email" required maxLength={255} placeholder="Votre adresse mail" className="funnel-input" />
      <div className="flex">
        <select value={prefix} onChange={(e) => setPrefix(e.target.value)} className="funnel-input w-28 rounded-r-none border-r-0" aria-label="Indicatif">
          {PREFIXES.map(([flag, p], i) => <option key={i} value={p}>{flag} {p}</option>)}
        </select>
        <input name="phone" type="tel" required minLength={4} maxLength={20} placeholder="Votre numéro de téléphone" className="funnel-input rounded-l-none" />
      </div>
      {error && <p className="text-center text-destructive">{error}</p>}
      <button type="submit" disabled={loading} className="funnel-btn mx-auto block max-w-lg">
        {loading ? "ENVOI..." : "JE REJOINS LE CANAL PRIVE"}
      </button>
    </form>
  );
}

function WhatsAppButton() {
  return <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="funnel-btn block text-center">JE REJOINS LE CANAL PRIVE</a>;
}

export function LandingPage() {
  return (
    <main className="funnel-page">
      <Header last="Et tu as envie de devenir LIBRE financièrement" />
      <LeadForm />
    </main>
  );
}

export function ThanksPage() {
  return (
    <main className="funnel-page">
      <Header last="Surtout, l’envie de devenir LIBRE financièrement" />
      <div className="mt-6"><WhatsAppButton /></div>
      <Body cta={<WhatsAppButton />} />
    </main>
  );
}
