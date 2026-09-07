"use client";

import { Plus, Trash2 } from "lucide-react";
import { useActionState, useState } from "react";
import type { HourEntry, PhoneEntry, ResolvedSiteSettings } from "@/lib/settings";
import { updateContactSettingsAction, type ContactSettingsState } from "./actions";

const initialState: ContactSettingsState = {};

const inputClass =
  "mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const labelClass = "block text-sm font-medium text-neutral-700";

export function ContactSettingsForm({ defaultValues }: { defaultValues: ResolvedSiteSettings }) {
  const [state, formAction, pending] = useActionState(updateContactSettingsAction, initialState);
  const [phones, setPhones] = useState<PhoneEntry[]>(defaultValues.phones);
  const [hours, setHours] = useState<HourEntry[]>(defaultValues.hours);


  function updatePhone(i: number, field: keyof PhoneEntry, value: string) {
    setPhones((prev) => prev.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  }
  function addPhone() {
    setPhones((prev) => [...prev, { labelFr: "", labelAr: "", display: "", intl: "tel:+212" }]);
  }
  function removePhone(i: number) {
    setPhones((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateHour(i: number, field: keyof HourEntry, value: string) {
    setHours((prev) => prev.map((h, idx) => (idx === i ? { ...h, [field]: value } : h)));
  }
  function addHour() {
    setHours((prev) => [...prev, { dayFr: "", dayAr: "", time: "" }]);
  }
  function removeHour(i: number) {
    setHours((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="phonesJson" value={JSON.stringify(phones)} />
      <input type="hidden" name="hoursJson" value={JSON.stringify(hours)} />

      {/* Téléphones */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800">Téléphones</legend>
        <div className="mt-3 space-y-3">
          {phones.map((p, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-lg border border-neutral-200 p-3 sm:grid-cols-5">
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Libellé (FR)</label>
                <input
                  value={p.labelFr}
                  onChange={(e) => updatePhone(i, "labelFr", e.target.value)}
                  className={inputClass}
                  placeholder="Voyages"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Libellé (AR)</label>
                <input
                  value={p.labelAr}
                  onChange={(e) => updatePhone(i, "labelAr", e.target.value)}
                  dir="rtl"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Numéro affiché</label>
                <input
                  value={p.display}
                  onChange={(e) => updatePhone(i, "display", e.target.value)}
                  dir="ltr"
                  className={inputClass}
                  placeholder="06 61 40 32 98"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs text-neutral-500">Lien d&apos;appel</label>
                <input
                  value={p.intl}
                  onChange={(e) => updatePhone(i, "intl", e.target.value)}
                  dir="ltr"
                  className={inputClass}
                  placeholder="tel:+212661403298"
                />
              </div>
              <div className="flex items-end justify-end sm:col-span-1">
                <button
                  type="button"
                  onClick={() => removePhone(i)}
                  disabled={phones.length <= 1}
                  className="rounded-lg border border-neutral-200 p-2 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                  aria-label="Supprimer ce numéro"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPhone}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
        >
          <Plus className="size-4" /> Ajouter un numéro
        </button>
      </fieldset>

      {/* WhatsApp */}
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-1 text-sm font-semibold text-neutral-800">WhatsApp</legend>
        <div>
          <label className={labelClass}>Numéro WhatsApp (format international, sans + ni espaces)</label>
          <input
            name="whatsappNumber"
            defaultValue={defaultValues.whatsappUrl.match(/wa\.me\/(\d+)/)?.[1] ?? ""}
            dir="ltr"
            required
            placeholder="212661403298"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Message pré-rempli (FR)</label>
          <input name="whatsappMessageFr" defaultValue={defaultValues.whatsappUrl.includes("text=") ? decodeURIComponent(defaultValues.whatsappUrl.split("text=")[1] ?? "") : ""} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Message pré-rempli (AR)</label>
          <input name="whatsappMessageAr" dir="rtl" className={inputClass} />
        </div>
      </fieldset>

      {/* E-mail */}
      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail de contact
        </label>
        <input id="email" name="email" type="email" required defaultValue={defaultValues.email} dir="ltr" className={inputClass} />
      </div>

      {/* Adresse */}
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-1 text-sm font-semibold text-neutral-800">Adresse</legend>
        <div>
          <label className={labelClass}>Rue (FR)</label>
          <input name="addressStreetFr" required defaultValue={defaultValues.addressStreetFr} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Rue (AR)</label>
          <input name="addressStreetAr" required dir="rtl" defaultValue={defaultValues.addressStreetAr} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ville (FR)</label>
          <input name="addressCityFr" required defaultValue={defaultValues.addressCityFr} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ville (AR)</label>
          <input name="addressCityAr" required dir="rtl" defaultValue={defaultValues.addressCityAr} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Code postal</label>
          <input name="addressPostal" required defaultValue={defaultValues.addressPostal} className={inputClass} />
        </div>
        <div />
        <div>
          <label className={labelClass}>Région / préfecture (FR)</label>
          <input name="addressRegionFr" required defaultValue={defaultValues.addressRegionFr} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Région / préfecture (AR)</label>
          <input name="addressRegionAr" required dir="rtl" defaultValue={defaultValues.addressRegionAr} className={inputClass} />
        </div>
      </fieldset>

      {/* Horaires */}
      <fieldset>
        <legend className="text-sm font-semibold text-neutral-800">Horaires d&apos;ouverture</legend>
        <div className="mt-3 space-y-3">
          {hours.map((h, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 rounded-lg border border-neutral-200 p-3">
              <input value={h.dayFr} onChange={(e) => updateHour(i, "dayFr", e.target.value)} placeholder="Lundi – Samedi" className={inputClass} />
              <input value={h.dayAr} onChange={(e) => updateHour(i, "dayAr", e.target.value)} dir="rtl" className={inputClass} />
              <div className="flex gap-2">
                <input value={h.time} onChange={(e) => updateHour(i, "time", e.target.value)} dir="ltr" placeholder="08h30 – 19h00" className={inputClass} />
                <button
                  type="button"
                  onClick={() => removeHour(i)}
                  disabled={hours.length <= 1}
                  className="shrink-0 rounded-lg border border-neutral-200 px-2.5 text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-30"
                  aria-label="Supprimer cette ligne d'horaires"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addHour}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark"
        >
          <Plus className="size-4" /> Ajouter une ligne
        </button>
      </fieldset>

      {/* Réseaux sociaux & maps */}
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-1 text-sm font-semibold text-neutral-800">Réseaux sociaux &amp; carte</legend>
        <div>
          <label className={labelClass}>Facebook</label>
          <input name="facebookUrl" dir="ltr" defaultValue={defaultValues.facebookUrl} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <input name="instagramUrl" dir="ltr" defaultValue={defaultValues.instagramUrl} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>TikTok</label>
          <input name="tiktokUrl" dir="ltr" defaultValue={defaultValues.tiktokUrl ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Lien Google Maps (itinéraire)</label>
          <input name="mapsDirectionsUrl" dir="ltr" defaultValue={defaultValues.mapsDirectionsUrl} className={inputClass} />
        </div>
      </fieldset>

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Coordonnées enregistrées et publiées sur le site.
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
