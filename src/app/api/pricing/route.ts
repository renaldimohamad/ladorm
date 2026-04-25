import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const pricing = await prisma.pricing.findMany();
    return NextResponse.json({
      success: true,
      message: "Data tarif berhasil diambil",
      data: pricing,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
