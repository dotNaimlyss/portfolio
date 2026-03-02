import type { Locale } from "../locales";
import en from "./en";
import my from "./my";
import jp from "./jp";
import th from "./th";

export const messages = {
  en,
  my,
  jp,
} satisfies Record<Locale, typeof en>;

export type MessageSchema = typeof en;
