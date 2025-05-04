const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      // Attach both id and _id to avoid issues
      req.user = {
        ...decoded,
        _id: decoded._id || decoded.id,
        id: decoded.id || decoded._id,
      };

      next();
    });
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

// 🔓 Middleware to optionally verify user if token exists
exports.verifyTokenOptional = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.user = null; // 👈 allow guests
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    req.user = null; // 👈 allow guests
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};
