import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_PRICING: Record<string, number> = {
  mahasiswa: 50,
  alumni: 100,
  tamu: 150,
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { tenantStatus } = body;

    if (!tenantStatus) {
      return NextResponse.json(
        { success: false, message: "Status penghuni wajib dipilih" },
        { status: 400 }
      );
    }

    // 1. Fetch Price from DB or fallback
    let amount = DEFAULT_PRICING[tenantStatus];
    try {
      const pricingRecord = await prisma.pricing.findUnique({
        where: { type: tenantStatus },
      });
      if (pricingRecord) {
        amount = pricingRecord.price;
      }
    } catch (e) {
      console.warn("Could not fetch pricing from DB, using fallback");
    }

    // 2. Find the registration
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Pendaftaran tidak ditemukan" },
        { status: 404 }
      );
    }

    // 3. Create Tenant & Payment & Update Registration in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create Tenant
      const tenant = await tx.tenant.create({
        data: {
          fullName: registration.fullName,
          phoneNumber: registration.phoneNumber,
          university: registration.university,
          origin: registration.origin,
          status: tenantStatus,
        },
      });

      // Create Payment
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30); // Due in 30 days

      const payment = await tx.payment.create({
        data: {
          tenantId: tenant.id,
          amount: amount,
          status: "unpaid",
          dueDate: dueDate,
        },
      });

      // Update Registration
      await tx.registration.update({
        where: { id },
        data: { 
          status: "approved",
          tenantId: tenant.id
        },
      });

      return { tenant, payment };
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran disetujui, tagihan otomatis dibuat",
      data: result,
    });
  } catch (error: any) {
    console.error("Approval error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
