const jwt = require("jsonwebtoken");
const root = require("../../index");

module.exports = function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(401).json({ error: "no token" });
  }

  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, root.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    console.log("AUTH ERROR", e.message);
    return res.status(401).send("invalid token");
  }
};
