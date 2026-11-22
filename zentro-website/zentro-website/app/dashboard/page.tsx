import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

function avatarUrl(id: string, avatar: string | null) {
  return avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=128`
    : `https://cdn.discordapp.com/embed/avatars/0.png`;
}
function guildIcon(id: string, icon: string | null) {
  return icon ? `https://cdn.discordapp.com/icons/${id}/${icon}.png?size=64` : null;
}

export default async function Dashboard() {
  const session = await getSession();
  if (!session) redirect("/");
  const user = session.user;
  const manageable = session.guilds.filter(g => g.owner || (BigInt(g.permissions || "0") & 0x8n) === 0x8n);
  return <main className="wrap dashboard">
    <div className="dashTop"><div><Link className="brand" href="/"><span className="logo">Z</span>ZENTRO</Link><h1 style={{marginTop:24}}>Your dashboard</h1><p style={{color:"var(--muted)"}}>Welcome back, {user.global_name || user.username}.</p></div>
      <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}><div className="profile"><img className="avatar" src={avatarUrl(user.id,user.avatar)} alt="Discord avatar"/><div><b>{user.global_name || user.username}</b><small>@{user.username}</small></div></div>
      <form action="/api/logout" method="post"><button className="btn soft" type="submit">Log out</button></form></div>
    </div>
    <div className="dashGrid">
      <section className="panel"><h2>Discord profile</h2><div className="profile" style={{padding:0,border:0}}><img className="avatar" src={avatarUrl(user.id,user.avatar)} alt="Discord avatar"/><div><b>{user.global_name || user.username}</b><small>Discord ID: {user.id}</small></div></div><p className="empty">You're signed in with Discord. Your access token is kept in an encrypted, HTTP-only session cookie.</p></section>
      <section className="panel"><h2>Your servers</h2><p className="empty">Servers where your account has Administrator permission or ownership:</p>
        <div className="serverList">{manageable.length ? manageable.map(g => {const icon = guildIcon(g.id,g.icon);return <div className="server" key={g.id}>{icon ? <img src={icon} alt=""/> : <div className="placeholder">{g.name.slice(0,1).toUpperCase()}</div>}<div><b>{g.name}</b><small>{g.owner ? "Server owner" : "Administrator"}</small></div></div>}) : <p className="empty">No manageable servers were returned by Discord for this account.</p>}</div>
      </section>
      <section className="panel"><h2>Embed Builder</h2><p className="empty">The website's embed builder can be added here next. This starter dashboard currently handles Discord login and server listing.</p></section>
      <section className="panel"><h2>Bot management</h2><p className="empty">This starter does not yet change bot settings or verify whether ZENTRO is installed in a server. That needs a bot-side API and permission checks.</p></section>
    </div>
    <p style={{marginTop:24}}><Link className="btn soft" href="/">← Back to website</Link></p>
  </main>;
}
