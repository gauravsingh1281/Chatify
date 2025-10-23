import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../lib/env.lib.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
        if (!token) {
            console.log("Socket connection rejected: No token provided.");
            return next(new Error("Unauthorised - No Token Provided."));
        };

        const decodedData = jwt.verify(token, ENV.JWT_SECRET_KEY);
        if (!decodedData) {
            console.log("Socket connection rejected: Invalid Token.");
            return next(new Error("Unauthorised - Invalid Token."));
        };
        const user = await User.findById(decodedData.userId).select("-password");
        if (!user) {
            console.log("Socket connection rejected: User not found.");
            return next(new Error("User not found."));
        };

        // attach user info to socket
        socket.user = user;
        socket.userId = user._id.toString();
        console.log(`Socket authenticated for user: ${user.fullName} with id - ${user._id}`);
        next();
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorised - Authentication Failed."));
    };
};