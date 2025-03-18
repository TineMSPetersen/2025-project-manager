import userModel from "../models/userModel.js";

const AddCommissionType = async (req, res) => {
  try {
    const { label, value, userId } = req.body;

    const type = {
      label,
      value,
    };

    console.log(label, value)

    
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (!user.commission_info.types) {
      user.commission_info.types = [];
    }

    user.commission_info.types.push(type);

    await user.save();

    res.json({ success: true, message: "Commission Type added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { AddCommissionType };