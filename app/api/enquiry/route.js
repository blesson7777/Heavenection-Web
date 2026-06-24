import { NextResponse } from "next/server";

export async function POST(request) {
  const backendBase =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "https://api.heavenection.com";

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid enquiry payload." }, { status: 400 });
  }

  const response = await fetch(`${backendBase.replace(/\/$/, "")}/api/website-enquiries/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : { detail: await response.text() };

  return NextResponse.json(body, { status: response.status });
}
