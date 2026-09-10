import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { adminSessionCookie, createAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";
import type { AdminRole } from "@/lib/content-types";

const bodySchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(256) });

export async function POST(request: Request) {
  try {
    const { email, password } = bodySchema.parse(await request.json());
    const sql = getSql();
    const users = await sql`select id, email, password_hash, name, role from admin_users where email = ${email.toLowerCase()} limit 1`;
    const user = users[0];
    if (!user || !(await compare(password, user.password_hash))) {
      return NextResponse.json({ error: "Fel e-postadress eller lösenord." }, { status: 401 });
    }
    const role = String(user.role) as AdminRole;
    if (!["admin", "editor", "medical_reviewer", "staff"].includes(role)) {
      return NextResponse.json({ error: "Adminanvändaren saknar en giltig roll." }, { status: 403 });
    }
    const token = await createAdminSession({ id: String(user.id), email: String(user.email), name: String(user.name), role });
    const response = NextResponse.json({ user: { email: user.email, name: user.name, role: user.role } });
    response.cookies.set(adminSessionCookie.name, token, adminSessionCookie.options);
    return response;
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "";
    if (message.includes("DATABASE_URL") || message.includes("ADMIN_SESSION_SECRET")) {
      return NextResponse.json(
        { error: "Adminpanelen är inte konfigurerad. Sätt DATABASE_URL och ADMIN_SESSION_SECRET i .env.local." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "Kunde inte logga in." }, { status: 400 });
  }
}
