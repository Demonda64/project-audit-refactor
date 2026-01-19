const jwt = require("jsonwebtoken");

// import circulaire / dépendance au fichier racine (sale)
const root = require("../../index");

module.exports = function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) {
    // incohérence : parfois 401, parfois 200
    return res.status(401).json({ error: "no token" });
  }

  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, root.JWT_SECRET); // secret depuis index
    req.user = payload;
    next();
  } catch (e) {
    console.log("AUTH ERROR", e.message);
    return res.status(401).send("invalid token");
  }
};
