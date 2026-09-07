import { NextResponse } from "next/server";
import { db, isDatabaseConfigured } from "@/db";
import { contactMessages } from "@/db/schema";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { interpolate } from "@/i18n/interpolate";
import { site } from "@/lib/site";
import { createContactSchema } from "@/lib/validation";

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

  const parsed = createContactSchema(locale).safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? v.invalidData;
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const data = parsed.data;

  if (data.website) {
    // Honeypot rempli par un robot : on répond succès sans rien enregistrer.
    return NextResponse.json({ ok: true, reference: "00000000" }, { status: 201 });
  }

  if (!db || !isDatabaseConfigured) {
    console.error("[contact] DATABASE_URL non configurée — message non enregistré.");
    return NextResponse.json(
      { error: interpolate(v.formUnavailable, { phone: site.phones[0].display }) },
      { status: 503 }
    );
  }

  try {
    const [row] = await db
      .insert(contactMessages)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        subject: data.subject || null,
        message: data.message,
      })
      .returning({ id: contactMessages.id });

    return NextResponse.json({ ok: true, reference: row.id.slice(0, 8).toUpperCase() }, { status: 201 });
  } catch (err) {
    console.error("[contact] insert failed:", err);
    return NextResponse.json(
      { error: interpolate(v.serverError, { phone: site.phones[0].display }) },
      { status: 500 }
    );
  }
}
