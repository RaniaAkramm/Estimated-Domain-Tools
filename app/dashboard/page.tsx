import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AddListingForm from "@/components/AddListingForm";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const listings = userId
    ? await prisma.listing.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { offers: { orderBy: { createdAt: "desc" } } },
      })
    : [];

  return (
    <div className="max-w-3xl mx-auto px-5 py-14">
      <p className="font-mono text-xs text-brass tracking-wide mb-4">DASHBOARD</p>
      <h1 className="text-paper text-3xl font-bold mb-8">Your listings</h1>

      <div className="mb-10">
        <AddListingForm />
      </div>

      {listings.length === 0 ? (
        <p className="text-paper/60 text-sm">You haven't listed any domains yet.</p>
      ) : (
        <div className="space-y-5">
          {listings.map((listing) => (
            <div key={listing.id} className="border border-rule bg-paper p-5">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="font-mono text-base font-bold">{listing.domain}</div>
                <div className="text-xs text-ink-soft font-mono">{listing.status}</div>
              </div>
              <div className="text-xs text-ink-soft mt-1">
                {listing.askPrice && `Buy-now $${listing.askPrice}`}
                {listing.askPrice && listing.minOffer && " · "}
                {listing.minOffer && `Min offer $${listing.minOffer}`}
              </div>

              {listing.offers.length > 0 && (
                <div className="mt-4 border-t border-rule pt-4">
                  <div className="font-mono text-xs text-ink-soft mb-2">
                    OFFERS ({listing.offers.length})
                  </div>
                  <div className="space-y-2">
                    {listing.offers.map((offer) => (
                      <div
                        key={offer.id}
                        className="flex justify-between items-baseline gap-3 text-sm"
                      >
                        <span>
                          ${offer.amount.toLocaleString("en-US")}
                          {offer.message && (
                            <span className="text-ink-soft"> — {offer.message}</span>
                          )}
                        </span>
                        <span className="font-mono text-xs text-ink-soft">{offer.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
