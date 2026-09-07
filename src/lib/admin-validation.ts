import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Adresse e-mail invalide."),
  password: z.string().min(8, "Mot de passe trop court (8 caractères minimum)."),
});

export const phoneEntrySchema = z.object({
  labelFr: z.string().min(1, "Libellé (FR) requis."),
  labelAr: z.string().min(1, "Libellé (AR) requis."),
  display: z.string().min(4, "Numéro affiché requis."),
  intl: z.string().min(6, "Lien d'appel requis (ex. tel:+212...)."),
});

export const hourEntrySchema = z.object({
  dayFr: z.string().min(1, "Jour (FR) requis."),
  dayAr: z.string().min(1, "Jour (AR) requis."),
  time: z.string().min(1, "Horaire requis."),
});

export const generalSettingsSchema = z.object({
  siteName: z.string().min(2, "Le nom du site est requis.").max(160),
  footerCopyrightNote: z.string().max(200).optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
  faviconUrl: z.string().url().optional().or(z.literal("")),
});

export const contactSettingsSchema = z.object({
  email: z.string().email("E-mail invalide."),
  whatsappNumber: z
    .string()
    .regex(/^\d{9,15}$/, "Numéro WhatsApp au format international sans + ni espaces (ex. 212661403298)."),
  whatsappMessageFr: z.string().max(300).optional().or(z.literal("")),
  whatsappMessageAr: z.string().max(300).optional().or(z.literal("")),
  phones: z.array(phoneEntrySchema).min(1, "Au moins un numéro de téléphone est requis."),
  addressStreetFr: z.string().min(2).max(200),
  addressStreetAr: z.string().min(2).max(200),
  addressCityFr: z.string().min(2).max(120),
  addressCityAr: z.string().min(2).max(120),
  addressPostal: z.string().min(2).max(20),
  addressRegionFr: z.string().min(2).max(160),
  addressRegionAr: z.string().min(2).max(160),
  hours: z.array(hourEntrySchema).min(1, "Au moins une ligne d'horaires est requise."),
  facebookUrl: z.string().url("URL Facebook invalide.").optional().or(z.literal("")),
  instagramUrl: z.string().url("URL Instagram invalide.").optional().or(z.literal("")),
  tiktokUrl: z.string().url("URL TikTok invalide.").optional().or(z.literal("")),
  mapsDirectionsUrl: z.string().url("URL Google Maps invalide.").optional().or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type GeneralSettingsInput = z.infer<typeof generalSettingsSchema>;
export type ContactSettingsInput = z.infer<typeof contactSettingsSchema>;
