import mongoose from "mongoose";

const commissiontypeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true }
})

const commissiontypeModel = mongoose.model.commissiontype || mongoose.model("commissiontype", commissiontypeSchema)

export default commissiontypeModel;