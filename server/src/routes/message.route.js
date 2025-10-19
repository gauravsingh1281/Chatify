import express from "express";
import { getAllContacts, getChatPartners, getMessagesbyUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";
const router = express.Router();

router.use(arcjetProtection, protectRoute);
router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesbyUserId);
router.post("/send/:id", sendMessage);


export default router;