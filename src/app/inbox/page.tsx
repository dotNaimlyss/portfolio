"use client";

import React, { FormEvent, useEffect, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const InboxPage: React.FC = () => {
  const [key, setKey] = useState("");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedKey = window.sessionStorage.getItem("portfolio-inbox-key");

    if (savedKey) {
      setKey(savedKey);
      loadMessages(savedKey);
    }
  }, []);

  const loadMessages = async (inboxKey = key) => {
    setStatus("loading");
    setErrorMessage("");

    const response = await fetch("/api/contact-messages", {
      headers: {
        "x-inbox-key": inboxKey,
      },
      cache: "no-store",
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setErrorMessage(
        response.status === 401
          ? "Your inbox key is missing or incorrect."
          : result.error ?? "Messages could not be loaded.",
      );
      return;
    }

    window.sessionStorage.setItem("portfolio-inbox-key", inboxKey);
    setMessages(result.messages ?? []);
    setStatus("ready");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadMessages();
  };

  const deleteMessage = async (id: string) => {
    const response = await fetch("/api/contact-messages", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-inbox-key": key,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      setErrorMessage("Message could not be deleted.");
      setStatus("error");
      return;
    }

    setMessages((current) => current.filter((message) => message.id !== id));
  };

  return (
    <section className="mx-auto max-w-5xl py-10">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-600 dark:text-sky-300">
            Private inbox
          </p>
          <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl dark:text-white">
            Contact messages
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-slate-300">
            Enter your <code>CONTACT_INBOX_KEY</code> value to read messages
            sent from the portfolio contact form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:w-auto">
          <input
            value={key}
            onChange={(event) => setKey(event.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/15 sm:w-72 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Inbox key"
            type="password"
          />
          <button
            className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            disabled={status === "loading" || !key}
            type="submit"
          >
            {status === "loading" ? "Loading" : "Open"}
          </button>
        </form>
      </div>

      {status === "error" && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage}
        </div>
      )}

      {status === "ready" && messages.length === 0 && (
        <div className="rounded-2xl border border-white/60 bg-white/80 p-8 text-center text-slate-700 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300">
          No messages yet.
        </div>
      )}

      <div className="space-y-4">
        {messages.map((message) => (
          <article
            key={message.id}
            className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/25"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950 dark:text-white">
                  {message.subject}
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  From{" "}
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {message.name}
                  </span>{" "}
                  &lt;
                  <a
                    className="text-sky-600 hover:underline dark:text-sky-300"
                    href={`mailto:${message.email}`}
                  >
                    {message.email}
                  </a>
                  &gt;
                </p>
                <time className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
                  {new Date(message.createdAt).toLocaleString()}
                </time>
              </div>

              <button
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                onClick={() => deleteMessage(message.id)}
                type="button"
              >
                Delete
              </button>
            </div>

            <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
              {message.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default InboxPage;
