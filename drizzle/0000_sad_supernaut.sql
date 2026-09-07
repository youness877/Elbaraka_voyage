-- NOTE: cette base de données a déjà "booking_requests", "contact_messages"
-- et le type "request_type" en production (créés avant l'introduction des
-- migrations Drizzle dans ce projet). drizzle-kit generate n'avait pas
-- d'historique de migration à comparer et a donc proposé de recréer TOUT
-- le schéma. Ce fichier a été édité à la main pour ne contenir QUE les
-- objets réellement nouveaux du CMS, afin de ne jamais toucher les tables
-- existantes ni perdre de données de production.
CREATE TYPE "public"."admin_role" AS ENUM('admin', 'editor');--> statement-breakpoint
CREATE TABLE "activity_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"actor_name" varchar(120) NOT NULL,
	"action" varchar(60) NOT NULL,
	"target" varchar(160) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(160) NOT NULL,
	"password_hash" text NOT NULL,
	"name" varchar(120) NOT NULL,
	"role" "admin_role" DEFAULT 'admin' NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"site_name" varchar(160),
	"logo_url" text,
	"favicon_url" text,
	"footer_copyright_note" varchar(200),
	"email" varchar(160),
	"phones" jsonb,
	"whatsapp_number" varchar(32),
	"whatsapp_message_fr" text,
	"whatsapp_message_ar" text,
	"address_street_fr" varchar(200),
	"address_street_ar" varchar(200),
	"address_city_fr" varchar(120),
	"address_city_ar" varchar(120),
	"address_postal" varchar(20),
	"address_region_fr" varchar(160),
	"address_region_ar" varchar(160),
	"hours" jsonb,
	"facebook_url" text,
	"instagram_url" text,
	"tiktok_url" text,
	"maps_directions_url" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid
);
--> statement-breakpoint
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_actor_id_admin_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_updated_by_admin_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id") ON DELETE set null ON UPDATE no action;
