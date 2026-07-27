import User from "../models/user.js";

async function protect(req, res, next) {
    console.log("req.auth:", req.auth);

    const { userId } = req.auth || {};

    console.log("userId:", userId);
    console.log("Authorization:", req.headers.authorization);
    console.log("req.auth:", req.auth);

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }

    const user = await User.findById(userId);

    console.log("user:", user);

    req.user = user;
    next();
}

export default protect;