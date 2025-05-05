import prisma from '@/services/prisma';
import { companySchema } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        teams: true,
        users: true,
        emailDomains: true
      }
    });
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }
    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch company', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: 'Company ID is required' },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Invalid or missing JSON body',
        details: (err as Error).message
      },
      { status: 400 }
    );
  }

  const parsed = companySchema.partial().safeParse(
    typeof body === 'object' && body !== null ? { ...body, emailDomains: undefined } : {}
  );
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.format()
      },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.company.update({
      data: { ...parsed.data, emailDomains: undefined },
      where: { id }
    });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to update company', details: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const company = await prisma.company.findUnique({
    where: { id }
  });
  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  try {
    await prisma.emailDomains.deleteMany({
      where: { companyId: id }
    });
    await prisma.company.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to delete company', details: (err as Error).message },
      { status: 500 }
    );
  }
}
