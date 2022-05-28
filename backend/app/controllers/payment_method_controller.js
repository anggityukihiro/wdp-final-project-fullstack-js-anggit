import PaymentMethod from "../models/PaymentMethod.js";

export const get_payment_methods = async (req, res, next) => {
  try {
    let paymentmethods = await PaymentMethod.find({});

    return res.status(200).json(paymentmethods);
  } catch (err) {
    return next(err);
  }
};
