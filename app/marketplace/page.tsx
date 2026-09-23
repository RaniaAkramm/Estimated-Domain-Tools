import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ListingCard from "@/components/ListingCard";

export const metadata: Metadata = {
  title: "Domain Marketplace — Buy or Make an Offer",
  description:
    "Browse domains listed for sale by their owners. Buy now or make an offer directly — Estimated links you to where each domain is actually listed.",
  alternates: { canonical: "/marketplace" },
};

export const dynamic = "force-dynamic";

export default async function MarketplacePage() {
  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <p className="font-mono text-xs text-brass tracking-wide mb-4">MARKETPLACE</p>
      <h1 className="text-paper text-3xl md:text-4xl font-bold leading-tight max-w-[20ch] mb-4">
        Domains listed by their owners
      </h1>
      <p className="text-paper/70 max-w-[54ch] leading-relaxed mb-10">
        Estimated is a listing board, not the seller. "Buy now" sends you to the platform
        where the domain is actually held for sale; "Make offer" sends the offer straight
        to the owner here.
      </p>

      {listings.length === 0 ? (
        <div className="border border-dashed border-rule/50 p-8 text-paper/60 text-sm">
          No domains listed yet.
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={{
                id: listing.id,
                domain: listing.domain,
                askPrice: listing.askPrice,
                minOffer: listing.minOffer,
                saleType: listing.saleType as "BUY_NOW" | "OFFER" | "BOTH",
                listingUrl: listing.listingUrl,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
