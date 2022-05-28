import Voucher from "../models/Voucher.js";

export const voucher_verification = async (req, res, next) => {
  try {
    const { voucher_code } = req.body;
    let voucher = await Voucher.findOne({ voucher_code: voucher_code });
    if (voucher == null) {
      return res.status(404).json({ message: "Kode Voucher tidak valid !" });
    } 

    else{
      return res.status(200).json(voucher);
    }

  } catch (err) {
    return next(err);
  }
};
