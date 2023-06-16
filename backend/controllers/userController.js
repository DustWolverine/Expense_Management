import userInfo from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userInfo.findOne({ email });
    if (!user) {
      return res.status(404).send("No user Found");
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
export const registerController = async (req, res) => {
  try {
    const newUser = new userInfo(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};
