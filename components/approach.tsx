"use client";
import { useState } from "react";
const layers = [
  {
    label: "Interface",
    tag: "THE EXPERIENCE",
    title: "Make the interaction feel clear.",
    detail:
      "The details people see, touch, and use. An interface should make the next step feel natural.",
  },
  {
    label: "Logic",
    tag: "THE BEHAVIOUR",
    title: "Give the details a considered structure.",
    detail:
      "How information moves, how state changes, and how the pieces work together behind an interaction.",
  },
  {
    label: "Data",
    tag: "THE FOUNDATION",
    title: "Keep the important context connected.",
    detail:
      "The information underneath the experience, organised so the rest of the system can depend on it.",
  },
];
function LayerIcon({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      {index === 0 ? (
        <>
          <rect x="4" y="5" width="24" height="22" rx="2" />
          <path d="M4 11H28M12 11V27M7 8H8M11 8H12" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M13 5H9V12L5 16L9 20V27H13M19 5H23V12L27 16L23 20V27H19M14 16H18" />
          <circle cx="16" cy="16" r="3" />
        </>
      ) : (
        <>
          <ellipse cx="16" cy="7" rx="11" ry="4" />
          <path d="M5 7V25C5 30.3 27 30.3 27 25V7M5 16C5 21.3 27 21.3 27 16M5 23C5 28.3 27 28.3 27 23" />
        </>
      )}
    </svg>
  );
}
export function Approach() {
  const [selected, select] = useState(0);
  const [signal, replay] = useState(0);
  return (
    <div className="screen-bezel">
      <section className="bench-screen" aria-labelledby="approach-title">
        <div className="screen-top">
          <span>
            <i className="signal-dot" /> PERSONAL PRACTICE
          </span>
          <span>
            01 — THE APPROACH{" "}
            <i className="signal-meter" aria-hidden="true">
              <b />
              <b />
              <b />
              <b />
            </i>
          </span>
        </div>
        <div className="screen-body">
          <div className="screen-intro">
            <span className="mono micro">HOW I THINK ABOUT SOFTWARE</span>
            <h2 id="approach-title">
              The details. <br />
              The bigger <br />
              <em>picture.</em>
            </h2>
            <p>
              Thoughtful interfaces.
              <br />
              Considered foundations.
            </p>
          </div>
          <div className="signal-path">
            <span className="mono micro">
              FROM EXPERIENCE TO IMPLEMENTATION
            </span>
            <div
              className="layers"
              role="group"
              aria-label="Explore my approach to software"
            >
              <svg
                key={signal}
                className="signal-line"
                viewBox="0 0 400 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path className="signal-base" d="M0 10H400" />
                <path className="signal-trace" d="M0 10H400" pathLength="1" />
                <path className="signal-packet" d="M0 10H400" pathLength="1" />
              </svg>
              {layers.map((layer, index) => (
                <button
                  key={layer.label}
                  type="button"
                  className={`layer ${selected === index ? "is-active" : ""}`}
                  aria-pressed={selected === index}
                  aria-controls="layer-description"
                  onClick={() => {
                    select(index);
                    replay((count) => count + 1);
                  }}
                >
                  <span className="layer-number">0{index + 1}</span>
                  <span className="layer-icon">
                    <LayerIcon index={index} />
                  </span>
                  <strong>{layer.label}</strong>
                  <small>{layer.tag}</small>
                </button>
              ))}
            </div>
            <div
              className="layer-description"
              id="layer-description"
              aria-live="polite"
            >
              <div key={`${selected}-${signal}`} className="layer-copy">
                <strong>{layers[selected].title}</strong>
                <p>{layers[selected].detail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="screen-bottom">
          <span>CLARITY / STRUCTURE / CURIOSITY</span>
          <button
            className="replay-signal"
            type="button"
            onClick={() => replay((count) => count + 1)}
            data-cursor="REPLAY"
            aria-label="Replay the illustrative signal animation"
          >
            <span>ILLUSTRATIVE MODEL</span>
            <span aria-hidden="true">↻</span>
          </button>
        </div>
      </section>
    </div>
  );
}
