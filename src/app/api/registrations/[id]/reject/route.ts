import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json().catch(() => ({}));
    const { reason } = body;

    const registration = await prisma.registration.update({
      where: { id },
      data: { 
        status: "rejected",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration rejected successfully",
      data: registration,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
