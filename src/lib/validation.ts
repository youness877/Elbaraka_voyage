import { z } from "zod";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Schémas Zod partagés entre les formulaires (client) et les routes API
 * (serveur). Paramétrés par `locale` afin que les messages d'erreur
 * s'affichent dans la langue active — côté client ET côté serveur (la
 * langue est transmise dans le corps de la requête, voir les routes API).
 */

export const moroccanPhoneRegex = /^(?:\+?212|0)\s?[5-7]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;

function buildPhoneField(v: ReturnType<typeof getDictionary>["validation"]) {
  return z
    .string({ message: v.phoneRequired })
    .min(9, v.phoneTooShort)
    .refine((val) => moroccanPhoneRegex.test(val.replace(/[().-]/g, " ").replace(/\s+/g, " ").trim()), {
      message: v.phoneInvalid,
    });
}

function buildEmailField(v: ReturnType<typeof getDictionary>["validation"]) {
  return z.string().email(v.emailInvalid).max(160).optional().or(z.literal(""));
}

function buildNameField(v: ReturnType<typeof getDictionary>["validation"]) {
  return z.string({ message: v.nameRequired }).min(3, v.nameTooShort).max(120);
}

// Champ honeypot anti-spam (doit rester vide)
const honeypot = z.string().max(0).optional().or(z.undefined());

export function createCarBookingSchema(locale: Locale) {
  const v = getDictionary(locale).validation;
  return z.object({
    type: z.literal("car"),
    carSlug: z.string({ message: v.chooseVehicle }).min(2, v.chooseVehicle),
    pickupPlace: z.string({ message: v.pickupPlaceRequired }).min(2),
    returnPlace: z.string().optional().or(z.literal("")),
    pickupDate: z.string({ message: v.pickupDateRequired }).min(8, v.pickupDateRequired),
    dropoffDate: z.string({ message: v.dropoffDateRequired }).min(8, v.dropoffDateRequired),
    fullName: buildNameField(v),
    phone: buildPhoneField(v),
    email: buildEmailField(v),
    notes: z.string().max(1000).optional().or(z.literal("")),
    website: honeypot,
  });
}

export function createTripInquirySchema(locale: Locale) {
  const v = getDictionary(locale).validation;
  return z.object({
    type: z.literal("voyage"),
    packageSlug: z.string({ message: v.choosePackage }).min(2, v.choosePackage),
    tripType: z.enum(["omra", "hajj", "billet", "circuit"]),
    departureDate: z.string().optional().or(z.literal("")),
    travelers: z
      .number({ message: v.travelersRequired })
      .int(v.travelersInt)
      .min(1, v.travelersMin)
      .max(60, v.travelersMax),
    fullName: buildNameField(v),
    phone: buildPhoneField(v),
    email: buildEmailField(v),
    notes: z.string().max(1000).optional().or(z.literal("")),
    website: honeypot,
  });
}

export function createBookingSchema(locale: Locale) {
  return z.discriminatedUnion("type", [createCarBookingSchema(locale), createTripInquirySchema(locale)]);
}

export function createContactSchema(locale: Locale) {
  const v = getDictionary(locale).validation;
  return z.object({
    name: buildNameField(v),
    phone: buildPhoneField(v),
    email: buildEmailField(v),
    subject: z.string().max(160).optional().or(z.literal("")),
    message: z.string({ message: v.messageRequired }).min(10, v.messageTooShort).max(2000, v.messageTooLong),
    website: honeypot,
  });
}

// Schémas par défaut (français) — pratiques pour un typage rapide côté client.
export const carBookingSchema = createCarBookingSchema("fr");
export const tripInquirySchema = createTripInquirySchema("fr");
export const bookingSchema = createBookingSchema("fr");
export const contactSchema = createContactSchema("fr");

export type CarBookingInput = z.infer<typeof carBookingSchema>;
export type TripInquiryInput = z.infer<typeof tripInquirySchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
