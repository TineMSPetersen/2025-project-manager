import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Authorization Header:', req.headers.authorization);
  
  if (!authHeader) {
    return res.json({ success: false, message: "Not authorized. Log in again" });
  }

  const token = authHeader.split(' ')[1];  // Extract token from the "Bearer <token>" format

  if (!token) {
    return res.json({ success: false, message: "Not authorized. Log in again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;