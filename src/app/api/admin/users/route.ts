import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin-auth";
import { getSql } from "@/lib/db";

const roleSchema = z.enum(["admin", "editor", "medical_reviewer", "staff"]);

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  if (!(await getAdminSession())) return errorResponse("Obehörig", 401);
  try {
    const sql = getSql();
    const users = await sql`select id, email, name, role, created_at from admin_users order by name asc`;
    return NextResponse.json({ users });
  } catch {
    return errorResponse("Användare kunde inte hämtas. Kör CMS-migrationen i Neon.", 503);
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session) return errorResponse("Obehörig", 401);
  if (session.role !== "admin") return errorResponse("Endast admin kan ändra roller.", 403);
  try {
    const payload = z.object({ userId: z.string().uuid(), role: roleSchema }).parse(await request.json());
    if (payload.userId === session.id && payload.role !== "admin") return errorResponse("Du kan inte ta bort din egen adminroll.", 409);
    const sql = getSql();
    const rows = await sql`update admin_users set role = ${payload.role}, updated_at = now() where id = ${payload.userId}::uuid returning id, email, name, role`;
    if (rows.length === 0) return errorResponse("Användaren hittades inte.", 404);
    await sql`
      insert into audit_events (actor_id, action, entity_type, entity_id, metadata)
      values (${session.id}::uuid, 'admin_role_changed', 'admin_user', ${payload.userId}, ${JSON.stringify({ role: payload.role })}::jsonb)
    `;
    return NextResponse.json({ user: rows[0] });
  } catch (caught) {
    if (caught instanceof z.ZodError) return errorResponse(caught.issues[0]?.message ?? "Ogiltig roll.");
    return errorResponse("Rollen kunde inte ändras.", 503);
  }
}
