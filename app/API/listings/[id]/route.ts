import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const listings = await prisma.listing.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      domain: true,
      askPrice: true,
      minOffer: true,
      saleType: true,
      listingUrl: true,
      createdAt: true,
    },
  });
  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const domain = body?.domain?.trim().toLowerCase();
  const listingUrl = body?.listingUrl?.trim();
  const saleType = body?.saleType;
  const askPrice = body?.askPrice ? Number(body.askPrice) : null;
  const minOffer = body?.minOffer ? Number(body.minOffer) : null;

  if (!domain || !listingUrl || !["BUY_NOW", "OFFER", "BOTH"].includes(saleType)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }
  if ((saleType === "BUY_NOW" || saleType === "BOTH") && !askPrice) {
    return NextResponse.json(
      { error: "A buy-now price is required for this sale type." },
      { status: 400 }
    );
  }
  if ((saleType === "OFFER" || saleType === "BOTH") && (!minOffer || minOffer < 1)) {
    return NextResponse.json(
      { error: "A minimum offer amount is required for this sale type." },
      { status: 400 }
    );
  }

  const listing = await prisma.listing.create({
    data: { domain, listingUrl, saleType, askPrice, minOffer, userId },
  });

  return NextResponse.json(listing, { status: 201 });
}
