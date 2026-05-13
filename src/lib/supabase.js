import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseKEY) {
  throw new Error("Supabase env variables are missing");
}

const supabase = createClient(supabaseURL, supabaseKEY, {
  auth: {
    storage: localStorage,
    storageKey: "admin-auth",
  },
  database: {
    schema: "public",
  },
  realtime: {
    params: {
      broadcast: true,
    },
  },
});

export default supabase;