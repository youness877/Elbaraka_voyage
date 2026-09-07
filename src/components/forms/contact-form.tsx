"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { interpolate } from "@/i18n/interpolate";
import { useTranslation } from "@/i18n/language-provider";
import { site } from "@/lib/site";
import { createContactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

export function ContactForm() {
  const { t, locale } = useTranslation();
  const schema = useMemo(() => createContactSchema(locale), [locale]);
  const subjects = t.forms.contact.subjects;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { subject: subjects[0], website: "" },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [reference, setReference] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setErrorMessage(interpolate(t.forms.contact.genericError, { phone: site.phones[0].display }));
        setStatus("error");
        return;
      }
      setReference(data.reference ?? "—");
      setStatus("success");
      reset({ subject: subjects[0], website: "" });
    } catch {
      setErrorMessage(interpolate(t.forms.contact.genericError, { phone: site.phones[0].display }));
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-gold/40 bg-gold/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-gold" aria-hidden />
        <h3 className="mt-4 font-display text-xl font-semibold text-primary-dark">
          {t.forms.contact.successTitle}
        </h3>
        <p className="mt-2 text-sm text-charcoal/70">
          {interpolate(t.forms.contact.successText, { ref: reference })}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.8rem] font-bold uppercase tracking-wider text-cream transition-colors hover:bg-primary-dark"
        >
          {t.forms.contact.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-[0.78rem] font-bold text-primary-dark">
            {t.forms.contact.nameLabel}
          </label>
          <input
            id="cf-name"
            type="text"
            placeholder={t.forms.contact.namePlaceholder}
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            {...register("name")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-[0.78rem] font-bold text-primary-dark">
            {t.forms.contact.phoneLabel}
          </label>
          <input
            id="cf-phone"
            type="tel"
            dir="ltr"
            placeholder="06 61 40 32 98"
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            {...register("phone")}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-[0.78rem] font-bold text-primary-dark">
            {t.forms.contact.emailLabel}
          </label>
          <input
            id="cf-email"
            type="email"
            dir="ltr"
            placeholder={t.forms.contact.emailPlaceholder}
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-subject" className="mb-1.5 block text-[0.78rem] font-bold text-primary-dark">
            {t.forms.contact.subjectLabel}
          </label>
          <select
            id="cf-subject"
            className="w-full rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
            {...register("subject")}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-[0.78rem] font-bold text-primary-dark">
          {t.forms.contact.messageLabel}
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder={t.forms.contact.messagePlaceholder}
          className="w-full resize-none rounded-xl border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-gold-light via-gold to-[#b8960c] px-7 py-3.5 text-sm font-extrabold uppercase tracking-wider text-primary-ink shadow-gold transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {t.forms.contact.submitting}
          </>
        ) : (
          <>
            <Send className="size-4 rtl:-scale-x-100" aria-hidden />
            {t.forms.contact.submit}
          </>
        )}
      </button>
    </form>
  );
}
