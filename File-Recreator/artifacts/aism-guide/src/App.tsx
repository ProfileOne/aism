import { useState, useRef, useEffect, ReactNode } from 'react';
import './index.css';

/* ─── Login Screen ─────────────────────────────────── */
function LoginScreen() {
  const [loginType, setLoginType] = useState<'delegate' | 'admin'>('delegate');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Delegate form state
  const [portfolio, setPortfolio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  // Admin form state
  const [masterId, setMasterId] = useState('');
  const [password, setPassword] = useState('');

  const handleDelegateLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login/delegate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio, phoneNumber, email }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/aism/';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masterId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/aism/';
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)', padding: '20px' }}>
      <div className="hazard" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}></div>
      
      <div style={{ maxWidth: '480px', width: '100%', marginTop: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="display" style={{ fontSize: '32px', marginBottom: '10px' }}>AAWAAZ 2.0</div>
          <div className="mono" style={{ fontSize: '12px', color: 'var(--grey)' }}>ALL INDIA STAKEHOLDER'S MEET</div>
        </div>

        <div className="block" style={{ padding: '40px', border: '3px solid var(--black)', background: 'var(--white)' }}>
          {loginType === 'delegate' ? (
            <>
              <h2 className="display" style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>Delegate Login</h2>
              
              <form onSubmit={handleDelegateLogin}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Portfolio *
                  </label>
                  <input
                    type="text"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--black)',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      background: 'var(--white)',
                    }}
                    placeholder="Enter your portfolio"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--black)',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      background: 'var(--white)',
                    }}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--black)',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      background: 'var(--white)',
                    }}
                    placeholder="Enter your email (optional)"
                  />
                </div>

                {error && (
                  <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--red)', color: 'var(--white)', fontSize: '14px', border: '2px solid var(--black)' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-register"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '14px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? 'Authenticating...' : 'ENTER PORTAL'}
                </button>
              </form>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setLoginType('admin')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--grey)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Admin Login
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => window.location.href = '/aism/?bypass=true'}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--orange)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    marginTop: '15px',
                  }}
                >
                  [UI TEST BYPASS]
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="display" style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'center' }}>Admin Login</h2>
              
              <form onSubmit={handleAdminLogin}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Master ID *
                  </label>
                  <input
                    type="text"
                    value={masterId}
                    onChange={(e) => setMasterId(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--black)',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      background: 'var(--white)',
                    }}
                    placeholder="Enter master ID"
                  />
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--black)',
                      fontFamily: 'inherit',
                      fontSize: '16px',
                      background: 'var(--white)',
                    }}
                    placeholder="Enter password"
                  />
                </div>

                {error && (
                  <div style={{ marginBottom: '20px', padding: '12px', background: 'var(--red)', color: 'var(--white)', fontSize: '14px', border: '2px solid var(--black)' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-register"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '14px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? 'Authenticating...' : 'LOGIN'}
                </button>
              </form>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => setLoginType('delegate')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--grey)',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  ← Back to Delegate Login
                </button>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--grey)', fontFamily: 'IBM Plex Mono, monospace' }}>
            © 2026 THE INDIAN SUMMIT FOUNDATION
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared: Tab Group ──────────────────────────── */
interface TabItem { id: string; label: string }
function Tabs({ tabs, panels }: { tabs: TabItem[]; panels: Record<string, ReactNode> }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <>
      <div className="tabbar" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            className={'tabbtn' + (active === t.id ? ' active' : '')}
            onClick={() => setActive(t.id)}
            style={i === tabs.length - 1 ? { borderRight: 'none' } : {}}
          >{t.label}</button>
        ))}
      </div>
      {tabs.map(t => (
        <div key={t.id} className={'tabpanel' + (active === t.id ? ' active' : '')} id={t.id}>
          {panels[t.id]}
        </div>
      ))}
    </>
  );
}

/* ─── Shared: Accordion (simple string body) ─────── */
interface AccItemProps { name: string; desc?: string; label: string; example: string; open: boolean; onToggle: () => void }
function AccItem({ name, desc, label, example, open, onToggle }: AccItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bodyRef.current) return;
    bodyRef.current.style.maxHeight = open ? bodyRef.current.scrollHeight + 'px' : '0';
  }, [open]);
  return (
    <div className={'acc-item' + (open ? ' open' : '')}>
      <button className="acc-head" onClick={onToggle}>
        <span className="fw-name">{name}</span>
        {desc && <span className="fw-desc">{desc}</span>}
        <span className="acc-plus">+</span>
      </button>
      <div className="acc-body" ref={bodyRef}>
        <div className="acc-body-inner">
          <div className="label">{label}</div>
          <p className="acc-example">{example}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared: Accordion (rich JSX body) ─────────── */
interface RichAccItemProps { name: string; desc?: string; open: boolean; onToggle: () => void; children: ReactNode }
function RichAccItem({ name, desc, open, onToggle, children }: RichAccItemProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      bodyRef.current.style.maxHeight = bodyRef.current.scrollHeight + 'px';
    } else {
      bodyRef.current.style.maxHeight = '0';
    }
  }, [open]);
  return (
    <div className={'acc-item' + (open ? ' open' : '')}>
      <button className="acc-head" onClick={onToggle}>
        <span className="fw-name">{name}</span>
        {desc && <span className="fw-desc">{desc}</span>}
        <span className="acc-plus">+</span>
      </button>
      <div className="acc-body" ref={bodyRef}>
        <div className="acc-body-inner">{children}</div>
      </div>
    </div>
  );
}

/* ─── RoPs Guide ─────────────────────────────────── */
function RopsGuide() {
  const [openAcc, setOpenAcc] = useState<number>(0);
  const toggle = (i: number) => setOpenAcc(p => p === i ? -1 : i);
  const frameworks = [
    {
      name: 'Premise → Analysis → Example',
      desc: 'State the core premise, stress-test it, ground it in precedent.',
      label: 'EXAMPLE — SAFE HARBOR & CENSORSHIP',
      example: '"Our premise is that Section 79 Safe Harbor is non-negotiable. Analysis: forcing platforms to pre-screen content turns every intermediary into a private censor. Example: in Shreya Singhal, the Court held that intermediaries should act on lawful orders — not unilateral judgment."',
    },
    {
      name: 'Problem → Solution → Benefits',
      desc: 'Quantify the problem, propose one mechanism, name who gains.',
      label: 'EXAMPLE — SYNTHETIC MEDIA REGULATION',
      example: '"The problem: synthetic media outpaces our 72-hour takedown window. Solution: mandatory cryptographic provenance tags under the 2026 IT Rules. Benefits: the state gets traceability, citizens get protection, platforms keep Safe Harbor through automated compliance — one mechanism, three wins."',
    },
    {
      name: 'Past → Present → Future',
      desc: 'Use precedent to frame the present failure, then project forward.',
      label: 'EXAMPLE — PLATFORM LIABILITY',
      example: '"In the past, liability law assumed a handful of publishers. Today, one platform hosts more speech in an hour than a newsroom did in a decade — yet we\'re still applying 1990s intermediary rules to a 2026 information system. Left unchanged, that gap only widens."',
    },
    {
      name: 'What → So What → Now What',
      desc: 'Define the issue precisely, establish the stakes, demand action.',
      label: 'EXAMPLE — MISINFORMATION VELOCITY',
      example: '"What: false claims now outpace verified corrections by a factor of six. So what: this isn\'t a content problem, it\'s an institutional trust problem. Now what: this committee needs a directive mandating real-time correction-labeling for any post crossing a defined virality threshold."',
    },
  ];
  return (
    <>
      {/* HERO */}
      <section className="hero" id="rops-top">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">PROCEDURAL BRIEF · FILE NO. AISM/26</span>
            <h1 className="display">All India<br />Stakeholder's<br />Meet</h1>
            <p className="hero-lede">
              Digital governance, misinformation, and the limits of free expression don't get settled by diplomatic
              niceties. AISM runs on{' '}
              <mark>portfolios, leverage, and coalitions</mark>{' '}
              — not flags and formal protocol. This is the file on how it actually works.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'flex-start' }}>
            <span className="stamp">EB RULING<br />CANNOT BE APPEALED</span>
            <div className="quote-block">
              Success here isn't a geographical bloc. It's an unlikely cross-sector coalition that forces a
              directive through a fractured room.
            </div>
          </div>
        </div>
      </section>

      {/* 01 DISTINCTION */}
      <section id="distinction">
        <span className="eyebrow orange">01 · CONTEXT</span>
        <h2 className="display">What Makes AISM<br />Different</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          AISM dismantles the standard Model UN format on purpose. You don't arrive as a sovereign nation with a
          general foreign policy. You arrive as one entity inside India's socio-political fabric — a ministry
          bureaucrat, a tech executive, a creator, an advocate — with a narrow set of interests to protect.
        </p>
        <div className="feature-grid">
          <div className="block fill-black span-3 tilt">
            <h4><span className="icon-mark">◆</span> PORTFOLIO, NOT FLAG</h4>
            <p>Your identity is your portfolio — a ministry, a platform, a movement. Every speech, vote, and
            alliance has to trace back to that portfolio's actual interests and constraints.</p>
          </div>
          <div className="block span-3">
            <h4><span className="icon-mark">§</span> FLUID RULES</h4>
            <p>There's no fixed constitutional script. The Executive Board writes and rewrites the Rules of
            Procedure to fit the crisis at hand. Their ruling is final.</p>
          </div>
          <div className="block fill-red span-4">
            <h4><span className="icon-mark">⛓</span> COALITIONS OVER BLOCS</h4>
            <p>Directives don't pass on argument alone. They pass when portfolios with nothing obvious in common
            find a shared stake and hold the line together.</p>
          </div>
          <div className="block fill-orange span-2">
            <h4><span className="icon-mark">✦</span> NO SCRIPTS</h4>
            <p>The Board has read every brief in the room. What they haven't read is your specific take.</p>
          </div>
        </div>
      </section>

      <div className="halftone"></div>

      {/* 02 PROCEDURE */}
      <section id="procedure">
        <span className="eyebrow">02 · OPERATIONAL PROCEDURE</span>
        <h2 className="display">Running The Room</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          Every session, motion, and document you'll touch — from the opening statement to a signed directive.
        </p>
        <Tabs
          tabs={[{ id: 'r-t1', label: 'Sessions' }, { id: 'r-t2', label: 'Caucusing' }, { id: 'r-t3', label: 'Documents' }]}
          panels={{
            'r-t1': (
              <div className="panel-inner">
                <div>
                  <div className="rule-item"><h5>Attendance &amp; Opening Statements</h5><p>The Board calls the roll, then each portfolio states its core position on the day's regulatory question. Give the room direction across the whole issue — not one narrow talking point.</p></div>
                  <div className="rule-item"><h5>Public Session</h5><p>On the record, in view of press and observers. Every line is subject to public critique. Rules of Procedure are enforced strictly here.</p></div>
                </div>
                <div>
                  <div className="rule-item"><h5>Private Session</h5><p>Fully off the record. Used to negotiate real positions candidly, build backroom alliances, or say the thing you can't say in public.</p></div>
                  <div className="rule-item"><h5>Closing the Floor</h5><p>The Board yields the floor back after every speech and directs the room to questions. Nothing is assumed — every transition is called.</p></div>
                </div>
              </div>
            ),
            'r-t2': (
              <div className="panel-inner">
                <div><div className="rule-item"><h5>Moderated Caucus</h5><p>Formal debate, run from the speakers' list. Attack the policy and the portfolio's position — never the delegate.</p></div></div>
                <div><div className="rule-item"><h5>Unmoderated Caucus</h5><p>Delegates stay in the room. A motion needs a stated duration and reason, passes by simple majority, and the Board can shorten it or rule it out of order without appeal. This is where directives actually get drafted.</p></div></div>
              </div>
            ),
            'r-t3': (
              <div className="panel-inner">
                <div><div className="rule-item"><h5>Directive</h5><p>AISM's equivalent of a resolution — a concrete regulatory action, structured into Context Clauses and Action Clauses, needing a minimum number of sponsors set by the dais.</p></div></div>
                <div><div className="rule-item"><h5>Joint Communiqué</h5><p>A non-binding statement of shared intent between two or more portfolios. Signals an alliance without committing to a full Directive. Requires dais approval to enter the record.</p></div></div>
              </div>
            ),
          }}
        />
      </section>

      {/* 03 POINTS & CHITS */}
      <section id="points">
        <span className="eyebrow black">03 · INTERVENTIONS</span>
        <h2 className="display">Points &amp; Chits</h2>
        <Tabs
          tabs={[{ id: 'r-p1', label: 'Points' }, { id: 'r-p2', label: 'Chits' }]}
          panels={{
            'r-p1': (
              <div className="panel-inner">
                <div>
                  <div className="rule-item"><h5>Point of Personal Privilege</h5><p>Rise if something impairs your ability to participate. Can interrupt a speaker only if they're inaudible — otherwise wait for the speech to end.</p></div>
                  <div className="rule-item"><h5>Point of Order</h5><p>Rise to challenge a factual error in a speech. Quote the incorrect statement, then state the correct fact. Cannot interrupt.</p></div>
                  <div className="rule-item"><h5>Point of Parliamentary Inquiry</h5><p>Ask the Board to clarify a rule or procedural step. Cannot interrupt a speaker.</p></div>
                </div>
                <div>
                  <div className="rule-item"><h5>Point of Information (POI)</h5><p>Question or challenge the speaker after their speech ends. Best delegates use a POI to dismantle the argument with a sharp fact or precedent, then request a follow-up if unsatisfied.</p></div>
                  <div className="rule-item"><h5>Right of Reply</h5><p>Rise if your personal integrity — not your portfolio's position — was directly attacked. Must be raised immediately after the speech ends. The Board's ruling is final.</p></div>
                </div>
              </div>
            ),
            'r-p2': (
              <div className="panel-inner">
                <div><div className="rule-item"><h5>1 · Formal Chit to the Board</h5><p>Addressed directly to the EB. Use for analysis or points you want considered for your scoring, or content that ran over your speaking time.</p></div></div>
                <div>
                  <div className="rule-item"><h5>2 · Delegate-to-Delegate</h5><p>Exchanged directly, no Board involvement. The primary tool for lobbying and building cross-sector consensus — no fixed format required.</p></div>
                  <div className="rule-item"><h5>3 · Chit via the Board</h5><p>Addressed to another delegate but routed through the EB, who reads it before forwarding. Used for formal written Points of Information.</p></div>
                </div>
              </div>
            ),
          }}
        />
      </section>

      <div className="hazard red" style={{ margin: '0' }}></div>

      {/* 04 STRATEGY */}
      <section id="strategy">
        <span className="eyebrow orange">04 · STAKEHOLDER STRATEGY</span>
        <h2 className="display">Representing Your<br />Portfolio Well</h2>
        <div className="rep-grid">
          <div className="rep-item rep-a"><span className="bignum">01</span><h4>Know Your Bottom Line</h4><p>Before you research the agenda, understand your portfolio's brief. Your position has to be defensible against your own strategic vulnerabilities — not just factually accurate.</p></div>
          <div className="rep-item rep-b"><span className="bignum">02</span><h4>Seek Precedent</h4><p>Whatever action you propose has to survive scrutiny. Ground arguments in real regulatory precedent and prior rulings — not assertion.</p></div>
          <div className="rep-item rep-c"><span className="bignum">03</span><h4>Know When to Break the Line</h4><p>The strongest delegates aren't mouthpieces. If a better solution sits slightly outside your portfolio's default position, argue for it — and explain the logic to the Board.</p></div>
          <div className="rep-item rep-d"><span className="bignum">04</span><h4>Original Analysis, Not Copied Positions</h4><p>The Board has read every portfolio brief in the room. What they haven't read is your specific take on this specific regulatory question. Before every speech, ask: could any other delegate holding my portfolio give this exact argument? If yes — push further.</p></div>
        </div>
      </section>

      {/* 05 FRAMEWORKS */}
      <section id="frameworks" style={{ borderBottom: 'none' }}>
        <span className="eyebrow">05 · RHETORICAL FRAMEWORKS</span>
        <h2 className="display">Speech Frameworks</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          Four structures, each worked through on the same live issue: <em>regulating synthetic media and
          content moderation</em>. Pick the shape that fits your argument — fill it with original analysis, not
          recited fact.
        </p>
        <div className="accordion">
          {frameworks.map((item, i) => (
            <AccItem key={i} name={item.name} desc={item.desc} label={item.label} example={item.example} open={openAcc === i} onToggle={() => toggle(i)} />
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── Background Guide ───────────────────────────── */
function BackgroundGuide() {
  const [openCase, setOpenCase] = useState<number>(-1);
  const toggleCase = (i: number) => setOpenCase(p => p === i ? -1 : i);

  const cases = [
    {
      name: 'Shreya Singhal v. Union of India',
      desc: '2015 · Most important digital rights case in Indian history',
      summary: [
        { heading: 'What Happened', text: 'The Court evaluated the Information Technology Act, 2000, specifically examining state censorship powers versus free speech. Multiple petitions challenged Section 66A, which criminalised sending "offensive" messages online.' },
        { heading: 'Striking Down Section 66A', text: 'The court struck down Section 66A as unconstitutionally vague. They held that the term "offensive" is so wide that the drafters cannot possibly define it — the very nature of such a law makes people refrain from their legitimate rights under the Constitution, creating a chilling effect on freedom of speech and expression.' },
        { heading: 'Upholding Section 69A', text: 'On the other hand, the Court did not strike down the government\'s power to block a site altogether (Section 69A). It upheld the order because it is reasonable with an appropriate process: the request for blocking must be approved by a high-level committee, include written findings, and include a hearing of the content creator, if possible.' },
        { heading: 'The Safe Harbor Ruling (Section 79)', text: 'The Court read down Section 79(3)(b) and said that an intermediary (social media) could lose the Safe Harbor exemption only if it failed "to remove or disable access to the content upon receipt of a court order or upon receipt of a notification from a specified government agency." This implies that a social media platform cannot act unilaterally to decide whether a particular communication is illegal based merely on a report by a random user.' },
      ],
      takeaways: [
        'Struck down Section 66A as unconstitutionally vague — "offensive" was too broad, creating a chilling effect on free speech.',
        'Upheld Section 69A (government site-blocking power) as it requires high-level committee approval, written findings, and a hearing.',
        'Safe Harbor (Section 79): intermediaries only lose protection if they fail to act on a court order or government notification — not user complaints.',
        'Platforms cannot unilaterally decide what is illegal based merely on a report by a random user.',
      ],
      questions: [
        'If your platform removes content in response to user complaints, are you not already going beyond what the law requires and becoming a private censor?',
        'Does the risk of being held liable for user content outweigh the protection of Section 79?',
        'Should intermediaries be required to make public how many takedowns were in response to court orders versus private complaints (e.g. Sahyog)?',
        'If platforms are already "over-complying" with the law to avoid liability, is Section 79 not already failing its purpose?',
      ],
    },
    {
      name: 'Pravasi Bhalai Sangathan v. Union of India',
      desc: '2014 · Foundational hate speech jurisprudence',
      summary: [
        { heading: 'What Happened', text: 'The issue of political hate speech was taken up by a Public Interest Litigation that sought to have guidelines framed by the Court to counter such speeches — primarily targeting inflammatory statements by politicians during elections and communally sensitive periods.' },
        { heading: 'The Court\'s Response', text: 'The Supreme Court declined to legislate, citing the separation of powers, but provided a foundational passage for current jurisprudence on the subject. According to the Court, hate speech harms the dignity of the targeted group(s) and makes way for a climate in which discrimination and violence can occur.' },
        { heading: 'The Law Commission Referral', text: 'The Court directed the Law Commission to draft a report on the subject. This led to Law Commission Report 267 (2017), which recommended adding specific hate speech provisions to the IPC. These recommendations have been pending for nearly a decade and have never been passed by Parliament.' },
      ],
      takeaways: [
        'Working definition of hate speech: speech that causes discrimination or violence towards a group based on identity.',
        'The Court declined to legislate, citing separation of powers, and tasked the Law Commission with drafting legislation.',
        'The 267th Law Commission Report (2017) is currently the closest thing India has to hate speech legislation — still unpassed.',
        'The Court views hate speech as a societal ill, not just an offence against individuals.',
      ],
      questions: [
        'If the Court\'s working definition of hate speech is based on discrimination and violence, why are FIRs not being filed in cases of individual discrimination or violence?',
        'The recommendations of the 267th Law Commission Report have been pending for nearly a decade — whose fault is this?',
        'Is it not the responsibility of this committee to draft legislation, as the Court has asked, or is it outside our jurisdiction?',
        'Does not the Court\'s definition of hate speech as a societal ill render it unenforceable against individuals?',
      ],
    },
    {
      name: 'Amish Devgan v. Union of India',
      desc: '2021 · Context, audience, and prestige in hate speech',
      summary: [
        { heading: 'What Happened', text: 'TV anchor Amish Devgan made derogatory comments about revered Sufi saint Khwaja Moinuddin Chishti on live TV, which led to multiple FIRs being filed in various states. Devgan petitioned to cancel the FIRs, arguing context and intent.' },
        { heading: 'The Court\'s Ruling', text: 'The Court denied his request to cancel the FIRs. It established a three-part contextual test for evaluating speech: (1) "Who" is speaking — a "person of influence" such as a TV commentator or elected representative has more legal weight and responsibility than an ordinary citizen; (2) "What" is being said — the content and its historical context; (3) The "Audience" — who is listening.' },
        { heading: 'The Marginalized Communities Principle', text: 'Moreover, the Court held that the speech of the historically oppressed saying what they want is more constitutionally protected than the speeches of the oppressors. This created an asymmetric protection framework that is highly contested in application.' },
      ],
      takeaways: [
        'Context is key — the same words directed at different audiences, by different people, with different intent, may have different consequences.',
        'A person of "prestige" (politician, celebrity, media personality) has greater responsibility than an ordinary citizen.',
        'Marginalized communities have more leeway to speak about their lived experience.',
        'The Court refused to quash the FIR, arguing context could aggravate an offence rather than mitigate it.',
      ],
      questions: [
        'Should not a comedian with 10 million YouTube subscribers be held to a higher standard than an anonymous Twitter account with 50 followers?',
        'If marginalized communities have greater leeway, how can platforms apply this standard consistently?',
        'Is not the "who is speaking" test inherently discriminatory — could it not be used to suppress critics of the government?',
        'Who decides who belongs to a "prestigious" profession, and who decides which communities are "marginalized"?',
      ],
    },
    {
      name: 'Patricia Mukhim v. State of Meghalaya',
      desc: '2021 · Criticism of government ≠ hate speech',
      summary: [
        { heading: 'What Happened', text: 'Journalist Patricia Mukhim criticised the Meghalaya Chief Minister and police for not taking action against non-tribal youths who were beaten up by tribals. She was booked under charges of promoting enmity and giving false information to the police.' },
        { heading: 'The Court\'s Ruling', text: 'The Supreme Court dismissed the FIR completely. The Apex Court held that "the fervent plea made by the Appellant for protection of non-tribals as also his criticism of the attitude of the concerned authorities cannot, by any stretch of imagination, be viewed as containing any hate speech."' },
        { heading: 'Significance', text: 'The Court ruling shows that asking authorities to take cognizance of a problem cannot be termed hate speech just because it makes authorities uncomfortable. This is one of the few cases in this list where the Court ruled in favor of free speech and against a state FIR, and openly acknowledged that FIRs are often used to suppress legitimate criticism.' },
      ],
      takeaways: [
        'Criticism of the government\'s inaction does not constitute hate speech, even if it indirectly criticizes a group.',
        'The Court ruled in favor of a "call for justice," not an "attack on a community."',
        'One of the few cases where the Court ruled in favor of free speech and against a state FIR.',
        'The Court acknowledged that FIRs are often used to suppress legitimate criticism of the government.',
      ],
      questions: [
        'If criticism of the government\'s inaction does not constitute hate speech, why are journalists and creators still being booked for FIRs?',
        'Is there not a difference between "calling out" a community\'s inaction and "attacking" a community?',
        'Should this not set a higher standard for police FIRs, since they are often used to suppress criticism?',
        'Does not this ruling contradict Amish Devgan? Does not the "call for justice" fall under the same context test?',
      ],
    },
    {
      name: 'Kaushal Kishor v. State of U.P.',
      desc: '2023 · Horizontal application of fundamental rights',
      summary: [
        { heading: 'What Happened', text: 'Decided in January 2023, this is a landmark judgment which significantly amends the very foundation of the Constitution. For decades, it was held that only the Government (State) could be sued for violating fundamental rights enshrined in Part III of the Constitution.' },
        { heading: 'The Ruling', text: 'This ruling by the Constitution Bench of the Supreme Court (4:1 majority) provides that Fundamental Rights (Articles 19 and 21) can be enforced against private and non-state bodies — horizontally — as well. Therefore, a major Tech Corporation could be directly (not vicariously) accountable for free speech violation of an Indian citizen.' },
        { heading: 'The Minister\'s Speech Clarification', text: 'The ruling also clarifies that the free speech of a Minister cannot be attributed to the Government, answering the opposite side of the question — the State cannot be held responsible for the personal statements of its ministers.' },
      ],
      takeaways: [
        'Enforcement of fundamental rights (Articles 19 and 21) now extends to private bodies — not just the State.',
        'This could have massive implications for regulating Big Tech directly.',
        'A Minister\'s personal speech cannot be attributed to the government.',
        'The ruling was made by a 4:1 majority — it is not universally accepted.',
      ],
      questions: [
        'If citizens can now enforce fundamental rights against private companies, should not Big Tech be held to account for their actions?',
        'Could this not lead to weaponization — ordinary citizens suing platforms for every moderation decision?',
        'If a Minister\'s personal speech cannot be attributed to the government, does not the government evade responsibility?',
        'Could this ruling lead to a flood of litigation against Big Tech and the government?',
      ],
    },
    {
      name: 'Ranveer Allahbadia v. Union of India',
      desc: '2025 · Content regulation by bail condition',
      summary: [
        { heading: 'What Happened', text: 'In February 2025, videos of comedian Samay Raina\'s YouTube show "India\'s Got Latent" went viral for featuring Ranveer Allahbadia (BeerBiceps) making sexually suggestive remarks about parents. FIRs were filed in Guwahati and Mumbai citing BNS obscenity provisions, the Cinematograph Act, and the Indecent Representation of Women Act (IRWA).' },
        { heading: 'The Prior Restraint', text: 'On 18 February 2025, the Supreme Court ordered interim protection for Allahbadia against arrest, but imposed a "prior restraint": Allahbadia and the accused could not post new content until the court decides on their future. The Court called their content a sign of a "perverted mind." The ban was relaxed in March 2025 on "livelihood" grounds — he provides for 280 employees.' },
        { heading: 'The Vacuum in Law', text: 'The court itself expressed that there was a "vacuum in law" related to digital content. Two days later, the MIB issued a very aggressive advisory to OTT platforms. The case went back to court in mid-2026 when the court directed Samay Raina to pay ₹3 lakh as compensation for not withdrawing remarks directed at a person living with Spinal Muscular Atrophy.' },
      ],
      takeaways: [
        'The Court used a bail condition to effectively regulate content — banning all future content by Allahbadia.',
        'The Court acknowledged a "vacuum in law" for regulating digital content — this led to MIB\'s OTT advisory two days later.',
        'The restriction was later modified on grounds of livelihood (280 employees depend on his show).',
        'The case was cited again in 2026 when Samay Raina was fined ₹3 lakh for not following the Court\'s orders.',
      ],
      questions: [
        'Is regulation by way of a bail condition not an unpredictable and subjective standard?',
        'If the Court acknowledges a "vacuum in law," should not Parliament act to fill it?',
        'Does not the modification on grounds of livelihood set a dangerous precedent?',
        'Does not the 2026 contempt ruling show that the Court can enforce its own orders?',
      ],
    },
    {
      name: 'Ashwini Kumar Upadhyay v. State of NCT of Delhi',
      desc: 'April 2026 · End of proactive judicial intervention era',
      summary: [
        { heading: 'Background', text: 'During 2022–24, the Supreme Court was very active in directing police to file suo-moto FIRs against hate speech and in directing the monitoring of rallies. Activists filed thirteen clubbed writ petitions to get a continuing mandamus to the police to act proactively. One petition sought prosecution of BJP leaders Anurag Thakur and Parvesh Verma for speeches in 2020 before the Delhi riots.' },
        { heading: 'The Doctrinal Shift', text: 'Justices Vikram Nath and Sandeep Mehta gave a very important doctrinal shift: the law was not silent in this area, IPC/BNS provisions (153A and 295A) were not insufficient, and the Court should not be in the business of creating new guidelines. The Court said it would not entertain contempt proceedings against the police for not registering FIRs suo-moto.' },
        { heading: 'The Outcome', text: 'The Court upheld the acquittal of Anurag Thakur and Parvesh Verma as no cognizable offence was made out. Citizens must first approach the police. This ruling is the most relevant for this committee — it was made just months ago and effectively ends the era of proactive judicial intervention (2022–2024).' },
        { heading: 'Strategic Implication', text: 'The Government and Bureaucrat blocs can use this to kill any future attempts to create new broad speech laws — they simply argue that the Supreme Court is satisfied with the current laws and it\'s an issue of enforcement, not legislation.' },
      ],
      takeaways: [
        'The Supreme Court ruled there is no legislative vacuum — existing laws (153A, 295A, BNS) are sufficient to deal with hate speech.',
        'The Court ruled against holding police in contempt of court for not registering FIRs suo-moto.',
        'This brings to an end the era of proactive judiciary intervention (2022–2024).',
        'Politicians Anurag Thakur and Parvesh Verma evaded action due to the Court\'s "no cognizable offence" ruling.',
        'This ruling is the most relevant for this committee — it was made just months ago.',
      ],
      questions: [
        'If the Supreme Court ruled there is no legislative vacuum, on what grounds can any member of this committee argue otherwise?',
        'Does not the Court\'s "approach police first" policy ignore the fact that police inaction is the problem?',
        'Does not this ruling effectively bury the issue of hate speech for the next decade?',
        'Can the government bloc use this to kill any future attempts to create new broad speech laws?',
      ],
    },
    {
      name: 'X Corp v. Union of India',
      desc: 'September 2025 · Karnataka HC — Sahyog Portal & foreign entities',
      summary: [
        { heading: 'What Happened', text: 'The Government created a centralized "Sahyog Portal" to allow faster takedown notices from courts to platforms directly from the government, which circumvents the Section 69A blocking orders due process and secrecy protections. X Corp (Twitter) filed a suit against the portal challenging its legality after receiving takedown requests from the Railway Ministry, which was investigating a stampede that resulted in deaths at a New Delhi railway station.' },
        { heading: 'The Ruling', text: 'On September 24, 2025, Justice M. Nagaprasanna ruled in favor of the Sahyog Portal. The Judge concluded that Section 69A and 79(3)(b) are completely different. The Judge held that foreign multinational corporations are "artificial juristic entities" which do not possess the Article 19 rights in India — "a charter of rights conferred upon citizens only" — and that social media "cannot be left in a state of anarchic freedom."' },
        { heading: 'Current Status', text: 'X Corp filed a writ appeal on 14th November 2025, which is pending before a Division Bench. As of now, foreign tech giants face an insurmountable litigation hurdle in Indian courts. This ruling is a major blow to all Big Tech platforms operating in India, as it strips them of constitutional protections available to Indian citizens.' },
      ],
      takeaways: [
        'A foreign entity cannot claim the protection of Article 19 in India.',
        'The Sahyog Portal, which routes takedown requests through Section 79(3)(b) rather than Section 69A, was ruled to be legal.',
        'The Court ruled that social media cannot be "left to the anarchic freedom of the marketplace of ideas."',
        'X Corp\'s appeal is currently pending before a Division Bench — this is not the final ruling.',
      ],
      questions: [
        'If foreign entities cannot claim the protection of Article 19, can they be ordered to remove content without following due process?',
        'Does not the use of Sahyog Portal to route takedown requests through Section 79(3)(b) bypass the protections of Section 69A?',
        'Should not citizens\' rights to free speech be protected even if the entity hosting their content cannot claim those rights?',
        'Is not the entire basis of Section 79(3)(b) — and therefore of the Sahyog Portal — the "anarchic freedom" of the marketplace of ideas?',
      ],
    },
  ];

  const stakeholders = [
    {
      bloc: 'Senior Government Officials',
      role: 'PM, Home Ministry',
      objectives: 'Preservation of national security. Stopping coordinated deepfake campaigns. Forcing foreign tech giants to respect domestic sovereignty.',
      vulnerabilities: 'The highly public judicial defeat of the Fact-Check Unit (FCU); global accusations of "democratic backsliding."',
      strategy: 'Push for adoption of the 3-hour takedown rules. Leverage national security to justify breaking E2EE encryption for traceability as per Rule 4(2).',
      color: 'fill-black',
    },
    {
      bloc: 'Ministry Bureaucrats',
      role: 'MeitY, MIB, I4C',
      objectives: 'Ensuring flawless procedural compliance. Defending the state\'s operational infrastructure (Sahyog Portal).',
      vulnerabilities: 'The massive administrative backlog inside Grievance Appellate Committees (GACs).',
      strategy: 'Aim for blanket compliance with permanent metadata labeling of SGI. Cite X Corp (2025) to assert that platforms do not have Article 19 rights.',
      color: '',
    },
    {
      bloc: 'Social Media Influencers & Independent Creators',
      role: 'Content Creators, Digital Media',
      objectives: 'Uncompromising protection of Article 19(1)(a) free speech. Total opposition to Content Evaluation Committees (CECs).',
      vulnerabilities: 'Financial dependence on opaque Big Tech algorithms. Extreme susceptibility to cancel culture.',
      strategy: 'Cite Kunal Kamra (FCU) to the effect that censorship is anti-constitutional. Push for an independent self-regulatory organization by creators.',
      color: 'fill-orange',
    },
    {
      bloc: 'Entrepreneurs, Sharks & Big Tech',
      role: 'Platform Economy',
      objectives: 'Preservation of Section 79 Safe Harbor. Achieving regulatory certainty to keep venture capital flowing into India.',
      vulnerabilities: 'Public backlash over algorithmic bias and failing to stop deepfake scams. Crippled by the Karnataka HC ruling denying them Article 19 rights.',
      strategy: 'Use the privacy provisions of the DPDPA 2023 to resist decrypting private messages. Push for an EU-style risk-based approach as per the Data Integrity Act.',
      color: '',
    },
    {
      bloc: 'Bollywood Celebrities, Directors & Producers',
      role: 'Entertainment Industry',
      objectives: 'Stopping digital piracy, destroying algorithmic online boycotts (cancel culture), and preventing deepfake defamation.',
      vulnerabilities: 'High susceptibility to automated bot mobs. Historical fear of state censorship boards (CBFC).',
      strategy: 'Stand by the government on strict enforcement of the 2-hour takedown rules for deepfakes. Argue for vigorous use of BNS Section 356 to penalize online mobs.',
      color: 'fill-red',
    },
  ];

  const glossary = [
    { term: 'Algorithmic Amplification', def: 'The automated process by which a platform\'s algorithm promotes certain content to maximize user engagement. Can lead to an increase in polarizing content or content that spreads hate.' },
    { term: 'BNS', def: 'Bharatiya Nyaya Sanhita — the new criminal code that replaces the Indian Penal Code (IPC).' },
    { term: 'BNSS', def: 'Bharatiya Nagarik Suraksha Sanhita — the new criminal procedure code that replaces the CrPC.' },
    { term: 'CEC', def: 'Content Evaluation Committee — one of the proposed censorship mechanisms in the defunct 2024 Broadcasting Bill, vociferously opposed by independent content creators.' },
    { term: 'CIB', def: 'Coordinated Inauthentic Behavior — the practice of using multiple bots or fake accounts to push a coordinated narrative and deceive users about who is behind digital campaigns.' },
    { term: 'Digital India Act (DIA)', def: 'The proposed digital governance law that would replace the IT Act, 2000, and introduce new \'systemic risk\' categories akin to the EU\'s Digital Governance Act.' },
    { term: 'DPDPA', def: 'Digital Personal Data Protection Act, 2023 — India\'s new personal data protection law, which lays great emphasis on the principle of purpose limitation.' },
    { term: 'E2EE', def: 'End-to-End Encryption — a type of encryption where only the communicating parties can see the content of a message; the service provider cannot.' },
    { term: 'GAC', def: 'Grievance Appellate Committee — an appellate authority that hears appeals from users against the decisions of an intermediary. Set up by the Government for adjudicating complaints against digital platforms.' },
    { term: 'Horizontal Application of Rights', def: 'The principle — upheld in Kaushal Kishor v. State of U.P. (2023) — that fundamental rights guaranteed by the Constitution can be enforced against both the state and private entities.' },
    { term: 'Intermediary', def: 'Entities such as social media platforms that host or relay information on behalf of third parties.' },
    { term: 'OTT Platforms', def: 'Online streaming services distributed over the Internet, rather than through traditional television broadcasting (e.g. Netflix).' },
    { term: 'Safe Harbor (Section 79)', def: 'The legal shield provided to digital intermediaries protecting them against being sued for violations of law committed using their platforms. In exchange, intermediaries must take down content as required by law.' },
    { term: 'Sahyog Portal', def: 'The portal set up by I4C where law enforcement agencies can submit takedown requests to intermediaries directly, effectively bypassing the judicial process.' },
    { term: 'SSMI', def: 'Significant Social Media Intermediary — a classification under the IT (Amendment) Act, 2021, requiring platforms to comply with a special set of norms.' },
    { term: 'SGI', def: 'Synthetically Generated Information — as per Rule 2(wa) of the IT Rules 2026, any audio, video, or audio-visual content created using an algorithm and appearing to be human-created. Text is explicitly excluded.' },
    { term: 'Traceability (Rule 4(2))', def: 'A provision obliging encrypted messaging platforms to trace a message back to its originator upon receiving a court order. Highly debated in the context of encryption and privacy.' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="hero" id="bg-top">
        <div className="hero-grid">
          <div>
            <span className="eyebrow orange">BACKGROUND GUIDE · FILE NO. AISM/26</span>
            <h1 className="display">AISM<br />Background<br />Guide</h1>
            <p className="hero-lede">
              Regulating misinformation, hate speech, and content moderation while{' '}
              <mark>preserving freedom of expression</mark>{' '}
              — the most contested issue in Indian digital governance. This is your research foundation.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'flex-start' }}>
            <span className="stamp">INDIA'S LARGEST<br />CONNECTED DEMOCRACY</span>
            <div className="quote-block">
              Your portfolio is your brief, not your script. Know its politics, its prejudices, its power and its weaknesses.
            </div>
          </div>
        </div>
      </section>

      {/* EB NOTE */}
      <section id="bg-ebnote">
        <span className="eyebrow black">NOTE FROM THE EXECUTIVE BOARD</span>
        <h2 className="display">A Word Before<br />You Begin</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '32px', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '17px', color: '#2a2a26', marginBottom: '18px' }}>
              AISM is an unusual committee in that everyone is likely to be both right and wrong in equal measure — and it turns out that deciding which is which is not always easy.
            </p>
            <p style={{ fontSize: '17px', color: '#2a2a26', marginBottom: '18px' }}>
              We are not looking for delegates who can memorize and present exactly what their portfolio says. A search engine can do the first task and a megaphone the second. What we want is an understanding of <em>why</em> your stakeholder believes what it believes — what interests underpin its positions, its capabilities and constraints, and what dangers arise when its principles are taken to their logical conclusion.
            </p>
            <p style={{ fontSize: '17px', color: '#2a2a26' }}>
              This guide is deliberately brief. It is intended as a beginning, not an end. The biggest threat to a delegate's preparation is the illusion that the research is finished once the background guide has been read.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="block fill-black">
              <h4><span className="icon-mark">!</span> THE BOARD WILL LOOK FOR</h4>
              <p>Presence of mind. Analytical rigour. Political awareness. Strategic nous. Interrogate the obvious — question the conventional wisdom — ask the awkward questions.</p>
            </div>
            <div className="block" style={{ borderLeft: '6px solid var(--orange)', paddingLeft: '20px', boxShadow: 'none' }}>
              <p style={{ fontStyle: 'italic', fontSize: '16px' }}>"Public policy has a disturbing tendency to become more complicated the less one knows about it."</p>
              <p style={{ fontSize: '13px', marginTop: '10px', color: 'var(--grey)', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.05em' }}>— Vishwajeet Kachawah, Moderator</p>
            </div>
          </div>
        </div>
      </section>

      <div className="halftone"></div>

      {/* SECTION 1: OVERVIEW */}
      <section id="bg-overview">
        <span className="eyebrow">01 · COMMITTEE OVERVIEW</span>
        <h2 className="display">What Is AISM?</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          The All India Stakeholders Meet is a simulation of a multi-stakeholder deliberative forum in which delegates from governmental, political, media, digital, civil society and other agencies deliberate on matters of national significance.
        </p>
        <div className="feature-grid">
          <div className="block span-3">
            <h4><span className="icon-mark">◆</span> STAKEHOLDERS, NOT NATIONS</h4>
            <p>Unlike traditional MUN committees, delegates do not represent countries but a spectrum of stakeholders — a ministry bureaucrat, a tech executive, a creator, an advocate.</p>
          </div>
          <div className="block fill-red span-3">
            <h4><span className="icon-mark">§</span> UNCONVENTIONAL RoPs</h4>
            <p>AISM operates under Unconventional Rules of Procedure, as determined by the Executive Board, to promote robust debate, discussion, and negotiations between stakeholders.</p>
          </div>
          <div className="block fill-orange span-2">
            <h4><span className="icon-mark">⚡</span> PRAGMATIC SOLUTIONS</h4>
            <p>Delegates must keep their stakeholder's interests in mind and work towards evolving pragmatic and balanced solutions — not ideological purity.</p>
          </div>
          <div className="block fill-black span-4 tilt">
            <h4><span className="icon-mark">→</span> THE AGENDA</h4>
            <p>Regulating Misinformation, Hate Speech and Content Moderation while Preserving Freedom of Expression — one of the most pertinent issues of our times.</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE AGENDA */}
      <section id="bg-agenda">
        <span className="eyebrow orange">02 · THE AGENDA</span>
        <h2 className="display">Three Intersecting<br />Pillars</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          India is the world's largest connected democracy, with almost a billion Internet users. The digital space has become the new arena for political, economic, and social contestation. The committee's agenda revolves around three core tensions.
        </p>
        <div className="feature-grid" style={{ marginTop: '32px' }}>
          <div className="block fill-black span-2">
            <h4><span className="icon-mark">1</span> MISINFORMATION &amp; SYNTHETIC MEDIA</h4>
            <p>How does a democratic state control extremely realistic computer-generated "fake news" and "deepfakes" without the creation of a "Ministry of Truth" that dictates what is and is not real?</p>
          </div>
          <div className="block fill-red span-2">
            <h4><span className="icon-mark">2</span> HATE SPEECH &amp; ALGORITHMIC AMPLIFICATION</h4>
            <p>Colonial-era penal codes were written for physical mobs. How do we update these laws to regulate algorithmic amplification of hate speech, dog-whistling, and bots that circumvent definitions of incitement to violence?</p>
          </div>
          <div className="block fill-orange span-2">
            <h4><span className="icon-mark">3</span> CONTENT MODERATION &amp; INTERMEDIARY LIABILITY</h4>
            <p>Shouldn't massive digital platforms be treated as passive "post offices" entirely immune from liability (safe harbor), or as publishers held criminally responsible for unlawful content?</p>
          </div>
        </div>
      </section>

      <div className="hazard red" style={{ margin: '0' }}></div>

      {/* SECTION 3: CONSTITUTIONAL LAW */}
      <section id="bg-constitution">
        <span className="eyebrow">03 · CONSTITUTIONAL LAW</span>
        <h2 className="display">The Constitutional<br />Framework</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          Before you can discuss even one IT Rule or penal code, you have to know the Constitution of India. Whatever resolution or directions you propose must stand the test of constitutionality — if not, the Supreme Court will declare it void.
        </p>
        <div className="panel-inner" style={{ marginTop: '32px' }}>
          <div>
            <div className="block fill-black" style={{ marginBottom: '22px' }}>
              <h4><span className="icon-mark">19</span> ARTICLE 19(1)(A)</h4>
              <p>Guarantees all citizens the right to freedom of speech and expression — the cornerstone of Indian democracy. It is a qualified right, available to every citizen subject to reasonable restrictions under Article 19(2).</p>
            </div>
            <div className="rule-item">
              <h5>The Public Order Threshold</h5>
              <p>Courts have consistently held that 'public order' is not a synonym for 'law and order'. A ban on communication can only be imposed if a direct link between the communication and an imminent domestic disturbance is established.</p>
            </div>
            <div className="rule-item">
              <h5>The Misinformation Trap</h5>
              <p>"Fake news" or "falsity" is not explicitly mentioned in Article 19(2). Delegates arguing that the state has a right to fact-check sources of speech must provide sufficient evidentiary basis for why a particular instance of false speech falls under 19(2).</p>
            </div>
          </div>
          <div>
            <div className="rule-item">
              <h5>Grounds for Reasonable Restriction Under Article 19(2)</h5>
              <p style={{ marginBottom: 0 }}>
                {['Sovereignty and integrity of India', 'Security of the State', 'Friendly relations with foreign States', 'Public order', 'Decency or morality', 'Contempt of court', 'Defamation', 'Incitement to an offense'].map((g, i) => (
                  <span key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--red)', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>{String(i+1).padStart(2,'0')}</span>
                    <span>{g}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COURT CASES */}
      <section id="bg-cases">
        <span className="eyebrow black">04 · COURT CASES</span>
        <h2 className="display">Mandatory Precedents</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          To win a debate in this committee, you must cite case law. The Supreme Court is the ultimate referee, and understanding their historical rulings allows you to predict how they will rule on your committee's proposals.
        </p>
        <div className="accordion" style={{ marginTop: '34px' }}>
          {cases.map((c, i) => (
            <RichAccItem key={i} name={c.name} desc={c.desc} open={openCase === i} onToggle={() => toggleCase(i)}>
              {/* Case summary */}
              <div style={{ marginBottom: '28px' }}>
                <div className="label" style={{ marginBottom: '16px' }}>CASE SUMMARY</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
                  {c.summary.map((s, j) => (
                    <div key={j} style={{ background: 'var(--white)', border: '3px solid var(--black)', padding: '18px 20px', boxShadow: '4px 4px 0 var(--black)' }}>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px', fontWeight: 700 }}>{s.heading}</div>
                      <p style={{ fontSize: '14px', color: '#2a2a26', lineHeight: 1.65 }}>{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Takeaways + Questions */}
              <div className="panel-inner">
                <div>
                  <div className="label" style={{ marginBottom: '14px' }}>TAKEAWAYS</div>
                  {c.takeaways.map((t, j) => (
                    <div className="rule-item" key={j}><p>{t}</p></div>
                  ))}
                </div>
                <div>
                  <div className="label" style={{ marginBottom: '14px' }}>QUESTIONS TO RAISE</div>
                  {c.questions.map((q, j) => (
                    <div className="rule-item" key={j} style={{ borderLeftColor: 'var(--orange)' }}><p style={{ fontSize: '14px', color: '#2a2a26', fontStyle: 'italic' }}>{q}</p></div>
                  ))}
                </div>
              </div>
            </RichAccItem>
          ))}
        </div>
      </section>

      <div className="halftone"></div>

      {/* SECTION 5: STATUTORY BODIES */}
      <section id="bg-statutes">
        <span className="eyebrow orange">05 · STATUTORY BODIES</span>
        <h2 className="display">The Hard Law</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          This is the hard law of your committee — it tells you exactly what is allowed, what isn't, when it happens, and what the penalties are.
        </p>
        <Tabs
          tabs={[
            { id: 'bg-s1', label: 'IT Amendment Rules 2026' },
            { id: 'bg-s2', label: 'BNS 2023' },
            { id: 'bg-s3', label: 'BNSS 2023' },
          ]}
          panels={{
            'bg-s1': (
              <div className="panel-inner">
                <div>
                  <div className="rule-item">
                    <h5>Defining SGI</h5>
                    <p>Audio-visual or audio/video media that is synthetically or algorithmically generated so as to appear as real media. Note: text-only content (including ChatGPT content) is explicitly excluded.</p>
                  </div>
                  <div className="rule-item">
                    <h5>Mandatory Metadata Labeling</h5>
                    <p>Hosts must embed cryptographically secured, permanent metadata provenance trackers within the work itself. SSMIs must also obtain user consent for hosting such content.</p>
                  </div>
                  <div className="rule-item">
                    <h5>Active Moderation Approach</h5>
                    <p>The new rules transition India from a "due diligence" based approach to an "active moderation" approach. Penalty for non-compliance: the host becomes immediately liable for any unlawfully hosted content.</p>
                  </div>
                </div>
                <div>
                  <div className="block fill-black">
                    <h4><span className="icon-mark">⏱</span> REDUCED RESPONSE WINDOWS</h4>
                    <p style={{ marginBottom: 0 }}>
                      {[
                        ['General Unlawful Content', '72hrs → 36 hours'],
                        ['Court/Government Order', '36hrs → 3 hours'],
                        ['Non-Consensual Intimate Imagery / Deepfake Nudity', '24hrs → 2 hours'],
                        ['Grievance Officer Resolution', '15 days → 7 days'],
                      ].map(([label, val], i) => (
                        <span key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '8px 0', fontSize: '14px' }}>
                          <span style={{ color: '#aaa' }}>{label}</span>
                          <span style={{ color: 'var(--orange)', fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: '12px' }}>{val}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ),
            'bg-s2': (
              <div className="panel-inner">
                <div>
                  <div className="rule-item">
                    <h5>Section 196 — Promoting Enmity</h5>
                    <p>The primary charge for hate speech crimes. Criminalises statements — explicitly including those made through electronic communication — that promote disharmony or ill-will between groups on grounds of religion, race, language, caste, or community. Punishment: up to 3 years; up to 5 years if in a place of worship.</p>
                  </div>
                  <div className="rule-item">
                    <h5>Section 353 — Public Mischief</h5>
                    <p>The anti-misinformation statute (replaces IPC 505). Criminalises making, publishing, or circulating false information — explicitly including electronic means — intended to cause public panic, alarm, or communal incitement. <em>Note: No safe-harbor clause for influencers who retweet deepfakes in good faith.</em> Punishment: up to 3 years.</p>
                  </div>
                </div>
                <div>
                  <div className="rule-item">
                    <h5>Section 356 — Defamation</h5>
                    <p>Modernised crime of defamation merging old IPC 499 and 500 into a single clause, explicitly encompassing digital and online defamation. Introduces community service as a new statutory alternative. Punishment: simple imprisonment up to 2 years, fine, community service, or combination.</p>
                  </div>
                </div>
              </div>
            ),
            'bg-s3': (
              <div className="panel-inner">
                <div>
                  <div className="rule-item">
                    <h5>Section 105 — Evidentiary Safeguards for Tech Raids</h5>
                    <p>Mandates upon police officers to apply continuous video and audio recording of the search of any data repository (server, laptop, or phone) to preclude evidence tampering during tech-sector raids.</p>
                  </div>
                </div>
                <div>
                  <div className="block fill-orange">
                    <h4><span className="icon-mark">!</span> WHY THIS MATTERS</h4>
                    <p>Section 105 of the BNSS creates a procedural safeguard against evidentiary abuse during law enforcement investigations of digital platforms and content creators. Delegates can use this to challenge the legality of raids and seizures.</p>
                  </div>
                </div>
              </div>
            ),
          }}
        />
      </section>

      {/* SECTION 6: CURRENT REGULATORY CASES */}
      <section id="bg-current">
        <span className="eyebrow">06 · CURRENT REGULATORY CASES</span>
        <h2 className="display">Live Constitutional<br />Crises</h2>
        <div className="feature-grid" style={{ marginTop: '32px' }}>
          <div className="block fill-black span-4">
            <h4><span className="icon-mark">◆</span> THE FACT-CHECK UNIT (FCU)</h4>
            <p>In 2023, the government sought to establish a centralized FCU with authority to identify any claim relating to "the business of the Central Government" as 'fake', 'false' or 'misleading', forcing platforms to take it down. The Bombay High Court declared it unconstitutional in September 2024. The Centre has appealed to the Supreme Court. On March 10, 2026, Justice Surya Kant stated it would refer the constitutional issues to a larger three-judge bench to determine whether "the government has the power to take action on any speech, which it feels to be misleading." A veritable constitutional crisis at the moment.</p>
          </div>
          <div className="block fill-orange span-2">
            <h4><span className="icon-mark">§</span> THE CREATOR ECONOMY &amp; BROADCASTING BILL</h4>
            <p>The MIB drafted the Broadcasting Services (Regulation) Bill which would classify independent digital creators as broadcasters, requiring them to constitute internal "Content Evaluation Committees" to certify their content beforehand. In the face of an immense digital outcry, the government retreated. New draft regulations released in June 2026 make no mention of OTT platforms or digital creators.</p>
          </div>
        </div>
      </section>

      <div className="hazard" style={{ margin: '0' }}></div>

      {/* SECTION 7: STAKEHOLDERS */}
      <section id="bg-stakeholders">
        <span className="eyebrow orange">07 · STAKEHOLDERS</span>
        <h2 className="display">The Blocs in<br />The Room</h2>
        <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
          Know every player's objectives, vulnerabilities, and likely legislative strategy before you walk in.
        </p>
        <div className="feature-grid" style={{ marginTop: '32px' }}>
          {stakeholders.map((s, i) => (
            <div key={i} className={`block span-3 ${s.color}`}>
              <h4><span className="icon-mark">{String(i+1).padStart(2,'0')}</span> {s.bloc.toUpperCase()}</h4>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.7 }}>{s.role}</p>
              <div style={{ borderTop: '1px solid currentColor', opacity: 0.2, margin: '10px 0' }}></div>
              <p style={{ marginBottom: '8px' }}><strong style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '4px', opacity: 0.7 }}>Objective</strong>{s.objectives}</p>
              <p style={{ marginBottom: '8px' }}><strong style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '4px', opacity: 0.7 }}>Vulnerability</strong>{s.vulnerabilities}</p>
              <p><strong style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '4px', opacity: 0.7 }}>Strategy</strong>{s.strategy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8-10: RESEARCH, ARTICLES, GLOSSARY */}
      <section id="bg-research" style={{ borderBottom: 'none' }}>
        <span className="eyebrow black">08 · RESEARCH &amp; REFERENCE</span>
        <h2 className="display">How To Dig Deeper</h2>
        <Tabs
          tabs={[
            { id: 'bg-r1', label: 'Research Methodology' },
            { id: 'bg-r2', label: 'Essential Articles' },
            { id: 'bg-r3', label: 'Glossary' },
          ]}
          panels={{
            'bg-r1': (
              <div className="panel-inner">
                <div>
                  {[
                    ['SCC Online / Manupatra / Indian Kanoon', 'Use them to read the exact text and judicial reasoning of Supreme Court and High Court judgments. Read the judge\'s actual words.'],
                    ['LiveLaw & Bar and Bench', 'Essential legal journalism portals for tracking active courtroom exchanges (like the ongoing FCU hearings).'],
                    ['The Gazette of India (egazette.nic.in)', 'Go here to read the exact, original wording of the IT Amendment Rules, 2026, and the BNS, 2023.'],
                    ['Ministry Websites (MeitY, MIB, MHA)', 'Check for consultation papers on the upcoming Digital India Act.'],
                  ].map(([title, desc], i) => (
                    <div className="rule-item" key={i}><h5>{title}</h5><p>{desc}</p></div>
                  ))}
                </div>
                <div>
                  {[
                    ['PRS Legislative Research', 'Highly reliable think-tank producing plain-language summaries of complex bills.'],
                    ['Reuters India', 'Use balanced press agency updates to track new political shifts and global views on India. This keeps your facts up to date and adds a wide-world lens beyond old guides.'],
                    ['The Hindu', 'Review the agenda topic and look for balanced, well-reasoned viewpoints from diverse political viewpoints.'],
                  ].map(([title, desc], i) => (
                    <div className="rule-item" key={i}><h5>{title}</h5><p>{desc}</p></div>
                  ))}
                </div>
              </div>
            ),
            'bg-r2': (
              <div className="panel-inner">
                <div>
                  {[
                    ['Article 14 — Right to Equality', '"The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." Often used to invalidate discriminatory laws, as in the Bombay HC striking down the Fact-Check Unit.'],
                    ['Article 19(1)(a) — Freedom of Speech and Expression', 'Freedom of speech and expression for all citizens. This is the bedrock of this committee\'s very existence.'],
                    ['Article 19(1)(g) — Right to Practice any Profession', 'Guarantees citizens the right to practice any profession, or to carry on any occupation, trade or business. Highly relevant for Influencer and Creator Economy blocs arguing that sweeping censorship laws destroy their digital livelihood.'],
                  ].map(([title, desc], i) => (
                    <div className="rule-item" key={i}><h5>{title}</h5><p>{desc}</p></div>
                  ))}
                </div>
                <div>
                  {[
                    ['Article 19(2) — Reasonable Restrictions', 'The exclusive, exhaustive list of grounds on which the state can restrict free speech: Sovereignty, security, friendly relations with foreign States, public order, decency or morality, contempt of court, defamation, or incitement to an offence.'],
                    ['Article 21 — Protection of Life and Personal Liberty', '"No person shall be deprived of his life or personal liberty except according to procedure established by law." In the digital age, the Supreme Court has interpreted this to include the fundamental Right to Privacy.'],
                    ['Articles 32 & 226 — Writ Jurisdiction', 'Allows citizens to directly approach the Supreme Court (Art. 32) or High Courts (Art. 226) for the enforcement of their fundamental rights.'],
                  ].map(([title, desc], i) => (
                    <div className="rule-item" key={i}><h5>{title}</h5><p>{desc}</p></div>
                  ))}
                </div>
              </div>
            ),
            'bg-r3': (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 26px' }}>
                {glossary.map((g, i) => (
                  <div key={i} style={{ borderLeft: '4px solid var(--red)', padding: '4px 0 4px 18px', marginBottom: '18px' }}>
                    <h5 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '4px', color: 'var(--black)' }}>{g.term}</h5>
                    <p style={{ fontSize: '14px', color: '#2a2a26' }}>{g.def}</p>
                  </div>
                ))}
                <div style={{ gridColumn: '1 / -1', marginTop: '16px', padding: '16px', border: '3px solid var(--black)', background: 'var(--black)', color: 'var(--white)' }}>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>NOTE: THE BACKGROUND GUIDE MUST NOT BE DIRECTLY QUOTED DURING SPEECHES. PARTICIPANTS MAY USE IT FOR RESEARCH AND STUDY, THOUGH THE PROVIDED DATA SHOULD NOT BE SOLELY RELIED UPON FOR ABSOLUTE ACCURACY.</p>
                </div>
              </div>
            ),
          }}
        />
      </section>
    </>
  );
}

/* ─── Home Page ─────────────────────────────────── */
function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="home-top">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">WELCOME · AISM 2026</span>
            <h1 className="display">All India<br />Stakeholder's<br />Meet</h1>
            <p className="hero-lede">
              Digital governance, misinformation, and the limits of free expression don't get settled by diplomatic
              niceties. AISM runs on{' '}
              <mark>portfolios, leverage, and coalitions</mark>{' '}
              — not flags and formal protocol.
            </p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <a href="#about" className="btn-register" style={{ textDecoration: 'none', background: 'var(--white)', color: 'var(--black)' }}>LEARN MORE</a>
              <a href="/AISM_BG_AAWAAZ_2.0.pdf" download="AISM_BG_AAWAAZ_2.0.pdf" className="btn-register" style={{ textDecoration: 'none', background: 'var(--red)' }}>DOWNLOAD BACKGROUND GUIDE →</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'flex-start' }}>
            <span className="stamp">EB RULING<br />CANNOT BE APPEALED</span>
            <div className="quote-block">
              Success here isn't a geographical bloc. It's an unlikely cross-sector coalition that forces a
              directive through a fractured room.
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ padding: '80px 40px', background: 'var(--white)' }}>
        <div className="wrap">
          <span className="eyebrow orange">ABOUT AISM</span>
          <h2 className="display">A Different Kind<br />Of Debate</h2>
          <p style={{ maxWidth: '640px', marginTop: '18px', fontSize: '17px', color: '#2a2a26' }}>
            AISM dismantles the standard Model UN format on purpose. You don't arrive as a sovereign nation with a
            general foreign policy. You arrive as one entity inside India's socio-political fabric — a ministry
            bureaucrat, a tech executive, a creator, an advocate — with a narrow set of interests to protect.
          </p>
          <div className="feature-grid" style={{ marginTop: '40px' }}>
            <div className="block fill-black span-3 tilt">
              <h4><span className="icon-mark">◆</span> PORTFOLIO, NOT FLAG</h4>
              <p>Your identity is your portfolio — a ministry, a platform, a movement. Every speech, vote, and
              alliance has to trace back to that portfolio's actual interests and constraints.</p>
            </div>
            <div className="block span-3">
              <h4><span className="icon-mark">§</span> FLUID RULES</h4>
              <p>There's no fixed constitutional script. The Executive Board writes and rewrites the Rules of
              Procedure to fit the crisis at hand. Their ruling is final.</p>
            </div>
            <div className="block fill-red span-4">
              <h4><span className="icon-mark">⛓</span> COALITIONS OVER BLOCS</h4>
              <p>Directives don't pass on argument alone. They pass when portfolios with nothing obvious in common
              find a shared stake and hold the line together.</p>
            </div>
            <div className="block fill-orange span-2">
              <h4><span className="icon-mark">✦</span> NO SCRIPTS</h4>
              <p>The Board has read every brief in the room. What they haven't read is your specific take.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="halftone"></div>
    </>
  );
}

