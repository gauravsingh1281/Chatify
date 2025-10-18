import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.lib.js";

export const generateToken = (userId, res) => {
    const { JWT_SECRET_KEY } = ENV;
    if (!JWT_SECRET_KEY) throw new Error("JWT Secret key is not configured.")
    const token = jwt.sign({ userId }, JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV.NODE_ENV === "development" ? false : true,
    });
    return token;
}