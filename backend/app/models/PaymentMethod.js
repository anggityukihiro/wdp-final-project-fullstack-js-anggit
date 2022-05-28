import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PaymentMethodSchema = new Schema({
    name: {
        type: String,
    },
  });
  

const PaymentMethod = model("PaymentMethod" , PaymentMethodSchema);

export default PaymentMethod;
