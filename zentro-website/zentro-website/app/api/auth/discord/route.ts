import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: "Discord OAuth is not configured. Add DISCORD_CLIENT_ID and DISCORD_REDIRECT_URI." }, { status: 500 });
  }
  const state = randomBytes(24).toString("hex");
  const url = new URL("https://discord.com/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "identify guilds");
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url);
  response.cookies.set("zentro_oauth_state", state, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 600
  });
  return response;
}
