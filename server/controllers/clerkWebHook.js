import { Webhook } from 'svix'
import User from "../models/user.js";
const clerkWebhook = async (req, res) => {
    try {
       

        // Create a Svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // Geeting Headers 
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }
        // Verify 
        await whook.verify(req.rawBody || JSON.stringify(req.body), headers)

        // Getting Data from request body
        const { data, type } = req.body
        
        // Switch case for differeent types
        switch (type) {
            case "user.created": {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    username: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };

                await User.create(userData);
                break;
            }

            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    username: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };

                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case "user.deleted":
                await User.findByIdAndDelete(data.id);
                break;
        }
        res.json({
            success: true,
            message: "Webhook received"
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}
export default clerkWebhook