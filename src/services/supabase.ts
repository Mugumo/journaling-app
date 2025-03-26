import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseProjectUrl!, supabaseAnonKey!);


/**
 * Generate public URLs for images stored in Supabase Storage.
 * @param path - Image path in the storage bucket.
 * @returns Public URL string.
 */
export const getPublicImageUrl = (path: string): string => {
	return supabase.storage.from("journaling-app").getPublicUrl(path).data.publicUrl
};