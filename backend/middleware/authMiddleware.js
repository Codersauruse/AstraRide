import jwt from "jsonwebtoken";

const authMiddleware = (requiredRole) => (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ success: false, msg: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, msg: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user details to the request object
    req.user = decoded;

    const userRoles = decoded.roles;

    // Check if the user has the required role
    if (!userRoles || !userRoles.includes(requiredRole)) {
      return res.status(403).json({
        success: false,
        msg: "Forbidden - Insufficient permissions",
        roles: userRoles,
      });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({
      success: false,
      msg: "Invalid or expired token",
    });
  }
};

export default authMiddleware;
