import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  commission_info: {
    currency: { type: String, default: "USD" },
    types: { type: Array, default: [] },
    fees: { type: Array, default: [] }
  }
}, { 
  minimize: false, 
  collation: { locale: "en", strength: 2 }
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;