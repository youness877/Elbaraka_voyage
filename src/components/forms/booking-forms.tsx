"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { interpolate } from "@/i18n/interpolate";
import { useTranslation } from "@/i18n/language-provider";
import { pick } from "@/i18n/pick";
import { cars, umrahPackages } from "@/lib/data";
import { site } from "@/lib/site";
import { createCarBookingSchema, createTripInquirySchema } from "@/lib/validation";
import { cn, formatDH } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";

const inputClass =
  "w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold";
const labelClass = "mb-1.5 block text-[0.78rem] font-bold text-primary-dark";

/* ———————————————————— RÉSERVATION DE VOITURE ———————————————————— */

type CarBookingValues = z.infer<ReturnType<typeof createCarBookingSchema>>;

export function CarBookingForm({ preselectedSlug }: { preselectedSlug?: string }) {
  const { t, locale } = useTranslation();
  const schema = useMemo(() => createCarBookingSchema(locale), [locale]);
  const b = t.forms.booking;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CarBookingValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "car", carSlug: preselectedSlug ?? "", pickupPlace: b.pickupPlaces[0], website: "" },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedSlug = watch("carSlug");
  const selectedCar = cars.find((c) => c.slug === selectedSlug);

  const onSubmit = async (values: CarBookingValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setErrorMessage(interpolate(t.validation.bookingUnavailable, { phone: site.phones[0].display }));
        setStatus("error");
        return;
      }
      setReference(data.reference ?? "—");
      setStatus("success");
      reset({ type: "car", carSlug: "", pickupPlace: b.pickupPlaces[0], website: "" });
    } catch {
      setErrorMessage(interpolate(t.validation.bookingUnavailable, { phone: site.phones[0].display }));
      setStatus("error");
    }
  };

  if (status === "success") {
    const carLabel = selectedCar?.name ?? b.carDefaultVehicle;
    const waHref =
      "https://wa.me/212661403298?text=" +
      encodeURIComponent(interpolate(b.carSuccessWaText, { ref: reference, car: carLabel }));
    return (
      <div className="rounded-3xl border border-gold/40 bg-gold/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-semibold text-primary-dark">{b.carSuccessTitle}</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          {interpolate(t.forms.contact.successText, { ref: reference })}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[0.8rem] font-bold text-white transition-colors hover:bg-[#1fbd5a]"
          >
            <WhatsAppIcon className="size-4" />
            {b.confirmWhatsapp}
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-cream transition-colors hover:bg-primary-dark"
          >
            {b.newRequest}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <input type="hidden" value="car" {...register("type")} />

      <div>
        <label htmlFor="cb-vehicle" className={labelClass}>
          {b.vehicleLabel}
        </label>
        <select id="cb-vehicle" className={inputClass} {...register("carSlug")}>
          <option value="">{b.chooseVehicle}</option>
          {cars.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} — {formatDH(c.pricePerDay)} {t.common.perDay}
            </option>
          ))}
        </select>
        {errors.carSlug && <p className="mt-1 text-xs text-red-600">{errors.carSlug.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cb-pickup-place" className={labelClass}>
            {b.pickupPlaceLabel}
          </label>
          <select id="cb-pickup-place" className={inputClass} {...register("pickupPlace")}>
            {b.pickupPlaces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cb-pickup-date" className={labelClass}>
              {b.pickupDateLabel}
            </label>
            <input id="cb-pickup-date" type="date" className={inputClass} {...register("pickupDate")} />
            {errors.pickupDate && <p className="mt-1 text-xs text-red-600">{errors.pickupDate.message}</p>}
          </div>
          <div>
            <label htmlFor="cb-dropoff-date" className={labelClass}>
              {b.dropoffDateLabel}
            </label>
            <input id="cb-dropoff-date" type="date" className={inputClass} {...register("dropoffDate")} />
            {errors.dropoffDate && <p className="mt-1 text-xs text-red-600">{errors.dropoffDate.message}</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cb-name" className={labelClass}>
            {b.fullNameLabel}
          </label>
          <input id="cb-name" type="text" placeholder={b.fullNamePlaceholderCar} className={inputClass} {...register("fullName")} />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="cb-phone" className={labelClass}>
            {b.phoneLabel}
          </label>
          <input id="cb-phone" type="tel" dir="ltr" placeholder="06 61 40 32 98" className={inputClass} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cb-email" className={labelClass}>
          {b.emailLabel}
        </label>
        <input id="cb-email" type="email" dir="ltr" placeholder={b.emailPlaceholder} className={inputClass} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="cb-notes" className={labelClass}>
          {b.notesLabelCar}
        </label>
        <textarea id="cb-notes" rows={3} placeholder={b.notesPlaceholder} className={cn(inputClass, "resize-none")} {...register("notes")} />
      </div>

      {selectedCar && (
        <p className="rounded-xl bg-sand/60 px-4 py-3 text-[0.82rem] text-charcoal/75">
          {interpolate(b.estimateText, { price: selectedCar.pricePerDay })}
        </p>
      )}

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {b.submitting}
          </>
        ) : (
          <>
            <Send className="size-4 rtl:-scale-x-100" aria-hidden />
            {b.submitCar}
          </>
        )}
      </button>
      <p className="text-[0.76rem] text-charcoal/55">{b.privacyNoteCar}</p>
    </form>
  );
}

