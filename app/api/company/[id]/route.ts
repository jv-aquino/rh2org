import prisma from "@/services/prisma";
import { NextResponse } from "next/server";
import type { Company } from "@/generated/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: params.id },
    });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch company", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  let data: Omit<Company, "id">;
  try {
    data = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
  }

  const company = await prisma.company.findUnique({
    where: { id: params.id },
  });
  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  try {
    const updated = await prisma.company.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update company", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.company.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete company", details: (error as Error).message },
      { status: 500 }
    );
  }
}
