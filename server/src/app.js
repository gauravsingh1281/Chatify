import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from './routes/message.route.js';
import { connectDb } from "./lib/db.lib.js";
import { ENV } from "./lib/env.lib.js";
const app = express();


app.use(cookieParser());
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
// Do not define a root route here; SPA catch-all will be configured below

const port = ENV.PORT || 3000;
// Compute project root from current file (server/src)
const projectRoot = path.resolve(__dirname, "..", "..");
const distDir = path.join(projectRoot, "client", "dist");
const indexFile = path.join(distDir, "index.html");

if (fs.existsSync(indexFile)) {
    console.log("Serving static files from:", distDir);
    app.use(express.static(distDir));
    // Use a RegExp catch-all compatible with Express 5 / path-to-regexp v8
    app.get(/.*/, (req, res) => {
        res.sendFile(indexFile);
    });
} else {
    console.warn("client build not found:", indexFile);
    console.warn("Tip: run 'npm run build' in the client folder.");
    // Development health route when no client build is present
    app.get("/", (req, res) => {
        res.send("hello");
    });
}

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
    connectDb();
})