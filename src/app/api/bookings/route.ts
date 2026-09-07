import { NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/db";
import { bookingRequests } from "@/db/schema";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/interpolate";
import { site } from "@/lib/site";
import { createBookingSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide. / طلب غير صالح." }, { status: 400 });
  }

  const bodyLocale = body && typeof body === "object" && "locale" in body ? (body as { locale?: unknown }).locale : undefined;
  const locale: Locale = isLocale(typeof bodyLocale === "string" ? bodyLocale : undefined) ? (bodyLocale as Locale) : "fr";
  const v = getDictionary(locale).validation;

  const parsed = createBookingSchema(locale).safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? v.invalidData;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot : requête silencieusement acceptée mais non enregistrée
  if (data.website) {
    return NextResponse.json({ ok: true, reference: "00000000" }, { status: 201 });
  }

  const { website: _website, ...rest } = data;
  const label = data.type === "car" ? `Location — ${data.carSlug}` : `Voyage — ${data.packageSlug}`;

  if (!db || !isDatabaseConfigured) {
    console.error("[bookings] DATABASE_URL non configurée — demande non enregistrée.", label);
    return NextResponse.json(
      { error: interpolate(v.bookingUnavailable, { phone: site.phones[0].display }) },
      { status: 503 }
    );
  }

  try {
    const [row] = await db
      .insert(bookingRequests)
      .values({
        type: data.type,
        fullName: data.fullName,
        phone: data.phone,
        email: data.email || null,
        payload: { ...rest, label, locale, source: "site-web" },
      })
      .returning({ id: bookingRequests.id });

    return NextResponse.json({ ok: true, reference: row.id.slice(0, 8).toUpperCase() }, { status: 201 });
  } catch (err) {
    console.error("[bookings] insert failed:", err);
    return NextResponse.json(
      { error: interpolate(v.serverError, { phone: site.phones[0].display }) },
      { status: 500 }
    );
  }
}
