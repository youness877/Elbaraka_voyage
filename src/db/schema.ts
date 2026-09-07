import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const requestTypeEnum = pgEnum("request_type", ["car", "voyage"]);

export const adminRoleEnum = pgEnum("admin_role", ["admin", "editor"]);

/** Demandes de réservation (location de voiture & forfaits voyages/Omra) */
export const bookingRequests = pgTable("booking_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: requestTypeEnum("type").notNull(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  payload: jsonb("payload").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Messages envoyés depuis le formulaire de contact */
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }),
  subject: varchar("subject", { length: 160 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type BookingRequest = typeof bookingRequests.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

/* ———————————————————— CMS — ADMINISTRATION ———————————————————— */

/** Comptes de connexion au tableau de bord d'administration. */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  role: adminRoleEnum("role").notNull().default("admin"),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Réglages généraux et coordonnées du site — table "singleton" : une seule
 * ligne (id fixe = 1) contient toujours l'état courant. Les champs
 * `phones` / `hours` sont des tableaux JSON car leur nombre peut varier
 * (l'admin ajoute/retire une ligne) sans nécessiter de migration.
 */
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),

  // Général
  siteName: varchar("site_name", { length: 160 }),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  footerCopyrightNote: varchar("footer_copyright_note", { length: 200 }),

  // Contact
  email: varchar("email", { length: 160 }),
  phones: jsonb("phones").$type<
    { labelFr: string; labelAr: string; display: string; intl: string }[]
  >(),
  whatsappNumber: varchar("whatsapp_number", { length: 32 }),
  whatsappMessageFr: text("whatsapp_message_fr"),
  whatsappMessageAr: text("whatsapp_message_ar"),

  addressStreetFr: varchar("address_street_fr", { length: 200 }),
  addressStreetAr: varchar("address_street_ar", { length: 200 }),
  addressCityFr: varchar("address_city_fr", { length: 120 }),
  addressCityAr: varchar("address_city_ar", { length: 120 }),
  addressPostal: varchar("address_postal", { length: 20 }),
  addressRegionFr: varchar("address_region_fr", { length: 160 }),
  addressRegionAr: varchar("address_region_ar", { length: 160 }),

  hours: jsonb("hours").$type<{ dayFr: string; dayAr: string; time: string }[]>(),

  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  tiktokUrl: text("tiktok_url"),
  mapsDirectionsUrl: text("maps_directions_url"),

  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  updatedBy: uuid("updated_by").references(() => adminUsers.id, { onDelete: "set null" }),
});

/** Journal d'activité — traçabilité minimale des actions admin sur le CMS. */
export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorId: uuid("actor_id").references(() => adminUsers.id, { onDelete: "set null" }),
  actorName: varchar("actor_name", { length: 120 }).notNull(),
  action: varchar("action", { length: 60 }).notNull(),
  target: varchar("target", { length: 160 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type SiteSettingsRow = typeof siteSettings.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;