/* ———————————————————— DEVIS VOYAGE ———————————————————— */

type TripInquiryValues = z.infer<ReturnType<typeof createTripInquirySchema>>;

export function TripInquiryForm({ preselectedSlug }: { preselectedSlug?: string }) {
  const { t, locale } = useTranslation();
  const schema = useMemo(() => createTripInquirySchema(locale), [locale]);
  const b = t.forms.booking;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TripInquiryValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "voyage",
      packageSlug: preselectedSlug ?? "",
      tripType: "omra",
      travelers: 1,
      website: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedSlug = watch("packageSlug");
  const selectedPkg = umrahPackages.find((p) => p.slug === selectedSlug);

  const onSubmit = async (values: TripInquiryValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setErrorMessage(interpolate(t.validation.bookingUnavailable, { phone: site.phones[0].display }));
        setStatus("error");
        return;
      }
      setReference(data.reference ?? "—");
      setStatus("success");
      reset({ type: "voyage", packageSlug: "", tripType: "omra", travelers: 1, website: "" });
    } catch {
      setErrorMessage(interpolate(t.validation.bookingUnavailable, { phone: site.phones[0].display }));
      setStatus("error");
    }
  };

  if (status === "success") {
    const pkgLabel = selectedPkg ? pick(locale, selectedPkg.name) : b.choosePackage;
    const waHref =
      "https://wa.me/212661403298?text=" +
      encodeURIComponent(interpolate(b.tripSuccessWaText, { ref: reference, pkg: pkgLabel }));
    return (
      <div className="rounded-3xl border border-gold/40 bg-gold/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-semibold text-primary-dark">{b.tripSuccessTitle}</h3>
        <p className="mt-2 text-sm text-charcoal/70">
          {interpolate(t.forms.contact.successText, { ref: reference })}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-2.5 text-[0.8rem] font-bold text-white transition-colors hover:bg-[#1fbd5a]"
          >
            <WhatsAppIcon className="size-4" />
            {b.confirmWhatsapp}
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-cream transition-colors hover:bg-primary-dark"
          >
            {b.newRequest}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <input type="hidden" value="voyage" {...register("type")} />

      <div>
        <label htmlFor="ti-package" className={labelClass}>
          {b.packageLabel}
        </label>
        <select id="ti-package" className={inputClass} {...register("packageSlug")}>
          <optgroup label={b.umrahGroup}>
            <option value="">{b.choosePackage}</option>
            {umrahPackages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {pick(locale, p.name)} — {formatDH(p.priceFrom)} {t.common.perPerson}
              </option>
            ))}
          </optgroup>
          <optgroup label={b.otherGroup}>
            {b.extraOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        </select>
        {errors.packageSlug && <p className="mt-1 text-xs text-red-600">{errors.packageSlug.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ti-date" className={labelClass}>
            {b.departureDateLabel}
          </label>
          <input id="ti-date" type="date" className={inputClass} {...register("departureDate")} />
        </div>
        <div>
          <label htmlFor="ti-travelers" className={labelClass}>
            {b.travelersLabel}
          </label>
          <input
            id="ti-travelers"
            type="number"
            min={1}
            max={60}
            className={inputClass}
            {...register("travelers", { valueAsNumber: true })}
          />
          {errors.travelers && <p className="mt-1 text-xs text-red-600">{errors.travelers.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ti-name" className={labelClass}>
            {b.fullNameLabel}
          </label>
          <input id="ti-name" type="text" placeholder={b.fullNamePlaceholderTrip} className={inputClass} {...register("fullName")} />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="ti-phone" className={labelClass}>
            {b.phoneLabel}
          </label>
          <input id="ti-phone" type="tel" dir="ltr" placeholder="06 61 40 32 98" className={inputClass} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="ti-email" className={labelClass}>
          {b.emailLabel}
        </label>
        <input id="ti-email" type="email" dir="ltr" placeholder={b.emailPlaceholder} className={inputClass} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="ti-notes" className={labelClass}>
          {b.notesLabelTrip}
        </label>
        <textarea id="ti-notes" rows={3} placeholder={b.notesPlaceholder} className={cn(inputClass, "resize-none")} {...register("notes")} />
      </div>

      {selectedPkg && (
        <p className="rounded-xl bg-sand/60 px-4 py-3 text-[0.82rem] text-charcoal/75">
          {interpolate(b.packageSummary, {
            name: pick(locale, selectedPkg.name),
            nights: selectedPkg.nightsMakkah + selectedPkg.nightsMadinah,
            stars: selectedPkg.hotelStars,
            distance: pick(locale, selectedPkg.distanceMakkah),
            price: selectedPkg.priceFrom,
            airline: pick(locale, selectedPkg.airline),
          })}
        </p>
      )}

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {b.submitting}
          </>
        ) : (
          <>
            <Send className="size-4 rtl:-scale-x-100" aria-hidden />
            {b.submitTrip}
          </>
        )}
      </button>
      <p className="text-[0.76rem] text-charcoal/55">{b.privacyNoteTrip}</p>
    </form>
  );
}
