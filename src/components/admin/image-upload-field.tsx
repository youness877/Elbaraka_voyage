"use client";

import { useRef, useState } from "react";

interface ImageUploadFieldProps {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string | null;
  hint?: string;
}

/**
 * Champ d'upload d'image réutilisable pour l'admin : l'admin choisit un
 * fichier, il est envoyé à /api/admin/upload (Cloudinary côté serveur),
 * et l'URL sécurisée retournée est stockée dans un champ caché `name`
 * soumis avec le reste du formulaire. L'admin ne voit ni ne manipule
 * jamais d'URL brute.
 */
export function ImageUploadField({ name, label, folder, defaultValue, hint }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Échec de l'envoi de l'image.");
      }

      setUrl(data.url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Échec de l'envoi de l'image.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700">{label}</label>
      {hint && <p className="mt-0.5 text-xs text-neutral-400">{hint}</p>}

      <input type="hidden" name={name} value={url} />

      <div className="mt-2 flex items-center gap-4">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element -- prévisualisation d'une image distante (Cloudinary), pas d'optimisation nécessaire ici
          <img src={url} alt="" className="h-16 w-16 rounded-lg border border-neutral-200 object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-neutral-300 text-[0.65rem] text-neutral-400">
            Aucune image
          </div>
        )}

        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleFileChange}
            className="block text-sm text-neutral-600 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-neutral-700 hover:file:bg-neutral-200"
          />
          {status === "uploading" && <p className="mt-1 text-xs text-neutral-500">Envoi en cours…</p>}
          {status === "error" && error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="mt-1 text-xs font-medium text-neutral-500 underline hover:text-neutral-700"
            >
              Retirer l&apos;image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
