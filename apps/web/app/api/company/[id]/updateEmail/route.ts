import { NextResponse } from 'next/server';
import prisma from '@/services/prisma';
import { validateSite } from '@/utils';

interface UpdateEmailDomainsDTO {
  remove?: string[];
  add?: string[];
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

  let data: UpdateEmailDomainsDTO;
  try {
    data = await req.json();
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Invalid or missing JSON body',
        details: (err as Error).message
      },
      { status: 400 }
    );
  }

  const company = await prisma.company.findUnique({
    where: { id }
  });
  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  const { remove, add } = data;

  if (
    (remove && (!Array.isArray(remove) || !remove.every((d) => typeof d === 'string' && validateSite(d))) ||
    (add && (!Array.isArray(add) || !add.every((d) => typeof d === 'string' && validateSite(d)))))
  ) {
    return NextResponse.json(
      { error: '`add` and `remove` must be arrays of valid domain strings' },
      { status: 400 }
    );
  }

  if (add && remove) {
    const intersection = add.filter((domain) => remove.includes(domain));
    if (intersection.length > 0) {
      return NextResponse.json(
        {
          error: '`add` and `remove` cannot contain the same domains',
          conflict: intersection
        },
        { status: 400 }
      );
    }
  }

  try {
    if (remove?.length) {
      await prisma.emailDomains.deleteMany({
        where: {
          email: { in: remove },
          companyId: id
        }
      });
    }

    if (add?.length) {
      for (const domain of add) {
        try {
          await prisma.emailDomains.create({
            data: {
              email: domain,
              companyId: id
            }
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          // silently ignore duplicates
        }
      }
    }

    const updated = await prisma.company.findUnique({
      where: { id },
      include: { emailDomains: true }
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update company', details: (error as Error).message },
      { status: 500 }
    );
  }
}
