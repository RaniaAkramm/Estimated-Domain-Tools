import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const listing = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!listing || listing.status !== "ACTIVE") {
    return NextResponse.json({ error: "Listing not found or no longer active." }, { status: 404 });
  }
  if (listing.saleType === "BUY_NOW") {
    return NextResponse.json(
      { error: "This listing only accepts buy-now purchases." },
      { status: 400 }
    );
  }

  const body = await req.json().catch(() => null);
  const amount = Number(body?.amount);
  const message = body?.message?.trim() || null;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Enter a valid offer amount." }, { status: 400 });
  }
  if (listing.minOffer && amount < listing.minOffer) {
    return NextResponse.json(
      { error: `The minimum offer for this domain is $${listing.minOffer}.` },
      { status: 400 }
    );
  }.     

  const offer = await prisma.offer.create({
    data: { amount, message, listingId: listing.id, userId },
  });

  return NextResponse.json(offer, { status: 201 });
}
