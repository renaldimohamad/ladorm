import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: { tenant: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      message: "Data pembayaran berhasil diambil",
      data: payments,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId, amount, dueDate, periodStart, periodEnd } = body;

    if (!tenantId || !amount || !dueDate) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap (Penghuni, Nominal, Tenggat)" },
        { status: 400 }
      );
    }

    const payment = await prisma.payment.create({
      data: {
        tenantId,
        amount: parseInt(amount),
        dueDate: new Date(dueDate),
        periodStart: periodStart ? new Date(periodStart) : null,
        periodEnd: periodEnd ? new Date(periodEnd) : null,
        status: "unpaid",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tagihan pembayaran berhasil dibuat",
      data: payment,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
