import User from "../models/User.js";
import {encrypt_password, verify_password, generate_jsonwebtoken, generate_refreshtoken} from "../service/auth_service.js";

export const register = async (req, res, next) => {
    try {
        const {name, phone_number, email, password, conf_password} = req.body;

        let check_email = await User.findOne({email: email});
        let check_phone_number = await User.findOne({phone_number: phone_number});

        if (check_email) {
            return res.status(406).json({message: "Email sudah digunakan"});
        }
        
        else if (check_phone_number) {
            return res.status(406).json({message: "No HP sudah digunakan"});
        } 

        else if (password != conf_password) {
            return res.status(400).json({message: "Konfirmasi Password tidak sama"});
        }

        else {
            const encrypted_password = encrypt_password(password);
    
            await User.create({
                name: name,
                phone_number: phone_number,
                email: email,
                password: encrypted_password,
                conf_password: encrypted_password
            });
    
            return res.status(201).json({message: "User berhasil di buat"});
        }

    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({message: "Email tidak ditemukan!"});
        }

        const is_verify = verify_password(password, user.password);
        if (!is_verify) {
            return res.status(401).json({message: "Password tidak valid"});
        }

        const jsonwebtoken = generate_jsonwebtoken({
            email: user.email,
            _id: user._id
        });

        const refresh_token = generate_refreshtoken({
            email: user.email,
            _id: user._id
        });

        res.cookie('refreshToken', refresh_token,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        await User.updateOne(
            { _id: user._id },      
            {
              refresh_token: refresh_token
            }
          );      
    

        return res.status(200).json({token: jsonwebtoken});
    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const logout = async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        
        let user = await User.findOne({refresh_token: refreshToken});
        if (!user) {
            return res.sendStatus(204);
        }

        await User.updateOne(
            { _id: user._id },      
            {
              refresh_token: null
            }
          );      

        res.clearCookie('refreshToken');
        return res.status(200).json({message: "Logout berhasil"});
}
