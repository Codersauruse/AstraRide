import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, msg: "not autherize login" });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(400)
        .json({ success: false, msg: "not autherize login" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error.message });
  }
};

export default adminAuth;
