"use client";

import React, { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const response = await fetch("/api/contact-messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setErrorMessage(result.error ?? "Message could not be sent.");
      return;
    }

    setForm(initialFormState);
    setStatus("sent");
  };

  return (
    <section className="mx-auto max-w-4xl py-10">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">
          Contact
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
          Send me a message
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
          Feel free to contact.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/25"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Name
            </span>
            <input
              value={form.name}
              onChange={updateField("name")}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              maxLength={80}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email
            </span>
            <input
              value={form.email}
              onChange={updateField("email")}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              maxLength={120}
              required
              type="email"
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Subject
          </span>
          <input
            value={form.subject}
            onChange={updateField("subject")}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            maxLength={120}
            required
          />
        </label>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Message
          </span>
          <textarea
            value={form.message}
            onChange={updateField("message")}
            className="mt-2 min-h-40 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            maxLength={3000}
            required
          />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            disabled={status === "sending"}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            type="submit"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
              Message sent. Thank you.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm font-semibold text-red-600 dark:text-red-300">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default ContactPage;
