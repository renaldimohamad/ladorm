import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({
      success: true,
      message: "Registrations fetched successfully",
      data: registrations,
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
    const { fullName, phoneNumber, university, origin, gender } = body;

    if (!fullName || !phoneNumber || !gender) {
      return NextResponse.json(
        { success: false, message: "Nama, Nomor WA, dan Jenis Kelamin wajib diisi" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        fullName,
        phoneNumber,
        university,
        origin,
        gender,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Pendaftaran berhasil terkirim!",
      data: registration,
    });
  } catch (error: any) {
    console.error("POST /api/registrations error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
