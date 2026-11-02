"use client";

import { useState } from "react";
import { skillAreas } from "@/lib/skills";
import { SectionLabel } from "./shell";

export function Skills() {
  const [selected, select] = useState(0);
  const area = skillAreas[selected];
  return (
    <section
      className="skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <SectionLabel number="02">
        THE TOOLKIT / CONNECTED BY PRACTICE
      </SectionLabel>
      <div className="skills-heading">
        <h2 id="skills-title">
          Different tools.
          <br />
          <em>One connected practice.</em>
        </h2>
        <p>
          The tools I work with, and where they fit.
          <br />
          Choose a circuit to take a closer look.
        </p>
      </div>
      <div className="skills-workbench">
        <div className="skills-instrument">
          <div className="skills-instrument-label mono micro">
            <span>SG / CAPABILITY MAP</span>
            <span>0{selected + 1} / 06</span>
          </div>
          <div className="skill-circuit" aria-hidden="true">
            <svg viewBox="0 0 360 250" fill="none">
              <rect
                x="130"
                y="80"
                width="100"
                height="90"
                rx="12"
                className="circuit-chip"
              />
              {skillAreas.map((item, index) => {
                const x = index < 3 ? 35 : 325;
                const y = 40 + (index % 3) * 85;
                return (
                  <g
                    key={item.id}
                    className={selected === index ? "is-selected" : ""}
                  >
                    <path
                      d={`M${x} ${y}H${index < 3 ? 90 : 270}V125H${index < 3 ? 130 : 230}`}
                    />
                    <circle cx={x} cy={y} r="17" />
                    <text x={x} y={y + 4} textAnchor="middle">
                      0{index + 1}
                    </text>
                  </g>
                );
              })}
              <text
                x="180"
                y="120"
                textAnchor="middle"
                className="circuit-code"
              >
                {area.code}
              </text>
              <text
                x="180"
                y="144"
                textAnchor="middle"
                className="circuit-caption"
              >
                CONNECTED
              </text>
            </svg>
          </div>
          <div
            className="skill-detail"
            id="skill-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="mono micro">
              CIRCUIT 0{selected + 1} / IN FOCUS
            </span>
            <h3>{area.title}</h3>
            <p>{area.description}</p>
            <span className="skill-connection mono">{area.connection}</span>
          </div>
          <div className="skills-instrument-footer mono micro">
            <span>TOOLS / SYSTEMS / CURIOSITY</span>
            <span aria-hidden="true">↳_</span>
          </div>
        </div>
        <div
          className="skill-routes"
          role="group"
          aria-label="Explore skill areas"
        >
          {skillAreas.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="skill-route"
              aria-pressed={selected === index}
              onClick={() => select(index)}
              data-cursor="TRACE"
            >
              <span className="skill-route-number mono">0{index + 1}</span>
              <span className="skill-route-content">
                <span className="skill-route-title">{item.title}</span>
                <span className="skill-tools">
                  {item.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </span>
                {selected === index && (
                  <span className="skill-route-detail" aria-live="polite">
                    {item.description}
                  </span>
                )}
              </span>
              <span className="skill-route-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
