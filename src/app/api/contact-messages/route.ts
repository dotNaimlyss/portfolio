import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const dataDirectory = path.join(process.cwd(), "data");
const messagesFile = path.join(dataDirectory, "contact-messages.json");

const getInboxKey = () => process.env.CONTACT_INBOX_KEY;

const readMessages = async (): Promise<ContactMessage[]> => {
  try {
    const file = await fs.readFile(messagesFile, "utf8");
    const parsed = JSON.parse(file);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
};

const writeMessages = async (messages: ContactMessage[]) => {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), "utf8");
};

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const isAuthorized = (request: NextRequest) => {
  const inboxKey = getInboxKey();

  if (!inboxKey) {
    return false;
  }

  const providedKey =
    request.headers.get("x-inbox-key") ??
    request.nextUrl.searchParams.get("key") ??
    "";

  return providedKey === inboxKey;
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  const name = cleanText(body?.name, 80);
  const email = cleanText(body?.email, 120);
  const subject = cleanText(body?.subject, 120);
  const message = cleanText(body?.message, 3000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const messages = await readMessages();
  const nextMessage: ContactMessage = {
    id: crypto.randomUUID(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  };

  await writeMessages([nextMessage, ...messages]);

  return NextResponse.json({ ok: true });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await readMessages();

  return NextResponse.json({ messages });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = cleanText(body?.id, 80);

  if (!id) {
    return NextResponse.json({ error: "Missing message id." }, { status: 400 });
  }

  const messages = await readMessages();
  const nextMessages = messages.filter((message) => message.id !== id);

  await writeMessages(nextMessages);

  return NextResponse.json({ ok: true });
}
