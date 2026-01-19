const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const tickets = require("../controllers/tickets.controller");

router.get("/", tickets.list);
router.post("/", auth, tickets.create);

router.get("/:id", auth, tickets.get);
router.patch("/:id", auth, tickets.patch);

router.delete("/:id", auth, adminOnly, tickets.remove);

module.exports = router;
