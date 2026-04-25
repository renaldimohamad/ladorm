import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    let { username, password } = await request.json();
    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }



    await login({
      id: admin.id,
      username: admin.username,
      name: admin.name,
    });

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
