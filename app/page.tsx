import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain Appraisal & Naming Tools",
  description:
    "Free tools for domain buyers, sellers, and flippers: estimate what a domain is worth across six factors, and check its letter pattern for pronounceability.",
};

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <p className="font-mono text-xs text-brass tracking-wide mb-4">
        DOMAIN APPRAISAL LEDGER
      </p>
      <h1 className="text-paper text-4xl md:text-5xl font-bold leading-tight max-w-[18ch]">
        What's a domain actually worth?
      </h1>
      <p className="text-paper/70 mt-5 max-w-[52ch] leading-relaxed">
        Estimated breaks a domain name down into the factors buyers actually pay for —
        length, extension, pronounceability, word structure, and keyword demand — and
        gives you a realistic price range instead of a single made-up number.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mt-10">
        <Link
          href="/appraise"
          className="block border border-rule/40 hover:border-brass p-6 transition-colors"
        >
          <h2 className="text-paper font-semibold text-lg mb-1.5">Appraise a domain</h2>
          <p className="text-paper/60 text-sm leading-relaxed">
            Get a multi-factor value range with a full breakdown of each score.
          </p>
        </Link>
        <Link
          href="/cvcvcv"
          className="block border border-rule/40 hover:border-brass p-6 transition-colors"
        >
          <h2 className="text-paper font-semibold text-lg mb-1.5">Check letter pattern</h2>
          <p className="text-paper/60 text-sm leading-relaxed">
            See the vowel / consonant / semivowel structure of any name at a glance.
          </p>
        </Link>
        <Link
          href="/marketplace"
          className="block border border-rule/40 hover:border-brass p-6 transition-colors sm:col-span-2"
        >
          <h2 className="text-paper font-semibold text-lg mb-1.5">Browse the marketplace</h2>
          <p className="text-paper/60 text-sm leading-relaxed">
            Domains listed by their owners — buy now or make an offer directly.
          </p>
        </Link>
      </div>

      <section className="mt-16 border-t border-rule/30 pt-10">
        <h2 className="text-paper text-xl font-semibold mb-4">How the estimate works</h2>
        <p className="text-paper/60 leading-relaxed max-w-[58ch]">
          Every domain is scored on six weighted factors — length, TLD, cleanliness,
          pronounceability, word structure, and commercial keyword demand — combined into a
          single score, then mapped to one of six pricing tiers, from "Low demand" to
          "Premium." The result is a range, not a fixed price, because no naming-based
          model can substitute for real comparable sales.
        </p>
      </section>
    </div>
  );
}
