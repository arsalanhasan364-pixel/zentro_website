import { EncryptJWT, jwtDecrypt } from "jose";
import { cookies } from "next/headers";

const COOKIE = "zentro_session";
const key = () => {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be at least 32 characters.");
  return new TextEncoder().encode(secret);
};

export type DiscordUser = {
  id: string; username: string; global_name?: string | null;
  avatar: string | null; discriminator?: string;
};
export type DiscordGuild = {
  id: string; name: string; icon: string | null; owner?: boolean; permissions?: string;
};

export async function createSession(data: { user: DiscordUser; guilds: DiscordGuild[]; accessToken: string }) {
  const token = await new EncryptJWT(data as Record<string, unknown>)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt().setExpirationTime("7d").encrypt(key());
  cookies().set(COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7
  });
}
export async function getSession() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtDecrypt(token, key());
    return payload as unknown as { user: DiscordUser; guilds: DiscordGuild[]; accessToken: string };
  } catch { return null; }
}
export function clearSession() {
  cookies().delete(COOKIE);
}
