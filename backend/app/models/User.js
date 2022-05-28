import mongoose from "mongoose";

const {Schema, model} = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Nama wajib di isi !"]
    },
    phone_number: {
        type: String,
        unique: true,
        required: [true, "No HP wajib di isi !"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email wajib di isi !"]
    },
    password: {
        type: String,
        required: [true, "Password wajib di isi !"]
    },
    conf_password: {
        type: String,
        required: [true, "Konfirmasi Password wajib di isi !"]
    },    
    refresh_token: {
        type: String
    },    

});

const User = model("User", userSchema);

export default User;