import Ticket from "../models/Ticket.js";
import PaymentMethod from "../models/PaymentMethod.js";
import Event from "../models/Event.js";
import Voucher from "../models/Voucher.js";

export const get_ticket = async (req, res, next) => {
  try {
    const { ticket_id } = req.params;
    let ticket = await Ticket.findOne({ _id: ticket_id });
    let voucher = await Voucher.findOne({ _id: ticket.voucher_id });
    let event = await Event.findOne({ _id: ticket.event_id });
    let payment_method = await PaymentMethod.findOne({ _id: ticket.payment_method_id });
    let detail_ticket = Object.assign({id_ticket:ticket._doc._id},{status:ticket._doc.status},{proof_payment:ticket._doc.proof_payment},{price:ticket._doc.nominal},{order_date:ticket._doc.order_date},{voucher:voucher},{event:event},{payment_method:payment_method});
    
    return res.status(200).json(detail_ticket);
  } catch (err) {
    return next(err);
  }
};

export const add_ticket = async (req, res, next) => {
  try {
    const {user_id, voucher_id, event_id, payment_method_id} = req.body;
    
    let get_event = await Event.findOne({ _id: event_id });
    let get_payment_method = await PaymentMethod.findOne({ _id: payment_method_id });
    let get_voucher = await Voucher.findOne({ _id: voucher_id });

    if (get_event == null) {
      return res.status(404).json({ message: "Kode Event tidak valid !" });
    }  

    else if (get_payment_method == null) {
      return res.status(404).json({ message: "Metode Pembayaran tidak valid !" });
    }      

    else if (get_voucher == null && voucher_id != '') {
      return res.status(404).json({ message: "Kode Voucher tidak valid !" });
    }      

    else {

      const harga_tiket = 500000;
      const status_payment = 'unpaid';
      let total_nominal = harga_tiket - get_voucher._doc.cut_price;
      let order_date = new Date();
  
      let ticket = await Ticket.create({
        user_id: user_id,
        voucher_id: voucher_id,
        event_id: event_id,
        payment_method_id: payment_method_id,
        order_date: order_date,
        status: status_payment,
        confirmation_date: '',
        proof_payment: '',
        nominal: total_nominal,

      });

      return res.status(201).json(ticket);

    }

  } catch (err) {
    return next(err);
  }
};


export const update_ticket = async (req, res, next) => {
  try {
    const { proof_payment} = req.body;
    const { ticket_id } = req.params;

    let get_ticket = await Ticket.findOne({ _id: ticket_id });

    if (get_ticket == null) {
      return res.status(404).json({ message: "Kode Ticket tidak ditemukan !" });
    }
    
    else {
      const update_status = 'confirmed';
      const confirmation_date = new Date();
      let ticket = await Ticket.updateOne(
        { _id: ticket_id },      
        {
          proof_payment: proof_payment,
          status: update_status,
          confirmation_date: confirmation_date,
        }
      );      

      return res.status(200).json({message: "Pembayaran berhasil dikonfirmasi !" });
    }
  } catch (err) {
    return next(err);
  }
};