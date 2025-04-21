import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    tean_name: { type: String, required: true },
    team_avatar: { type: String, default: ""},
    owner: { type: String, required: true },
    members: { 
      member_email: { type: String, default: ""},
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
