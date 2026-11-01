"use client";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { saveProject } from "@/app/admin/actions";
import type { Project, FormState } from "@/lib/project";
const stories = [
  ["problem", "The problem"],
  ["contribution", "What you built"],
  ["implementation", "Inside the build"],
  ["decisions", "Decisions & tradeoffs"],
  ["lessons", "What you learned"],
] as const;
export function ProjectForm({ project }: { project?: Project }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    saveProject.bind(null, project?.id ?? null),
    {},
  );
  const [dirty, setDirty] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (!dirty || pending) return;
    const leave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    const navigate = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest("a");
      if (
        anchor &&
        anchor.origin === location.origin &&
        !anchor.hash &&
        !window.confirm("Leave without saving your project changes?")
      )
        event.preventDefault();
    };
    window.addEventListener("beforeunload", leave);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("beforeunload", leave);
      document.removeEventListener("click", navigate, true);
    };
  }, [dirty, pending]);
  useEffect(() => {
    if (state.error)
      formRef.current?.querySelector<HTMLElement>('[role="alert"]')?.focus();
  }, [state]);
  function value(name: string) {
    if (state.values?.[name] !== undefined) return state.values[name];
    if (name === "technologies") return project?.technologies.join(", ") ?? "";
    return String(
      project?.[name as keyof Project] ??
        (name === "category"
          ? "selected"
          : name === "state"
            ? "In development"
            : ""),
    );
  }
  function field(
    name: string,
    label: string,
    options: {
      required?: boolean;
      type?: string;
      max?: number;
      area?: boolean;
      full?: boolean;
      hint?: string;
    } = {},
  ) {
    const error = state.fields?.[name];
    const props = {
      id: name,
      name,
      defaultValue: value(name),
      required: options.required,
      maxLength: options.max ?? 10000,
      "aria-invalid": !!error,
      "aria-describedby": error
        ? `${name}-error`
        : options.hint
          ? `${name}-hint`
          : undefined,
    };
    return (
      <div className={`field ${options.full ? "full" : ""}`} key={name}>
        <label htmlFor={name}>
          {label}
          {options.required ? " *" : ""}
        </label>
        {options.area ? (
          <textarea {...props} rows={5} />
        ) : (
          <input {...props} type={options.type || "text"} />
        )}
        {options.hint && <small id={`${name}-hint`}>{options.hint}</small>}
        {error && (
          <small className="field-error" id={`${name}-error`}>
            {error}
          </small>
        )}
      </div>
    );
  }
  return (
    <form
      className="admin-panel project-form"
      ref={formRef}
      action={action}
      onChange={() => setDirty(true)}
    >
      <input type="hidden" name="revision" value={project?.revision ?? 0} />
      {state.error && (
        <p className="form-notice error" role="alert" tabIndex={-1}>
          {state.error}
        </p>
      )}
      {field("name", "Project name", { required: true, max: 100 })}
      {field("state", "Current state", {
        required: true,
        max: 60,
        hint: "For example: In development, Released, or Learning project.",
      })}
      {field("summary", "Short summary", {
        required: true,
        max: 400,
        area: true,
        full: true,
      })}
      <div className="field">
        <label htmlFor="category">Collection</label>
        <select id="category" name="category" defaultValue={value("category")}>
          <option value="selected">Selected work</option>
          <option value="learning">Learning archive</option>
        </select>
        {state.fields?.category && (
          <small className="field-error">{state.fields.category}</small>
        )}
      </div>
      {field("technologies", "Technologies", {
        max: 400,
        hint: "Comma-separated, for example: Next.js, PostgreSQL.",
      })}
      {field("repository", "Repository URL", { type: "url", max: 2048 })}
      {field("demo", "Demo URL", { type: "url", max: 2048 })}
      {field("image", "Image URL", {
        type: "url",
        max: 2048,
        hint: "Optional HTTPS URL. No upload service is needed.",
      })}
      {field("imageAlt", "Image description", {
        max: 250,
        hint: "Required when an image URL is supplied.",
      })}
      <h2 className="form-section-title">THE STORY / ALL SECTIONS OPTIONAL</h2>
      {stories.map(([name, label]) =>
        field(name, label, { area: true, full: true }),
      )}
      <div className="form-actions">
        <button
          className="button secondary"
          name="intent"
          value="draft"
          disabled={pending}
        >
          {pending ? "Saving…" : "Save draft"}
        </button>
        <button
          className="button primary"
          name="intent"
          value="publish"
          disabled={pending}
        >
          {pending
            ? "Saving…"
            : project?.published
              ? "Save & publish"
              : "Publish"}
        </button>
        <Link className="text-link" href="/admin">
          Cancel
        </Link>
        <span className="micro mono">
          {project?.published
            ? "Saving as draft removes it from public view."
            : "Drafts are only visible here."}
        </span>
      </div>
    </form>
  );
}
