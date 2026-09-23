const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  let token = null;
  let tokenSource = null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    tokenSource = "header";
  } else if (req.cookies && (req.cookies.token || req.cookies.jwt)) {
    token = req.cookies.token || req.cookies.jwt;
    tokenSource = "cookie";
  }

  if (!token) {
    return res.status(401).json({
      message: "Access token required. Please provide it via Authorization header (Bearer) or HTTP cookie."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.tokenSource = tokenSource;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };