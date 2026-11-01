import Link from "next/link";
import {
  Header,
  Footer,
  Mounts,
  Arrow,
  SectionLabel,
} from "@/components/shell";
import { Approach } from "@/components/approach";
import { profile } from "@/lib/profile";
export default function Home() {
  return (
    <div className="site-wrap">
      <Header />
      <main id="main">
        <section
          className="bench-frame home-bench"
          aria-label="An introduction to Sayantan"
        >
          <Mounts />
          <div className="bench-topline">
            <span>SG / AN INTRODUCTION</span>
            <span>SIGNAL BENCH — VOL. 01</span>
          </div>
          <div className="bench-grid">
            <div className="hero-person">
              <span className="eyebrow">SOFTWARE ENGINEER</span>
              <h1>
                <span className="name-line">
                  <span>Sayantan</span>
                </span>
                <span className="name-line">
                  <span>
                    Ghosh<span className="name-period">.</span>
                  </span>
                </span>
              </h1>
              <p className="hero-description">
                I build interfaces and the systems behind them, with a curiosity
                for how the pieces fit and a care for how they feel to use.
              </p>
              <div className="personal-signature">
                <span /> A practice in building
                <br />& understanding.
              </div>
              <div className="hero-actions">
                <span className="mono micro">TAKE A CLOSER LOOK</span>
                <Link className="button primary" href="/work">
                  View my work <Arrow />
                </Link>
                <a className="text-link" href="#about">
                  A little about me <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className="bench-practice">
              <div className="display-label">
                <span>THE ENGINEER / THE APPROACH</span>
                <span>HELLO, WORLD.</span>
              </div>
              <Approach />
              <div className="under-display">
                <span>THE DETAILS ARE PART OF THE PRODUCT.</span>
                <span>FROM THE SCREEN TO THE SYSTEM.</span>
              </div>
              <div className="bench-lower">
                <Link className="work-invitation" href="/work">
                  <div className="mono micro">
                    <span>THE NEXT CHAPTER</span>
                    <span>01</span>
                  </div>
                  <strong>
                    Selected work <Arrow />
                  </strong>
                  <p>Projects, decisions, and things learned.</p>
                </Link>
                <div className="practice-note">
                  <span className="mono micro">A WORKING PHILOSOPHY</span>
                  <h3>
                    Good software starts
                    <br />
                    with good questions.
                  </h3>
                  <p>
                    Understand the problem. Connect the pieces.
                    <br />
                    Keep refining the details.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bench-bottomline">
            <span>PERSON / PRACTICE / EXPLORATION</span>
            <span>
              BUILT WITH INTENTION <span aria-hidden="true">＋</span>
            </span>
          </div>
        </section>
        <div className="below-bench">
          <span>THERE’S A LITTLE MORE TO THE STORY.</span>
          <a href="#about">
            SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
          </a>
        </div>
        <section className="about-section" id="about">
          <SectionLabel number="01">THE PERSON BEHIND THE WORK</SectionLabel>
          <div className="about-grid">
            <h2>
              Curious about
              <br />
              how it <em>all connects.</em>
            </h2>
            <div className="about-copy">
              <p>
                I’m Sayantan, a software engineer interested in the whole
                journey: from the first interaction to the logic and data behind
                it.
              </p>
              <p>
                I like working through a problem, understanding the tradeoffs,
                and building something useful along the way. This is a
                collection of personal projects and the things they’ve taught
                me.
              </p>
              <a
                className="text-link"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                Find me on GitHub <Arrow />
              </a>
            </div>
          </div>
          <div className="capabilities">
            {[
              [
                "01",
                "Interfaces",
                "Thoughtful experiences, down to the interaction.",
                "React / Next.js / TypeScript",
              ],
              [
                "02",
                "Application logic",
                "The connections that make the whole thing work.",
                "Node.js / Express / APIs",
              ],
              [
                "03",
                "Data & persistence",
                "Structure that keeps important context together.",
                "PostgreSQL / Data modelling",
              ],
            ].map(([number, title, description, tools]) => (
              <article key={number}>
                <span className="mono micro">{number} / AREA OF PRACTICE</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="capability-tools">{tools}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <SectionLabel number="02">KEEP THE CONVERSATION GOING</SectionLabel>
          <div>
            <h2>
              Have something
              <br />
              <em>in mind?</em>
            </h2>
            <a href={`mailto:${profile.email}`} className="contact-link">
              Let’s talk <Arrow />
            </a>
          </div>
          <p>
            Questions, ideas, or a simple hello.
            <br />
            {profile.email}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
