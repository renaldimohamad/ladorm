import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { roomId } = body;

    if (!roomId) {
      return NextResponse.json(
        { success: false, message: "Kamar wajib dipilih" },
        { status: 400 }
      );
    }

    // 1. Fetch Registration to get tenantId
    let registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return NextResponse.json(
        { success: false, message: "Data pendaftaran tidak ditemukan" },
        { status: 404 }
      );
    }

    let tenantId = registration.tenantId;

    // FALLBACK: If tenantId is missing (legacy data), find by Name & Phone
    if (!tenantId) {
      console.log("TenantId missing, performing fallback search by phone/name");
      const tenant = await prisma.tenant.findFirst({
        where: {
          fullName: registration.fullName,
          phoneNumber: registration.phoneNumber,
        },
      });

      if (tenant) {
        tenantId = tenant.id;
        // Repair the link for future use
        await prisma.registration.update({
          where: { id },
          data: { tenantId: tenant.id },
        });
      }
    }

    if (!tenantId) {
      return NextResponse.json(
        { success: false, message: "Tenant data tidak ditemukan (Data lama atau sudah dihapus)" },
        { status: 404 }
      );
    }

    // 2. Perform updates in a transaction
    await prisma.$transaction(async (tx) => {
      // Assign Room to Tenant
      await tx.tenant.update({
        where: { id: tenantId as string },
        data: { roomId },
      });

      // Update Registration Status
      await tx.registration.update({
        where: { id },
        data: { status: "occupied" },
      });

      // Check Room Capacity and Update Status
      const room = await tx.room.findUnique({
        where: { id: roomId },
        include: { tenants: true },
      });

      if (room && room.tenants.length >= room.capacity) {
        await tx.room.update({
          where: { id: roomId },
          data: { status: "full" },
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: "Kamar berhasil ditetapkan!",
    });
  } catch (error: any) {
    console.error("Assign room error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
