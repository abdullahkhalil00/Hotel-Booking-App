import { Webhook } from "svix";
import User from "../models/user.js";

const clerkWebhook = async (req, res) => {
    try {
        console.log("========== WEBHOOK HIT ==========");

        console.log("Webhook Secret:", process.env.CLERK_WEBHOOK_SECRET);

        console.log("Headers:");
        console.log("svix-id:", req.headers["svix-id"]);
        console.log("svix-timestamp:", req.headers["svix-timestamp"]);
        console.log("svix-signature:", req.headers["svix-signature"]);

        console.log("Raw Body:");
        console.log(req.rawBody);

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        console.log("Verifying webhook...");

        await whook.verify(req.rawBody, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        console.log("Webhook Verified Successfully");

        const { data, type } = req.body;

        console.log("Webhook Type:", type);
        console.log("Webhook Data:", data);

        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };

                console.log("Creating User...");
                console.log(userData);

                const user = await User.create(userData);

                console.log("User Saved Successfully");
                console.log(user);

                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    username: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };

                console.log("Updating User...");

                await User.findByIdAndUpdate(data.id, userData);

                console.log("User Updated");

                break;
            }

            case "user.deleted": {
                console.log("Deleting User...");

                await User.findByIdAndDelete(data.id);

                console.log("User Deleted");

                break;
            }

            default:
                console.log("Unhandled Event:", type);
        }

        res.status(200).json({
            success: true,
            message: "Webhook received",
        });

    } catch (error) {
        console.log("========== ERROR ==========");
        console.error(error);
        console.log("Error Message:", error.message);

        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export default clerkWebhook;














//    await whook.verify(req.rawBody || JSON.stringify(req.body), headers)
