import { useMutation } from "@tanstack/react-query";
import supabase from "../lib/supabase";

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password, name }) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });
      if (error) throw error;
    },
  });
};
