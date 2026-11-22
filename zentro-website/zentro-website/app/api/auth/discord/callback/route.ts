import { NextRequest, NextResponse } from "next/server";
import { createSession, type DiscordGuild, type DiscordUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = request.cookies.get("zentro_oauth_state")?.value;
  const base = process.env.NEXT_PUBLIC_SITE_URL || url.origin;

  const fail = (message: string) => {
    const target = new URL("/", base);
    target.searchParams.set("login_error", message);
    const response = NextResponse.redirect(target);
    response.cookies.delete("zentro_oauth_state");
    return response;
  };

  if (url.searchParams.get("error")) return fail("Discord login was cancelled.");
  if (!code || !state || !savedState || state !== savedState) return fail("Login state check failed. Please try again.");

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return fail("Discord OAuth environment variables are missing.");

  try {
    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId, client_secret: clientSecret, grant_type: "authorization_code",
        code, redirect_uri: redirectUri
      }),
      cache: "no-store"
    });
    if (!tokenResponse.ok) return fail("Discord token exchange failed.");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token as string;
    if (!accessToken) return fail("Discord did not return an access token.");

    const headers = { Authorization: `Bearer ${accessToken}` };
    const [userResponse, guildResponse] = await Promise.all([
      fetch("https://discord.com/api/users/@me", { headers, cache: "no-store" }),
      fetch("https://discord.com/api/users/@me/guilds", { headers, cache: "no-store" })
    ]);
    if (!userResponse.ok || !guildResponse.ok) return fail("Could not load your Discord profile.");
    const user = await userResponse.json() as DiscordUser;
    const guilds = await guildResponse.json() as DiscordGuild[];
    await createSession({ user, guilds, accessToken });

    const response = NextResponse.redirect(new URL("/dashboard", base));
    response.cookies.delete("zentro_oauth_state");
    return response;
  } catch {
    return fail("Something went wrong during Discord login.");
  }
}
