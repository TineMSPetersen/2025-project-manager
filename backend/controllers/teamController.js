import teamModel from "../models/teamModel.js";
import { v2 as cloudinary } from "cloudinary";

const addTeam = async (req, res) => {
  try {
    const {
      team_name,
      userId,
      members
    } = req.body;

    
    // Upload avatar
    const avatar = req.files && req.files.avatar ? req.files.avatar[0] : null;

    let imageUrl = null;

    if (avatar && avatar.path) {
      const result = await cloudinary.uploader.upload(avatar.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    // Create team data
    const teamData = {
      team_name,
      team_avatar: imageUrl,
      owner: userId,
      members: JSON.parse(members),
      date: Date.now()
    }

    console.log(teamData);

    const team = new teamModel(teamData)
    await team.save();

    res.json({ success: true, message: "Team added!" });
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message });
  }
}

export { addTeam }