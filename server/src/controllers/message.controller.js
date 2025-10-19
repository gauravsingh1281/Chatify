import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.lib.js";
export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (error) {
        console.log("Error in getAllContacts", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessagesbyUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        });
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessagesByUserId controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        };
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send message to yourself." });
        };
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) return res.status(400).json({ message: "Reciever not found." });
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        };
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // find all the messages where the loggedIn user is either sender or receiver
        const message = await Message.find({
            $or: [
                { senderId: loggedInUserId }, { receiverId: loggedInUserId }
            ]
        });
        const chatPartnerIds = [...new Set(message.map(msg => msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()))];
        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");
        res.status(200).json(chatPartners);
    } catch (error) {
        console.log("Error in getChatPartners controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};