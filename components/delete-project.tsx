"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteProject } from "@/app/admin/actions";
function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <button className="button danger" disabled={pending}>
      {pending ? "Deleting…" : "Confirm delete"}
    </button>
  );
}
export function DeleteProject({
  id,
  revision,
  name,
}: {
  id: string;
  revision: number;
  name: string;
}) {
  const [confirm, setConfirm] = useState(false);
  if (!confirm)
    return (
      <button
        type="button"
        className="button secondary"
        onClick={() => setConfirm(true)}
      >
        Delete
      </button>
    );
  return (
    <div className="delete-confirm">
      <span>Delete “{name}” permanently?</span>
      <form action={deleteProject.bind(null, id, revision)}>
        <DeleteButton />
      </form>
      <button
        type="button"
        className="button secondary"
        onClick={() => setConfirm(false)}
      >
        Cancel
      </button>
    </div>
  );
}
