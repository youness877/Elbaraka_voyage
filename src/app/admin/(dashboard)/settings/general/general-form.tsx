"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import type { ResolvedSiteSettings } from "@/lib/settings";
import { updateGeneralSettingsAction, type GeneralSettingsState } from "./actions";

const initialState: GeneralSettingsState = {};

export function GeneralSettingsForm({ defaultValues }: { defaultValues: ResolvedSiteSettings }) {
  const [state, formAction, pending] = useActionState(updateGeneralSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="siteName" className="block text-sm font-medium text-neutral-700">
          Nom du site
        </label>
        <input
          id="siteName"
          name="siteName"
          type="text"
          required
          defaultValue={defaultValues.siteName}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <ImageUploadField
        name="logoUrl"
        label="Logo"
        folder="general"
        defaultValue={defaultValues.logoUrl}
        hint="Remplace le logo texte affiché dans l'en-tête et le pied de page. Laissez vide pour garder le logo par défaut."
      />

      <ImageUploadField
        name="faviconUrl"
        label="Favicon"
        folder="general"
        defaultValue={defaultValues.faviconUrl}
        hint="Petite icône affichée dans l'onglet du navigateur."
      />

      <div>
        <label htmlFor="footerCopyrightNote" className="block text-sm font-medium text-neutral-700">
          Mention complémentaire du pied de page
        </label>
        <input
          id="footerCopyrightNote"
          name="footerCopyrightNote"
          type="text"
          maxLength={200}
          defaultValue={defaultValues.footerCopyrightNote ?? ""}
          placeholder="Optionnel — ex. « Agréée ministère du Tourisme »"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Réglages enregistrés et publiés sur le site.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer et publier"}
      </button>
    </form>
  );
}
