import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    tean_name: { type: String, required: true },
    creator: { type: String, required: true },
    members: { 
      userId: { type: String, default: ""},
      member_type: { type: String, default: "member"}
    },
  },
  {
    minimize: false,
    collation: { locale: "en", strength: 2 },
  }
);

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
