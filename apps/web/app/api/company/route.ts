import { NextResponse } from 'next/server';
import prisma from '@/services/prisma';
import { formatZodErrors } from '@/utils';
import { companySchema } from '@/utils/zodSchemas';

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({
      error: 'Invalid JSON body',
      details: (err as Error).message,
    }, { status: 400 });
  }

  const parsed = companySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({
      error: 'Campos inválidos',
      details: formatZodErrors(parsed.error.format()),
    }, { status: 400 });
    
  }

  const data = parsed.data;

  try {
    const company = await prisma.company.create({
      data: {
        ...data,
        emailDomains: {
          create: data.emailDomains.map(email => ({ email })),
        },
      },
    });
    return NextResponse.json(company, { status: 201 });
  } catch (err) {
    return NextResponse.json({
      error: 'Failed to create company',
      details: (err as Error).message,
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        teams: true,
        users: true,
        emailDomains: true,
      },
    });
    return NextResponse.json(companies);
  } catch (err) {
    return NextResponse.json({
      error: 'Failed to fetch companies',
      details: (err as Error).message,
    }, { status: 500 });
  }
}
