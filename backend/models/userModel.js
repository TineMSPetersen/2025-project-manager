import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  commission_info: {
    type: {
      types: { type: Array, default: [] }
    },
    default: {}
  }
}, { 
  minimize: false, 
  collation: { locale: "en", strength: 2 }
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;