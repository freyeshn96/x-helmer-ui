import { createClient } from "@/core/utils/supabase/server.supabase";
import { redirect } from "next/navigation";

const LogoutPage = async () => {

    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/auth/login");

    return (
        <div>
            <h1>Logout</h1>
            <p>You have been logged out.</p>
        </div>
    );
}

export default LogoutPage;