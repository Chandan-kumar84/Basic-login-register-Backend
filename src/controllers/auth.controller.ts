import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { sign, Secret } from "jsonwebtoken";

import { User } from "../models/User";
import { bad, created, ok, unauthorized } from "../utils/response";

/* ===================== TOKEN ===================== */
function signToken(userId: string): string {
  const secretEnv = process.env.JWT_SECRET;
  if (!secretEnv) throw new Error("JWT_SECRET missing in .env");

  const secret: Secret = secretEnv;

  // ✅ always value (never undefined)
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  // ✅ TS mismatch fix: cast options to any
  return sign({ userId }, secret, { expiresIn: expiresIn as any } as any);
}

/* ===================== REGISTER ===================== */
export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) return bad(res, "all fields required");
    if (password.length < 6) return bad(res, "password must be at least 6 characters");

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return bad(res, "email already registered");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    const token = signToken(user._id.toString());

    return created(res, "register successfully", {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return bad(res, "server error");
  }
}

/* ===================== LOGIN ===================== */
export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) return bad(res, "all fields required");

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return unauthorized(res, "invalid email or password");

    const match = await bcrypt.compare(password, String(user.password));
    if (!match) return unauthorized(res, "invalid email or password");

    const token = signToken(user._id.toString());

    return ok(res, "login successfully", {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return bad(res, "server error");
  }
}
