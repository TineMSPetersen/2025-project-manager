import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  project_name: { type: String, required: true },
  customer_name: { type: String },
  customer_email: { type: String },
  customer_phone: { type: Number },
  description: { type: String },
  images: {type: Array },
  notes: {type: Array},
  paid: { type: Boolean },
  amount_paid: { type: Number },
  date: { type: Number, required: true },
  duedate: { type: Number, required: true },
  complete: { type: Boolean, default: false }
})

const projectModel = mongoose.models.project || mongoose.model("project", projectSchema)

export default projectModel;