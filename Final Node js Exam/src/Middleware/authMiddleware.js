const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    console.log("Full Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }

    console.log("After Slice Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};