/* ─── Delegations Matrix ─────────────────────────── */
function DelegationsMatrix({ userType, showMarksheetsOnly = false }: { userType: 'delegate' | 'admin' | null; showMarksheetsOnly?: boolean }) {
  const [showMarksheets, setShowMarksheets] = useState(showMarksheetsOnly);
  const [sortByScore, setSortByScore] = useState(false);
  const [selectedDay, setSelectedDay] = useState<'day1' | 'day2'>('day1');
  const [hideAbsent, setHideAbsent] = useState(false);
  
  // Scoring state for all delegates
  const [scores, setScores] = useState<Record<string, {
    attendance: 'Present' | 'Present & Voting' | '';
    opening: number | '';
    chits: number | '';
    mod1: number | '';
    mod2: number | '';
    mod3: number | '';
    mod4: number | '';
    lobbying: number | '';
    solution: number | '';
  }>>({});
  
  const [saveStatus, setSaveStatus] = useState<Record<string, 'saving' | 'saved' | 'error'>>({});
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const delegations = [
    { id: 1, name: "Smt. Droupadi Murmu", role: "President of India", category: "Government Leadership" },
    { id: 2, name: "Shri C. P. Radhakrishnan", role: "Vice President of India", category: "Government Leadership" },
    { id: 3, name: "Shri Narendra Damodardas Modi", role: "Prime Minister of India", category: "Government Leadership" },
    { id: 4, name: "Shri Amit Anilchandra Shah", role: "Minister of Home Affairs, India", category: "Government Leadership" },
    { id: 5, name: "Shri Ashwini Vaishnav", role: "(Union) Minister of Information & Broadcasting; Minister of Electronics & Information Technology", category: "Government Leadership" },
    { id: 6, name: "Shri Jyotiraditya M. Scindia", role: "(Union) Minister of Communications", category: "Government Leadership" },
    { id: 7, name: "Shri Jitin Prasada", role: "(State) Minister of Electronics & Information Technology", category: "Government Leadership" },
    { id: 8, name: "Shri Loganathan Murugan", role: "(State) Minister of Information & Broadcasting", category: "Government Leadership" },
    { id: 9, name: "Shri Chandra Shekhar Pemmasani", role: "(State) Minister of Communications", category: "Government Leadership" },
    { id: 10, name: "Shri Mayur Ratilal Govekar", role: "(Union) Private Secretary (MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 11, name: "Shri Amit Rajan", role: "(Union) Under Secretary (MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 12, name: "Shri Amrendra Pratap Singh", role: "(State) Private Secretary(MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 13, name: "Shri Amit Agrawal", role: "Chairman, D.C.C. & Secretary (T) (MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 14, name: "Shri Rajan Gera", role: "Principal Staff Officer (MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 15, name: "Shri Anand Prakash", role: "Principal Staff Officer (MoC & DoT)", category: "Ministry Bureaucrats" },
    { id: 16, name: "Ranveer Allahbadia", role: "Content Creator", category: "Social Media Influencers" },
    { id: 17, name: "Ajey Nagar", role: "Content Creator", category: "Social Media Influencers" },
    { id: 18, name: "Bhuvan Bam", role: "Content Creator", category: "Social Media Influencers" },
    { id: 19, name: "Elvish Yadav", role: "Content Creator", category: "Social Media Influencers" },
    { id: 20, name: "Dhruv Rathee", role: "Content Creator", category: "Social Media Influencers" },
    { id: 21, name: "Nitish Rajput", role: "Content Creator", category: "Social Media Influencers" },
    { id: 22, name: "Saurav Joshi", role: "Content Creator", category: "Social Media Influencers" },
    { id: 23, name: "Raj Shamani", role: "Content Creator", category: "Social Media Influencers" },
    { id: 24, name: "Ankur Warikoo", role: "Content Creator", category: "Social Media Influencers" },
    { id: 25, name: "Rajat Dalal", role: "Content Creator", category: "Social Media Influencers" },
    { id: 26, name: "Sandeep Maheshwari", role: "Content Creator", category: "Social Media Influencers" },
    { id: 27, name: "Lakshay Chaudhary", role: "Content Creator", category: "Social Media Influencers" },
    { id: 28, name: "Apoorva Mukherjee", role: "Content Creator", category: "Social Media Influencers" },
    { id: 29, name: "Vivek Bindra", role: "Content Creator", category: "Social Media Influencers" },
    { id: 30, name: "Gaurav Taneja", role: "Content Creator", category: "Social Media Influencers" },
    { id: 31, name: "Gaurav Chaudhary", role: "Content Creator", category: "Social Media Influencers" },
    { id: 32, name: "Mohak Mangal", role: "Content Creator", category: "Social Media Influencers" },
    { id: 33, name: "Deepak Kalal", role: "Content Creator", category: "Social Media Influencers" },
    { id: 34, name: "Puneet Superstar", role: "Content Creator", category: "Social Media Influencers" },
    { id: 35, name: "Hindustani Bhau", role: "Content Creator", category: "Social Media Influencers" },
    { id: 36, name: "Armaan Malik", role: "Content Creator", category: "Social Media Influencers" },
    { id: 37, name: "Rishabh Jain", role: "Content Creator", category: "Social Media Influencers" },
    { id: 38, name: "Samay Raina", role: "Comedian", category: "Social Media Influencers" },
    { id: 39, name: "Tanmay Bhatt", role: "Comedian", category: "Social Media Influencers" },
    { id: 40, name: "Rohan Joshi", role: "Comedian", category: "Social Media Influencers" },
    { id: 41, name: "Palki Sharma", role: "Comedian", category: "Social Media Influencers" },
    { id: 42, name: "Kunal Kamra", role: "Comedian", category: "Social Media Influencers" },
    { id: 43, name: "Aakash Gupta", role: "Comedian", category: "Social Media Influencers" },
    { id: 44, name: "Pranit More", role: "Comedian", category: "Social Media Influencers" },
    { id: 45, name: "Munawar Faruqi", role: "Comedian", category: "Social Media Influencers" },
    { id: 46, name: "Ashneer Grover", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 47, name: "Amit Jain", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 48, name: "Aman Gupta", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 49, name: "Namita Thapar", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 50, name: "Anupam Mittal", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 51, name: "Peyush Bansal", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 52, name: "Vineeta Singh", role: "Entrepreneur", category: "Social Media Influencers" },
    { id: 53, name: "Rakhi Sawant", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 54, name: "Uorfi Javed", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 55, name: "Deepika Padukone", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 56, name: "Alia Bhatt", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 57, name: "Kiara Advani", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 58, name: "Kriti Sanon", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 59, name: "Katrina Kaif", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 60, name: "Shraddha Kapoor", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 61, name: "Sara Ali Khan", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 62, name: "Rashmika Mandanna", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 63, name: "Samantha Ruth Prabhu", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 64, name: "Tamannaah Bhatia", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 65, name: "Keerthy Suresh", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 66, name: "Trisha Krishnan", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 67, name: "Bhumi Pednekar", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 68, name: "Pooja Hegde", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 69, name: "Mrunal Thakur", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 70, name: "Sai Pallavi", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 71, name: "Ananya Pandey", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 72, name: "Kangna Ranaut", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 73, name: "Jacqueline Fernandez", role: "Actress", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 74, name: "Kamal R Khan (KRK)", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 75, name: "Shah Rukh Khan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 76, name: "Imran Haashmi", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 77, name: "Jackie Shroff", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 78, name: "Sanjay Dutt", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 79, name: "Akshaye Khanna", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 80, name: "Salman Khan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 81, name: "Aamir Khan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 82, name: "Akshay Kumar", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 83, name: "Hrithik Roshan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 84, name: "Ranbir Kapoor", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 85, name: "Ranveer Singh", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 86, name: "Ajay Devgn", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 87, name: "Kartik Aaryan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 88, name: "Varun Dhawan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 89, name: "Rajkummar Rao", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 90, name: "Ayushmann Khurrana", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 91, name: "Manoj Bajpayee", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 92, name: "Anil Kapoor", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 93, name: "Pankaj Tripathi", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 94, name: "K. K. Menon", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 95, name: "Nana Patekar", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 96, name: "Amitabh Bachchan", role: "Actor", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 97, name: "S. S. Rajamouli", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 98, name: "Sanjay Leela Bhansali", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 99, name: "Ali Abbas Zafar", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 100, name: "Sudipto Sen", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 101, name: "Rajkumar Hirani", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 102, name: "Zoya Akhtar", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 103, name: "Anurag Kashyap", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 104, name: "Rohit Shetty", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 105, name: "Imtiaz Ali", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 106, name: "Mahesh Bhatt", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 107, name: "Aditya Dhar", role: "Film Director", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 108, name: "Aditya Chopra", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 109, name: "Karan Johar", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 110, name: "Bhushan Kumar", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 111, name: "Sajid Nadiadwala", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 112, name: "Farhan Akhtar", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
    { id: 113, name: "Ronnie Screwvala", role: "Film Producer", category: "Bollywood Celebrities/Directors/Producers" },
  ];

  const categories = [...new Set(delegations.map(d => d.category))];

  // Calculate total score for a delegate
  const calculateTotal = (delegateId: number): number => {
    const s = scores[`${delegateId}-${selectedDay}`];
    if (!s) return 0;
    
    let total = 0;
    const scoringFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'] as const;
    
    scoringFields.forEach(field => {
      if (typeof s[field] === 'number') {
        total += s[field];
      }
    });
    
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  };

  // Check if delegate is absent (no attendance selected)
  const isAbsent = (delegateId: number): boolean => {
    const key = `${delegateId}-${selectedDay}`;
    const s = scores[key];
    return !s || !s.attendance;
  };

  // Calculate ranking
  const getSortedDelegations = () => {
    let delegationsWithScores = delegations.map(d => ({
      ...d,
      total: calculateTotal(d.id)
    }));
    
    // Filter absent delegates if hideAbsent is true
    if (hideAbsent) {
      delegationsWithScores = delegationsWithScores.filter(d => !isAbsent(d.id));
    }
    
    if (sortByScore) {
      return delegationsWithScores.sort((a, b) => b.total - a.total);
    }
    
    // Sort alphabetically by name
    return delegationsWithScores.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortedDelegations = getSortedDelegations();

  // Calculate statistics
  const scoredDelegates = delegations.filter(d => {
    const s = scores[`${d.id}-${selectedDay}`];
    if (!s) return false;
    const scoringFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'] as const;
    return scoringFields.some(field => typeof s[field] === 'number');
  });

  const averageScore = scoredDelegates.length > 0 
    ? (scoredDelegates.reduce((sum, d) => sum + calculateTotal(d.id), 0) / scoredDelegates.length).toFixed(1)
    : 0;

  const highestScore = scoredDelegates.length > 0
    ? Math.max(...scoredDelegates.map(d => calculateTotal(d.id)))
    : 0;

  // Load scores from API on mount and when day changes
  useEffect(() => {
    const loadScores = async () => {
      try {
        const response = await fetch('/api/scores');
        if (response.ok) {
          const data = await response.json();
          setScores(data);
        }
      } catch (error) {
        console.error('Error loading scores:', error);
      }
    };

    loadScores();
  }, [selectedDay]);

  // Auto-save with debounce
  useEffect(() => {
    const saveTimeouts: Record<string, NodeJS.Timeout> = {};
    
    const saveScore = async (key: string) => {
      const [delegateId, day] = key.split('-');
      setSaveStatus(prev => ({ ...prev, [key]: 'saving' }));
      
      try {
        const delegateScores = scores[key];
        if (!delegateScores) return;

        const response = await fetch(`/api/scores/${delegateId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            day: day,
            attendance: delegateScores.attendance,
            opening: delegateScores.opening,
            chits: delegateScores.chits,
            mod1: delegateScores.mod1,
            mod2: delegateScores.mod2,
            mod3: delegateScores.mod3,
            mod4: delegateScores.mod4,
            lobbying: delegateScores.lobbying,
            solution: delegateScores.solution,
          }),
        });

        if (response.ok) {
          setSaveStatus(prev => ({ ...prev, [key]: 'saved' }));
          
          // Clear 'saved' status after 2 seconds
          setTimeout(() => {
            setSaveStatus(prev => {
              const updated = { ...prev };
              delete updated[key];
              return updated;
            });
          }, 2000);
        } else {
          setSaveStatus(prev => ({ ...prev, [key]: 'error' }));
        }
      } catch (error) {
        console.error('Error saving score:', error);
        setSaveStatus(prev => ({ ...prev, [key]: 'error' }));
      }
    };

    // Debounce save for each delegate
    Object.keys(scores).forEach(key => {
      if (saveTimeouts[key]) {
        clearTimeout(saveTimeouts[key]);
      }
      saveTimeouts[key] = setTimeout(() => saveScore(key), 1000);
    });

    return () => {
      Object.values(saveTimeouts).forEach(clearTimeout);
    };
  }, [scores]);

  // Handle score change
  const handleScoreChange = (delegateId: number, field: string, value: string | number) => {
    let numericValue: number | '' = '';
    
    if (typeof value === 'string') {
      if (value === '') {
        numericValue = '';
      } else {
        const parsed = parseFloat(value);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
          numericValue = parsed;
        }
      }
    } else {
      numericValue = value;
    }
    
    const key = `${delegateId}-${selectedDay}`;
    setScores(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: numericValue
      }
    }));
  };

  // Handle attendance change
  const handleAttendanceChange = (delegateId: number, value: 'Present' | 'Present & Voting' | '') => {
    const key = `${delegateId}-${selectedDay}`;
    setScores(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        attendance: value
      }
    }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, delegateId: number, field: string) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      // Move to next cell logic would go here
    }
  };

  // Export to CSV
  const handleExport = () => {
    const csvRows: string[] = [];
    
    // Header row
    csvRows.push('Delegate ID,Portfolio Name,Role,Category,Day 1 Attendance,Day 1 Opening,Day 1 Chits,Day 1 MOD 1,Day 1 MOD 2,Day 1 MOD 3,Day 1 MOD 4,Day 1 Lobbying,Day 1 Solution,Day 1 Total,Day 2 Attendance,Day 2 Opening,Day 2 Chits,Day 2 MOD 1,Day 2 MOD 2,Day 2 MOD 3,Day 2 MOD 4,Day 2 Lobbying,Day 2 Solution,Day 2 Total');
    
    // Data rows
    delegations.forEach(delegate => {
      const day1Key = `${delegate.id}-day1`;
      const day2Key = `${delegate.id}-day2`;
      const day1Scores = scores[day1Key] || {};
      const day2Scores = scores[day2Key] || {};
      
      // Calculate totals for each day
      const calculateDayTotal = (dayScores: any): number => {
        if (!dayScores) return 0;
        let total = 0;
        const scoringFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'] as const;
        scoringFields.forEach(field => {
          if (typeof dayScores[field] === 'number') {
            total += dayScores[field];
          }
        });
        return Math.round(total * 100) / 100;
      };
      
      const day1Total = calculateDayTotal(day1Scores);
      const day2Total = calculateDayTotal(day2Scores);
      
      const scoringFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'] as const;
      
      const row = [
        delegate.id,
        `"${delegate.name}"`,
        `"${delegate.role}"`,
        `"${delegate.category}"`,
        day1Scores.attendance || '-',
        ...scoringFields.map(field => day1Scores[field] !== '' ? day1Scores[field] : ''),
        day1Total > 0 ? day1Total : '-',
        day2Scores.attendance || '-',
        ...scoringFields.map(field => day2Scores[field] !== '' ? day2Scores[field] : ''),
        day2Total > 0 ? day2Total : '-',
      ];
      
      csvRows.push(row.join(','));
    });
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `AISM_Marksheet_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {!showMarksheetsOnly && (
        <section className="hero" id="delegations-top">
          <div className="hero-grid">
            <div>
              <span className="eyebrow">DELEGATIONS · AISM 2026</span>
              <h1 className="display">Official<br />Delegation<br />Matrix</h1>
              <p className="hero-lede">
                The complete roster of portfolios assigned for AISM 2026. From government leadership to
                Bollywood celebrities, social media influencers to ministry bureaucrats — this is the full
                delegation matrix.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px', alignItems: 'flex-start' }}>
              <span className="stamp">113<br />DELEGATES</span>
              <div className="quote-block">
                Success here isn't a geographical bloc. It's an unlikely cross-sector coalition that forces a
                directive through a fractured room.
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="delegations" style={{ padding: showMarksheetsOnly ? '20px 40px' : '60px 40px' }}>
        <div className="wrap">
          {/* Admin-only scoring controls */}
          {userType === 'admin' && !showMarksheetsOnly && (
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => setShowMarksheets(!showMarksheets)}
                className="btn-register"
                style={{ background: showMarksheets ? 'var(--red)' : 'var(--black)' }}
              >
                {showMarksheets ? 'VIEW MATRIX' : 'VIEW MARKSHEET'}
              </button>
              
              {showMarksheets && (
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button
                    onClick={() => setSortByScore(!sortByScore)}
                    className="btn-register"
                    style={{ background: sortByScore ? 'var(--orange)' : 'var(--black)', fontSize: '11px' }}
                  >
                    {sortByScore ? 'SORT BY NAME' : 'SORT BY SCORE'}
                  </button>
                  
                  <button
                    onClick={() => setHideAbsent(!hideAbsent)}
                    className="btn-register"
                    style={{ background: hideAbsent ? 'var(--orange)' : 'var(--black)', fontSize: '11px' }}
                  >
                    {hideAbsent ? 'SHOW ALL' : 'HIDE ABSENT'}
                  </button>
                  
                  <button
                    onClick={handleExport}
                    className="btn-register"
                    style={{ background: 'var(--red)', fontSize: '11px' }}
                  >
                    EXPORT CSV
                  </button>
                  
                  <div className="mono" style={{ fontSize: '12px', color: 'var(--grey)' }}>
                    Showing: {sortedDelegations.length} / 113 | Scored: {scoredDelegates.length} | Avg: {averageScore} / 80 | High: {highestScore} / 80
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Stats bar for marksheet-only view */}
          {showMarksheetsOnly && (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--black)', paddingBottom: '15px' }}>
              <div>
                <h2 className="display" style={{ fontSize: '24px', marginBottom: '5px' }}>Delegate Marksheet</h2>
                <p className="mono" style={{ fontSize: '12px', color: 'var(--grey)' }}>Live scoring matrix for AISM 2026</p>
              </div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Day Toggle */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setSelectedDay('day1')}
                    className="btn-register"
                    style={{ 
                      background: selectedDay === 'day1' ? 'var(--orange)' : 'var(--black)', 
                      fontSize: '14px',
                      padding: '12px 24px'
                    }}
                  >
                    DAY 1
                  </button>
                  <button
                    onClick={() => setSelectedDay('day2')}
                    className="btn-register"
                    style={{ 
                      background: selectedDay === 'day2' ? 'var(--orange)' : 'var(--black)', 
                      fontSize: '14px',
                      padding: '12px 24px'
                    }}
                  >
                    DAY 2
                  </button>
                </div>
                
                <button
                  onClick={() => setSortByScore(!sortByScore)}
                  className="btn-register"
                  style={{ background: sortByScore ? 'var(--orange)' : 'var(--black)', fontSize: '11px' }}
                >
                  {sortByScore ? 'SORT BY NAME' : 'SORT BY SCORE'}
                </button>
                
                <button
                  onClick={() => setHideAbsent(!hideAbsent)}
                  className="btn-register"
                  style={{ background: hideAbsent ? 'var(--orange)' : 'var(--black)', fontSize: '11px' }}
                >
                  {hideAbsent ? 'SHOW ALL' : 'HIDE ABSENT'}
                </button>
                
                <button
                  onClick={handleExport}
                  className="btn-register"
                  style={{ background: 'var(--red)', fontSize: '11px' }}
                >
                  EXPORT CSV
                </button>
                
                <div className="mono" style={{ fontSize: '12px', color: 'var(--grey)' }}>
                  Showing: {sortedDelegations.length} / 113 | Scored: {scoredDelegates.length} | Avg: {averageScore} / 80 | High: {highestScore} / 80
                </div>
              </div>
            </div>
          )}

          {showMarksheets && userType === 'admin' ? (
            /* MARKSHEET VIEW - ADMIN ONLY */
            <div style={{ overflowX: 'auto', border: '2px solid var(--black)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'IBM Plex Mono, monospace' }}>
                <thead>
                  <tr style={{ background: 'var(--black)', color: 'var(--white)' }}>
                    <th style={{ padding: '12px 8px', textAlign: 'left', position: 'sticky', left: 0, background: 'var(--black)', zIndex: 10, minWidth: '60px' }}>Rank</th>
                    <th style={{ padding: '12px 8px', textAlign: 'left', position: 'sticky', left: '60px', background: 'var(--black)', zIndex: 9, minWidth: '200px' }}>Portfolio</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '120px' }}>Attendance</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '70px' }}>Opening</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '60px' }}>Chits</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '60px' }}>MOD 1</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '60px' }}>MOD 2</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '60px' }}>MOD 3</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '60px' }}>MOD 4</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '70px' }}>Lobbying</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', minWidth: '70px' }}>Solution</th>
                    <th style={{ padding: '12px 8px', textAlign: 'center', position: 'sticky', right: 0, background: 'var(--black)', zIndex: 10, minWidth: '80px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDelegations.map((delegate, index) => {
                    const key = `${delegate.id}-${selectedDay}`;
                    const s = scores[key] || {};
                  const total = calculateTotal(delegate.id);
                  const scoringFields = ['opening', 'chits', 'mod1', 'mod2', 'mod3', 'mod4', 'lobbying', 'solution'] as const;
                  const scoredCount = scoringFields.filter(f => typeof s[f] === 'number').length;
                  
                  return (
                    <tr key={delegate.id} style={{ borderBottom: '1px solid var(--black)' }}>
                      <td style={{ padding: '12px 8px', textAlign: 'center', position: 'sticky', left: 0, background: 'var(--white)', zIndex: 8, fontSize: '14px' }}>
                        {sortByScore && total > 0 ? index + 1 : '-'}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'left', position: 'sticky', left: '60px', background: 'var(--white)', zIndex: 7 }}>
                        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{delegate.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--grey)' }}>{delegate.role}</div>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <select
                          value={s.attendance || ''}
                          onChange={(e) => handleAttendanceChange(delegate.id, e.target.value as 'Present' | 'Present & Voting' | '')}
                          style={{
                            padding: '6px',
                            fontSize: '12px',
                            border: '2px solid var(--black)',
                            background: 'var(--white)',
                            fontFamily: 'inherit',
                            minWidth: '100px',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="">-</option>
                          <option value="Present">Present</option>
                          <option value="Present & Voting">Present & Voting</option>
                        </select>
                      </td>
                      {scoringFields.map(field => (
                        <td key={field} style={{ padding: '12px 8px', textAlign: 'center' }}>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.25"
                            value={s[field] === '' ? '' : s[field]}
                            onChange={(e) => handleScoreChange(delegate.id, field, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, delegate.id, field)}
                            style={{
                              width: '50px',
                              padding: '6px',
                              fontSize: '14px',
                              border: '2px solid var(--black)',
                              background: 'var(--white)',
                              fontFamily: 'inherit',
                              textAlign: 'center',
                            }}
                            placeholder="-"
                          />
                        </td>
                      ))}
                      <td style={{ padding: '12px 8px', textAlign: 'center', position: 'sticky', right: 0, background: 'var(--white)', zIndex: 8, fontWeight: 'bold', fontSize: '14px' }}>
                        <div style={{ color: total > 0 ? 'var(--black)' : 'var(--grey)' }}>
                          {total > 0 ? `${total} / 80` : '-'}
                        </div>
                        {scoredCount > 0 && scoredCount < 8 && (
                          <div style={{ fontSize: '10px', color: 'var(--orange)', marginTop: '2px' }}>
                            {scoredCount}/8
                          </div>
                        )}
                        {saveStatus[key] === 'saving' && (
                          <div style={{ fontSize: '10px', color: 'var(--grey)', marginTop: '2px' }}>Saving...</div>
                        )}
                        {saveStatus[key] === 'saved' && (
                          <div style={{ fontSize: '10px', color: 'var(--red)', marginTop: '2px' }}>Saved</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          ) : (
            /* REGULAR MATRIX VIEW */
            <>
              {[...new Set(delegations.map(d => d.category))].map(category => (
                <div key={category} style={{ marginBottom: '60px' }}>
                  <h3 className="display" style={{ fontSize: '32px', marginBottom: '30px', borderBottom: '2px solid var(--black)', paddingBottom: '10px' }}>
                    {category}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {delegations.filter(d => d.category === category).map(delegate => (
                      <div key={delegate.id} className="block" style={{ padding: '20px', border: '1px solid var(--black)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span className="mono" style={{ fontSize: '12px', color: 'var(--grey)' }}>#{delegate.id}</span>
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{delegate.name}</h4>
                        <p style={{ fontSize: '14px', color: 'var(--grey)' }}>{delegate.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Root App ───────────────────────────────────── */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState<'delegate' | 'admin' | null>(null);
  const [view, setView] = useState<'home' | 'rops' | 'background' | 'delegations' | 'marksheet'>('home');

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TEMPORARY BYPASS FOR UI TESTING - Remove in production
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('bypass') === 'true') {
          setIsAuthenticated(true);
          setUserType('admin'); // Set to admin to test marksheet functionality
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/auth/status');
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUserType(data.userType);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setUserType(null);
      setView('home');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
        <div className="mono" style={{ fontSize: '14px', color: 'var(--grey)' }}>Loading...</div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const ropsSidebarItems = [
    { href: '#distinction', num: '01', label: 'The AISM Distinction' },
    { href: '#procedure', num: '02', label: 'Operational Procedure' },
    { href: '#points', num: '03', label: 'Interventions & Chits' },
    { href: '#strategy', num: '04', label: 'Stakeholder Strategy' },
    { href: '#frameworks', num: '05', label: 'Rhetorical Frameworks' },
  ];

  const bgSidebarItems = [
    { href: '#bg-ebnote', num: '00', label: 'Note from the EB' },
    { href: '#bg-overview', num: '01', label: 'Committee Overview' },
    { href: '#bg-agenda', num: '02', label: 'The Agenda' },
    { href: '#bg-constitution', num: '03', label: 'Constitutional Law' },
    { href: '#bg-cases', num: '04', label: 'Court Cases' },
    { href: '#bg-statutes', num: '05', label: 'Statutory Bodies' },
    { href: '#bg-current', num: '06', label: 'Current Cases' },
    { href: '#bg-stakeholders', num: '07', label: 'Stakeholders' },
    { href: '#bg-research', num: '08', label: 'Research & Glossary' },
  ];

  const sidebarItems = view === 'rops' ? ropsSidebarItems : bgSidebarItems;

  return (
    <>
      <div className="hazard"></div>

      <div className="marquee">
        <div className="marquee-track">
          <span>PROCEDURAL BRIEF · AISM 2026</span>
          <span className="accent">EB RULING IS FINAL</span>
          <span>AAWAAZ 2.0 · MAIDEN EDITION</span>
          <span>INDIAN SUMMIT FOUNDATION</span>
          <span>PROCEDURAL BRIEF · AISM 2026</span>
          <span className="accent">EB RULING IS FINAL</span>
          <span>AAWAAZ 2.0 · MAIDEN EDITION</span>
          <span>INDIAN SUMMIT FOUNDATION</span>
        </div>
      </div>

      <header className="site">
        <div className="nav">
          <div className="logo">AAWAAZ <span className="ver">2.0</span></div>
          <nav className="navlinks">
            <button onClick={() => setView('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>HOME</button>
            <button onClick={() => setView('delegations')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>DELEGATIONS</button>
            {userType === 'admin' && (
              <button onClick={() => setView('marksheet')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--red)' }}>MARKSHEET</button>
            )}
            <button onClick={() => setView('rops')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>PROCEDURES</button>
            <button onClick={() => setView('background')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', color: 'inherit' }}>BACKGROUND</button>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--red)' }}>
              LOGOUT
            </button>
          </nav>
        </div>
      </header>

      {/* Show content based on view */}
      {view === 'home' && <HomePage />}
      {view === 'delegations' && <DelegationsMatrix userType={userType} />}
      {view === 'marksheet' && userType === 'admin' && <DelegationsMatrix userType={userType} showMarksheetsOnly={true} />}

      {/* Guide Switcher - only show for guide views */}
      {(view === 'rops' || view === 'background') && (
        <>
          <div className="guide-switcher">
            <button className={'guide-btn' + (view === 'rops' ? ' active' : '')} onClick={() => setView('rops')}>
              Rules of Procedure
            </button>
            <button className={'guide-btn' + (view === 'background' ? ' active' : '')} onClick={() => setView('background')}>
              AISM Background Guide
            </button>
            {view === 'background' && (
              <a href="/AISM_BG_AAWAAZ_2.0.pdf" download="AISM_BG_AAWAAZ_2.0.pdf" className="btn-register" style={{ textDecoration: 'none', marginLeft: 'auto', background: 'var(--red)' }}>
                Download Background Guide →
              </a>
            )}
          </div>

          <div className="shell">
            <aside className="rail">
              <div className="rail-label">BRIEFING INDEX</div>
              <ul className="rail-list">
                {sidebarItems.map(item => (
                  <li key={item.href}>
                    <a href={item.href}><span className="num">{item.num}</span> {item.label}</a>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="content">
              {view === 'rops' ? <RopsGuide /> : <BackgroundGuide />}
            </div>
          </div>
        </>
      )}

      <footer>
        <div className="footer-top">
          <div>
            <div className="display">AAWAAZ 2.0</div>
            <p style={{ maxWidth: '340px', color: '#aaa9a2', marginTop: '10px', fontSize: '14px' }}>
              A publication of The Indian Summit Foundation. Procedural briefs for every AISM committee, updated each edition.
            </p>
          </div>
          <div>
            <div className="also-in">ALSO IN THIS FILE SERIES</div>
            <div className="guide-links">
              <a href="#">← AISM Overview</a>
              <a href="#">First MUN Guide</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 THE INDIAN SUMMIT FOUNDATION</span>
          <span>FILE AISM/26 · CLASSIFICATION: DELEGATE BRIEFING</span>
        </div>
      </footer>
    </>
  );
}
