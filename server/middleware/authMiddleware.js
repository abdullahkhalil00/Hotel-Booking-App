import User from "../models/user.js";

async function protect(req, res, next) {
    const auth = await req.auth();

  
    const { userId } = auth;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    req.user = user;
    next();
}

export default protect;