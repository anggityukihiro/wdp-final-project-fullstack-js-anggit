import User from "../models/User.js";
import {generate_jsonwebtoken} from "../service/auth_service.js";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        
        let user = await User.findOne({refresh_token: refreshToken});
        if (!user) {
            return res.sendStatus(403);
        }

        const jsonwebtoken = generate_jsonwebtoken({
            email: user.email,
            _id: user._id,
            name: user.name
        });

        return res.status(200).json({accessToken: jsonwebtoken});
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}  