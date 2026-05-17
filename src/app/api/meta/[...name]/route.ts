import { NextRequest, NextResponse } from "next/server";
import { fetchPackageMeta } from "@/lib/npm-api";
import { isValidPackageName, sanitizePackageName } from "@/lib/validators";

type Params = { name: string[] };

async function GET(_req: NextRequest, { params }: { params: Promise<Params> }) {
  const { name } = await params;
  const packageName = sanitizePackageName(name.join("/"));

  if (!isValidPackageName(packageName)) {
    return NextResponse.json({ error: "Invalid package name" }, { status: 400 });
  }

  try {
    const meta = await fetchPackageMeta(packageName);
    return NextResponse.json(meta);
  } catch {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }
}

export { GET };
