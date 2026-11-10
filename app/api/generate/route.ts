import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export async function POST(request: Request) {
  const key = process.env.FAL_KEY;
  if (!key) return NextResponse.json({ error: "Add FAL_KEY in .env.local or Vercel Environment Variables." }, { status: 503 });
  const model = process.env.FAL_MODEL_ID;
  if (!model) return NextResponse.json({ error: "Add FAL_MODEL_ID for a text-to-video model available in your fal.ai account." }, { status: 503 });
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return NextResponse.json({ error: "Please sign in to generate a video." }, { status: 401 });
    const body = await request.json();
    const prompt = typeof body.prompt === "string" ? body.prompt.trim().slice(0, 1200) : "";
    if (prompt.length < 8) return NextResponse.json({ error: "Enter a prompt with at least 8 characters." }, { status: 400 });
    fal.config({ credentials: key });
    const result = await fal.subscribe(model, { input: { prompt }, logs: false });
    const data = result.data as { video?: { url?: string }; videos?: { url?: string }[] };
    const videoUrl = data.video?.url ?? data.videos?.[0]?.url;
    if (!videoUrl) return NextResponse.json({ error: "The selected model returned no video URL. Check its output format in fal.ai." }, { status: 502 });
    return NextResponse.json({ videoUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Video generation failed.";
    return NextResponse.json({ error: message.slice(0, 400) }, { status: 502 });
  }
}
