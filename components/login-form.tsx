"use client";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [email, setEmail] = useState(""); const [busy, setBusy] = useState(false); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setMessage(""); setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
      if (error) throw error;
      setMessage("Check your email for a secure sign-in link.");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not send the sign-in link."); }
    finally { setBusy(false); }
  }
  return <section className="card login"><p className="eyebrow">Welcome to FSAAI</p><h1 className="hero" style={{fontSize:44,letterSpacing:-2}}>Sign in to create</h1><p className="muted">We’ll email you a one-time sign-in link.</p><form onSubmit={submit}><label className="label" htmlFor="email">Email address</label><input id="email" className="field" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/><div className="actions"><button className="primary" disabled={busy}>{busy?"Sending…":"Send sign-in link"}</button></div></form>{message&&<p className="muted">{message}</p>}{error&&<p className="error">{error}</p>}<p className="small" style={{marginTop:24}}>Sign-in requires Supabase Auth setup. See README.md.</p></section>;
}
