# ZENTRO Website

Premium white + purple Next.js website with Discord OAuth2 login and a starter dashboard.

## 1. Create your Discord OAuth application

1. Open https://discord.com/developers/applications and select your ZENTRO application (or create one).
2. Open **OAuth2**.
3. Copy the **Client ID** and **Client Secret**.
4. Add this exact redirect URL under **Redirects**:
   - Local: `http://localhost:3000/api/auth/discord/callback`
   - Production: `https://YOUR-VERCEL-DOMAIN.vercel.app/api/auth/discord/callback`
5. Save changes.

The login requests `identify guilds` only. Do not put the Client Secret or bot token in browser code.

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

- `DISCORD_CLIENT_ID`
- `DISCORD_CLIENT_SECRET`
- `DISCORD_REDIRECT_URI` (must exactly match a Discord OAuth2 redirect above)
- `SESSION_SECRET` (random secret, at least 32 characters)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPPORT_URL` (optional)

Optional: set `NEXT_PUBLIC_BOT_INVITE_URL` in Vercel/local environment to your bot's real invite URL.

Generate a session secret with `openssl rand -base64 32`, or use a trusted password generator.

## 3. Run locally

Install Node.js 20 or newer, then:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 4. Deploy with GitHub + Vercel

1. Create a GitHub repository named `zentro-website`.
2. Upload all files and folders from this project. Do not upload `.env.local`.
3. In Vercel, choose **Add New → Project**, import `zentro-website`.
4. Add the same environment variables in **Project Settings → Environment Variables**.
5. Set `DISCORD_REDIRECT_URI` to `https://YOUR-VERCEL-DOMAIN.vercel.app/api/auth/discord/callback`.
6. Set `NEXT_PUBLIC_SITE_URL` to `https://YOUR-VERCEL-DOMAIN.vercel.app`.
7. Redeploy after adding variables.
8. Add that production callback URL to Discord Developer Portal → OAuth2 → Redirects.

## Notes

- Dashboard shows the signed-in user's Discord profile and servers where they are owner or have Administrator permission.
- Discord login does not automatically mean ZENTRO is installed in a server.
- This starter does not yet perform bot management actions. Those require a secure bot-side API.
- The command list is sample content. Update it to match your actual ZENTRO bot commands.
- Keep all secrets in Vercel Environment Variables or local `.env.local`, never in GitHub.
