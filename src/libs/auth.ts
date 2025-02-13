import "server-only";

import { createClient } from "@/utils/supabase/server";

export const auth = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};
