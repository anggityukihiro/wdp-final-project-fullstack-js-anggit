import mongoose from "mongoose";

const { Schema, model } = mongoose;

const VoucherSchema = new Schema({
    voucher_code: {
        type: String,
        unique: true,
        required: [true, "Kode Voucher wajib di isi !"]
    },
  });
  

const Voucher = model("Voucher" , VoucherSchema);

export default Voucher;
