import mongoose from "mongoose";

const BBPSbillPaymentRecordSchema = new mongoose.Schema(
  {
    tx_status: {
      type: String,
      required: true,
    },
    tds: {
      type: Number,
      default: 0,
    },
    bbpstrxnrefid: {
      type: String,
      default: "",
    },
    txstatus_desc: {
      type: String,
      required: true,
    },
    utilitycustomername: {
      type: String,
      default: "",
    },
    fee: {
      type: Number,
      default: 0.0,
    },
    discount: {
      type: String,
      default: "",
    },
    tid: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    customerconveniencefee: {
      type: String,
      default: "",
    },
    commission: {
      type: Number,
      default: 0.0,
    },
    state: {
      type: String,
      required: true,
    },
    recipient_id: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    reference_tid: {
      type: String,
      default: null,
    },
    serial_number: {
      type: String,
      default: "",
    },
    customermobilenumber: {
      type: String,
      default: "",
    },
    payment_mode_desc: {
      type: String,
      default: "",
    },
    last_used_okekey: {
      type: String,
      required: true,
    },
    operator_name: {
      type: String,
      required: true,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    billnumber: {
      type: String,
      default: "",
    },
    billdate: {
      type: String,
      default: "",
    },
    status_text: {
      type: String,
      default: "",
    },
    account: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "BBPS-bill-paid-record",
  BBPSbillPaymentRecordSchema
);
