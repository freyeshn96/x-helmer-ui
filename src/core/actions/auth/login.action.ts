'use server';

import { createClient } from "@/core/utils/supabase/server.supabase";
import { redirect } from "next/navigation";

interface State {
    email: string;
    password: string;
    error: string | undefined;
}

export const SignInWithSupabase = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return {
        ...prevState, 
        error: error.message 
    };
  }

  redirect("/chat");
};
