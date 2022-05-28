import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ticketSchema = new Schema({
  user_id: {
    type: String,
    required: [true, "User ID WAJIB di isi !"],
    unique: true,
  },
  event_id: {
    type: String,
    required: [true, "Event WAJIB di isi !"],
    },
  payment_method_id: {
    type: String,
    required: [true, "Metode Pembayaran WAJIB di isi !"],
    },
  voucher_id: {
    type: String
    },
  status: {
    type: String,
    required: [true, "Status WAJIB di isi !"],
    },
  nominal: {
    type: String,
    required: [true, "Nominal WAJIB di isi !"],
    },
  order_date: {
    type: Date,
    required: [true, "Order Date WAJIB di isi !"],
    },
  confirmation_date: {
    type: Date
    },
  proof_payment: {
    type: String
    }
});

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
