import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      include: { room: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      message: "Data penghuni berhasil diambil",
      data: tenants,
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
    const { fullName, phoneNumber, university, origin, status, roomId } = body;

    if (!fullName || !phoneNumber || !university || !origin || !status) {
      return NextResponse.json(
        { success: false, message: "Field wajib belum lengkap (Nama, HP, Univ, Asal, Status)" },
        { status: 400 }
      );
    }

    // 1. If room is assigned, validate capacity
    if (roomId) {
      const room = await prisma.room.findUnique({
        where: { id: roomId },
        include: { tenants: true },
      });

      if (!room) {
        return NextResponse.json(
          { success: false, message: "Kamar tidak ditemukan" },
          { status: 404 }
        );
      }

      if (room.tenants.length >= room.capacity) {
        return NextResponse.json(
          { success: false, message: `Kamar ${room.name} sudah penuh (Kapasitas: ${room.capacity})` },
          { status: 400 }
        );
      }
    }

    // 2. Create tenant in transaction with room status update
    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          fullName,
          phoneNumber,
          university,
          origin,
          status,
          roomId: roomId || null,
        },
      });

      if (roomId) {
        const room = await tx.room.findUnique({
          where: { id: roomId },
          include: { tenants: true },
        });

        // Update status to 'full' if capacity reached
        if (room && room.tenants.length >= room.capacity) {
          await tx.room.update({
            where: { id: roomId },
            data: { status: "full" },
          });
        }
      }

      return tenant;
    });

    return NextResponse.json({
      success: true,
      message: "Penghuni berhasil ditambahkan",
      data: result,
    });
  } catch (error: any) {
    console.error("Tenant creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
