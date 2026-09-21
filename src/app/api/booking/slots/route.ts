import { NextResponse } from "next/server";
import { z } from "zod";
import { getAvailableSlots } from "@/lib/booking";
import { bookableServicesBySlug } from "@/data/bookable-services";

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

const querySchema = z.object({
  service: z.string().trim().min(1).max(120),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({ service: searchParams.get("service") ?? "" });
  if (!parsed.success) return errorResponse("Ogiltig tjänst.");

  const { service } = parsed.data;
  if (!bookableServicesBySlug.has(service)) return errorResponse("Tjänsten hittades inte.", 404);

  try {
    const slots = await getAvailableSlots(service);
    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Kunde inte hämta lediga tider", error);
    return errorResponse("Lediga tider kunde inte hämtas just nu. Försök igen om en stund.", 503);
  }
}
