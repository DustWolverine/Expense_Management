import userInfo from "../models/userModel.js";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userInfo.findOne({ email, password });
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.stauts(400).json({
      success: false,
      error,
    });
  }
};
const registerController = async (req, res) => {
  try {
    const newUser = new userInfo(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
export default loginController;
export { registerController };
