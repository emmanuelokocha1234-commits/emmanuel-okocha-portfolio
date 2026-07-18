import { NextResponse } from "next/server";
import { z } from "zod";
import { answerQuestion } from "@/lib/ai-assistant";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(500),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Message is required (max 500 characters)." },
      { status: 400 }
    );
  }

  const reply = answerQuestion(parsed.data.message);
  return NextResponse.json({ reply });
}
