import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    team_name: { type: String, required: true },
    team_avatar: { type: String, default: ""},
    owner: { type: String, required: true },
    members: [
    {
      email: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
    date: { type: Number, required: true },
  },
  {
    minimize: false,
    collation: { locale: "en", strength: 2 },
  }
);

const teamModel = mongoose.models.team || mongoose.model("team", teamSchema);

export default teamModel;
