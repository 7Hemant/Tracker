import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  username: string;
  password: string; // hashed password
}

const users: User[] = [
  { id: 1, username: "test", password: "$2a$10$somethinghashed" }, // bcrypt-hashed password
];

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const user = users.find((u) => u.username === username);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Sign JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "your-secret", {
    expiresIn: "1h",
  });

  return NextResponse.json({ token }, { status: 200 });
}
