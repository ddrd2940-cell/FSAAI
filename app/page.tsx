import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Studio from "@/components/studio";

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <main className="shell"><div className="main"><p className="eyebrow">Setup needed</p><h1 className="hero">Connect your <em>Supabase</em> project</h1><p className="sub">Copy .env.example to .env.local, add your Supabase project URL and anon key, then restart the development server. See README.md for the full setup guide.</p></div></main>;
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return <Studio email={user.email ?? ""} />;
}
