import jsonwebtoken from "jsonwebtoken";
import {SECRET_KEY} from "../config.js";

const validate_token = (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        const token = authorization && authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({message: "Token wajib di sertakan!"});
        }

        const payload = jsonwebtoken.verify(token, SECRET_KEY);
        if (!token) {
            return res.status(401).json({message: "Token tidak valid"});
        }

        req.payload = payload;
        
        return next();
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

export default validate_token;