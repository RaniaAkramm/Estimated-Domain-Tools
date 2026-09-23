import type { Metadata } from "next";
import CvcvcvTool from "@/components/CvcvcvTool";

export const metadata: Metadata = {
  title: "CVCVCV Letter Pattern Checker for Domain Names",
  description:
    "Check the vowel, consonant, and semivowel pattern of any domain or brand name to judge pronounceability at a glance.",
  alternates: { canonical: "/cvcvcv" },
};

export default function CvcvcvPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <p className="font-mono text-xs text-brass tracking-wide mb-4">LETTER PATTERN CHECKER</p>
      <h1 className="text-paper text-3xl md:text-4xl font-bold leading-tight max-w-[22ch] mb-4">
        See the vowel / consonant pattern of any name
      </h1>
      <p className="text-paper/70 max-w-[52ch] leading-relaxed mb-10">
        Type a name to break it into vowels, consonants, and semivowels (Y, W), and see its
        longest unbroken runs of each — a quick signal for how easy it is to say and remember.
      </p>
      <CvcvcvTool />
    </div>
  );
}
