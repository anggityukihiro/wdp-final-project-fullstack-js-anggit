import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import {SECRET_KEY} from "../config.js";
import {REFRESH_TOKEN} from "../config.js";

export const encrypt_password = (password) => {
    const encrypted_password = bcryptjs.hashSync(password, 10);

    return encrypted_password;
}

export const verify_password = (password, encrypted_password) => {
    const is_verify = bcryptjs.compareSync(password, encrypted_password);

    return is_verify;
}

export const generate_jsonwebtoken = (payload) => {
    return jsonwebtoken.sign(payload, SECRET_KEY, {expiresIn: "30s"});
}

export const generate_refreshtoken = (payload) => {
    return jsonwebtoken.sign(payload, REFRESH_TOKEN, {expiresIn: "1d"});
}