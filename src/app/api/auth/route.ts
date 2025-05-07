import { createClient } from "@/core/utils/supabase/server.supabase";

export async function GET() {
    
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser() 

    const currentUser = {
        data: data.user,
        error: error
    }

    return new Response(JSON.stringify(currentUser), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
   