module.exports = function adminOnly(req, res, next) {
  // pas robuste, suppose que req.user existe
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ message: "forbidden" });
};
