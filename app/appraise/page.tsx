import type { Metadata } from "next";
import AppraisalTool from "@/components/AppraisalTool";

export const metadata: Metadata = {
  title: "Domain Value Estimator — Appraise Any Domain Free",
  description:
    "Enter any domain name and get a multi-factor value range in seconds. Scored on length, extension, pronounceability, word structure, and keyword demand.",
  alternates: { canonical: "/appraise" },
};

export default function AppraisePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <p className="font-mono text-xs text-brass tracking-wide mb-4">DOMAIN VALUE ESTIMATOR</p>
      <h1 className="text-paper text-3xl md:text-4xl font-bold leading-tight max-w-[20ch] mb-4">
        Appraise a domain name
      </h1>
      <p className="text-paper/70 max-w-[52ch] leading-relaxed mb-10">
        Enter a domain below. The tool weighs six factors and returns a price range with a
        confidence rating — not a single number pretending to be precise.
      </p>
      <AppraisalTool />
    </div>
  );
}
