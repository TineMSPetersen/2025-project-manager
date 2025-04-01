import userModel from "../models/userModel.js";

const AddCommissionType = async (req, res) => {
  try {
    const { label, value, add_character, userId } = req.body;

    const type = {
      label,
      value: Number(value),
      add_character: Number(add_character),
    };

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
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

const DeleteCommissionType = async (req, res) => {
  const { userId, index } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    user.commission_info.types.splice(index, 1);

  await user.save();
  res.json({ success: true, message: "Commission Type Removed!" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const AddCommissionFee = async (req, res) => {
  try {
    const { label, value, type, userId } = req.body;

    const fee = { type, label, value };

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    if (!user.commission_info) {
      user.commission_info = {};
    }
    if (!user.commission_info.fees) {
      user.commission_info.fees = [];
    }

    user.commission_info.fees.push(fee);
    await user.save();

    res.json({ success: true, message: "Commission Fee added!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const DeleteCommissionFee = async (req, res) => {
  const { userId, index } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    user.commission_info.fees.splice(index, 1);

  await user.save();
  res.json({ success: true, message: "Commission Fee Removed!" });
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const GetCommissionInfo = async (req, res) => {
  try {
    const { userId } = req.body;

    const commissionData = await userModel.findOne(
      { _id: userId },
      { commission_info: 1 }
    );

    res.json({ success: true, commissionData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { AddCommissionType, AddCommissionFee, GetCommissionInfo, DeleteCommissionType, DeleteCommissionFee };
