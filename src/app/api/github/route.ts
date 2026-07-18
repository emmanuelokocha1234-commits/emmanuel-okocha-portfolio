import { NextResponse } from "next/server";
import { getAllRepoStats } from "@/lib/github";

export async function GET() {
  const stats = await getAllRepoStats();
  return NextResponse.json(stats);
}
