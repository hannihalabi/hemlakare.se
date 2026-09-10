import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { AdminRole } from "@/lib/content-types";

const cookieName = "hemlakare_admin_session";

export type AdminSession = { id: string; email: string; name: string; role: AdminRole };

function sessionKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET måste vara minst 32 tecken");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(session: AdminSession) {
  return new SignJWT(session)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(sessionKey());
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, sessionKey());
    if (
      typeof payload.id !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      !["admin", "editor", "medical_reviewer", "staff"].includes(String(payload.role))
    ) return null;
    return { id: payload.id, email: payload.email, name: payload.name, role: payload.role as AdminRole };
  } catch {
    return null;
  }
}

export const adminSessionCookie = {
  name: cookieName,
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  },
};
