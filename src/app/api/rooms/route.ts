import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: { tenants: true },
      orderBy: { name: "asc" },
    });
    return NextResponse.json({
      success: true,
      message: "Data kamar berhasil diambil",
      data: rooms,
    });
  } catch (error: any) {
    console.error("Room GET error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, capacity, status } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, message: "Nama kamar wajib diisi" },
        { status: 400 }
      );
    }

    const room = await prisma.room.create({
      data: {
        name,
        capacity: capacity ? parseInt(capacity) : 2,
        status: status || "available",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Kamar berhasil dibuat",
      data: room,
    });
  } catch (error: any) {
    console.error("Room POST error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Terjadi kesalahan internal" },
      { status: 500 }
    );
  }
}
