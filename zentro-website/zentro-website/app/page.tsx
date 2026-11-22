import Link from "next/link";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();
  const invite = process.env.NEXT_PUBLIC_BOT_INVITE_URL || "https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=bot%20applications.commands";
  const support = process.env.NEXT_PUBLIC_SUPPORT_URL || "https://discord.gg/REPLACE_ME";
  return <main>
    <header className="wrap nav">
      <Link className="brand" href="/"><span className="logo">Z</span>ZENTRO</Link>
      <nav className="navlinks"><a href="#features">Features</a><a href="#commands">Commands</a><a href="#support">Support</a></nav>
      <div className="actions">
        {session ? <Link className="btn soft" href="/dashboard">Dashboard →</Link> : <a className="btn discord" href="/api/auth/discord">◈ Login with Discord</a>}
      </div>
    </header>
    <section className="hero" id="home"><div className="wrap heroGrid">
      <div><div className="tag">✦ YOUR DISCORD, UPGRADED</div><h1>Make your server <span>stand out.</span></h1>
        <p className="lead">Meet ZENTRO — powerful tools and a clean embed-making experience for your Discord community.</p>
        <div className="heroBtns"><a className="btn primary" href={invite} target="_blank" rel="noreferrer">Invite ZENTRO ↗</a><a className="btn soft" href="/api/auth/discord">◈ Login with Discord</a></div>
        <p className="tiny">✦ Simple to use · Made for Discord communities</p>
      </div>
      <div className="preview"><div className="previewTop"><span>ZENTRO overview</span><span className="pill">● READY TO CONNECT</span></div>
        <div className="botCard"><div style={{fontSize:12,opacity:.8}}>YOUR DISCORD ASSISTANT</div><div className="botName">◈ ZENTRO Bot</div><div style={{fontSize:12,opacity:.85,marginTop:5}}>A smarter home for your community.</div></div>
        <div className="stats"><div className="stat"><b>24/7</b><small>Community tools</small></div><div className="stat"><b>Easy</b><small>To use</small></div><div className="stat"><b>Clean</b><small>Embeds</small></div></div>
      </div>
    </div></section>
    <section id="features"><div className="wrap"><div className="sectionHead"><div className="kicker">WHAT ZENTRO BRINGS</div><h2>Everything in one place.</h2><p>Helpful tools wrapped in a simple experience for members and server owners.</p></div>
      <div className="features"><article className="feature"><div className="featureIcon">⌘</div><h3>Useful Commands</h3><p>Quick commands to make everyday server tasks easier. Update the sample commands with your bot's real commands.</p></article>
      <article className="feature"><div className="featureIcon">▤</div><h3>Embed Builder</h3><p>A clean place to create and preview Discord embed layouts.</p></article>
      <article className="feature"><div className="featureIcon">◈</div><h3>Discord Login</h3><p>Sign in securely with Discord and view your profile and server list.</p></article></div>
    </div></section>
    <section className="commandSection" id="commands"><div className="wrap"><div className="sectionHead"><div className="kicker">COMMAND CENTER</div><h2>Meet the commands.</h2><p>Example commands — replace these with the exact commands your bot supports.</p></div>
      <div className="commands"><div className="command"><code>/help</code><span>View available commands</span></div><div className="command"><code>/ping</code><span>Check bot response</span></div><div className="command"><code>/embed</code><span>Create an embed</span></div><div className="command"><code>/about</code><span>Learn about ZENTRO</span></div></div>
    </div></section>
    <section id="support"><div className="wrap cta"><div><h2>Ready to upgrade your Discord?</h2><p>Bring ZENTRO into your community and explore its tools.</p></div><a className="btn" href={support} target="_blank" rel="noreferrer">Join Support Server ↗</a></div></section>
    <footer><div className="wrap footerInner"><span>© {new Date().getFullYear()} ZENTRO. Built for Discord communities.</span><span>White × Purple · Discord Bot</span></div></footer>
  </main>;
}
