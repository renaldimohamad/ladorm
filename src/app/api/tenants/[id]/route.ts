import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Get old tenant data to check if room changed
    const oldTenant = await prisma.tenant.findUnique({
      where: { id },
      select: { roomId: true },
    });

    const tenant = await prisma.tenant.update({
      where: { id },
      data: body,
    });

    // Handle room status updates if room was changed
    if (body.roomId !== undefined && body.roomId !== oldTenant?.roomId) {
      // If old room existed, mark as available (assuming only one tenant per room for simplicity or handle as needed)
      if (oldTenant?.roomId) {
        // Only set to available if no other tenants are in that room
        const roomTenants = await prisma.tenant.count({
          where: { roomId: oldTenant.roomId },
        });
        if (roomTenants === 0) {
          await prisma.room.update({
            where: { id: oldTenant.roomId },
            data: { status: "available" },
          });
        }
      }
      // Set new room to occupied
      if (body.roomId) {
        await prisma.room.update({
          where: { id: body.roomId },
          data: { status: "occupied" },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Tenant updated successfully",
      data: tenant,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
