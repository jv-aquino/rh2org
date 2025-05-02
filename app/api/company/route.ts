import prisma from "@/services/prisma";
import { NextResponse } from "next/server";
import type { Company } from "@/generated/prisma";
import { isValidDomain } from "@/utils";

export async function POST(req: Request) {
  let data: Omit<Company, "id">;
  try {
    data = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid or missing JSON body" }, { status: 400 });
  }

  if (!data.name) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  } 
  if (!data.emailDomains) {
    return NextResponse.json({ error: "At least one company email domain is required" }, { status: 400 });
  }
  if (
    !Array.isArray(data.emailDomains) ||
    !data.emailDomains.every(isValidDomain)
  ) {
    return NextResponse.json(
      { error: "emailDomains must be an array of valid domain strings" },
      { status: 400 }
    );
  }

  try {
    const company = await prisma.company.create({
      data
    });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create company", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        teams: true,
        users: true,
      },
    });
    return NextResponse.json(companies);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch companies", details: error }, { status: 500 });
  }
}
