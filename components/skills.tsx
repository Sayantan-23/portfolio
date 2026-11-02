"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SkillPopover } from "./skill-popover";
import { skillDetails } from "@/lib/skill-details";
import { skillAreas } from "@/lib/skills";
import { SectionLabel } from "./shell";

export function Skills() {
  const [selected, select] = useState(0);
  const area = skillAreas[selected];
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    area: string;
    anchor: HTMLButtonElement;
  } | null>(null);
  const hoveringPopover = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);
  const closePopover = useCallback(() => {
    cancelClose();
    hoveringPopover.current = false;
    setActiveSkill(null);
  }, [cancelClose]);
  function showSkill(name: string, area: string, anchor: HTMLButtonElement) {
    cancelClose();
    hoveringPopover.current = false;
    setActiveSkill({ name, area, anchor });
  }
  function leaveSkill() {
    cancelClose();
    if (activeSkill?.anchor === document.activeElement) return;
    closeTimer.current = setTimeout(closePopover, 120);
  }
  useEffect(() => cancelClose, [cancelClose]);
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
            <article
              className="skill-route"
              data-selected={selected === index}
              key={item.id}
            >
              <button
                type="button"
                className="skill-route-select"
                aria-pressed={selected === index}
                onClick={() => select(index)}
                data-cursor="TRACE"
              >
                <span className="skill-route-number mono">0{index + 1}</span>
                <span className="skill-route-title">{item.title}</span>
                <span className="skill-route-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
              <ul className="skill-tools" aria-label={`${item.title} tools`}>
                {item.tools.map((tool) => (
                  <li key={tool} onPointerLeave={leaveSkill}>
                    <button
                      type="button"
                      className="skill-chip"
                      aria-describedby={
                        activeSkill?.name === tool ? "skill-popover" : undefined
                      }
                      onPointerEnter={(event) => {
                        if (event.pointerType !== "touch")
                          showSkill(tool, item.title, event.currentTarget);
                      }}
                      onFocus={(event) =>
                        showSkill(tool, item.title, event.currentTarget)
                      }
                      onBlur={() => {
                        if (!hoveringPopover.current) closePopover();
                      }}
                      onClick={(event) => {
                        showSkill(tool, item.title, event.currentTarget);
                      }}
                      data-cursor="DETAILS"
                    >
                      <span
                        className="skill-icon"
                        style={{
                          maskImage: `url(/icons/${skillDetails[tool].icon}.svg)`,
                        }}
                        aria-hidden="true"
                      />
                      {tool}
                    </button>
                  </li>
                ))}
              </ul>
              {selected === index && (
                <p className="skill-route-detail">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
      {activeSkill && (
        <SkillPopover
          key={activeSkill.name}
          {...activeSkill}
          onClose={closePopover}
          onEnter={() => {
            hoveringPopover.current = true;
            cancelClose();
          }}
          onLeave={() => {
            hoveringPopover.current = false;
            leaveSkill();
          }}
        />
      )}
    </section>
  );
}
