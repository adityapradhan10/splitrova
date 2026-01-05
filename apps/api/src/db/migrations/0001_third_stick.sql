ALTER TABLE "users" RENAME COLUMN "supabase_user_id" TO "external_user_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_supabase_user_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_external_user_id_unique" UNIQUE("external_user_id");