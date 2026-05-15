import { NextRequest, NextResponse } from "next/server";
import { fetchUserPackages } from "@/lib/npm-api";
import { isValidUsername, sanitizeUsername } from "@/lib/validators";

type Params = { username: string };

async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { username } = await params;
  const sanitized = sanitizeUsername(username);

  if (!isValidUsername(sanitized)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  try {
    const result = await fetchUserPackages(sanitized);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "User not found or has no packages" },
      { status: 404 }
    );
  }
}

export { GET };
