import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
}, { minimize: false, collation: 'users' });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;