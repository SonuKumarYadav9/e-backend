import mongoose from "mongoose";

const billFetchRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    bbpstrxnrefid: {
      type: String,
      default: "",
    },
    ifsc_status: {
      type: Number,
      required: true,
    },
    utilitycustomername: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    billfetchresponse: {
      type: String,
      default: "",
    },
    geocode: {
      type: String,
      required: true,
    },
    billdate: {
      type: String,
      required: true,
    },
    customer_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("bbps-billFetchRecord", billFetchRecordSchema);
