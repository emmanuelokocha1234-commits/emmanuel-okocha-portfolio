import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});

// No transactional email provider configured yet — this route validates
// server-side and hands back a clean payload for the client to open via
// `mailto:`. TODO: swap for Resend/SendGrid here once an API key exists,
// keeping the same request/response contract.
export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }

  const { name, email, message } = parsed.data;
  return NextResponse.json({
    ok: true,
    mailto: {
      subject: `Portfolio contact from ${name}`,
      body: `${message}\n\n— ${name} (${email})`,
    },
  });
}
