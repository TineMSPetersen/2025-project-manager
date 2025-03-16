import commissiontypeModel from "../models/commissiontypeModel.js";


const AddCommissionType = async ( req, res ) => {
  try {
    const { label, value, userId } = req.body;

  const commissiontypeData = {
    label,
    value,
    userId
  }

  const commissiontype = new commissiontypeModel(commissiontypeData)
  await commissiontype.save()

  res.json({ success: true, message: "Commission Type added!"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})
  }
}

export { AddCommissionType }