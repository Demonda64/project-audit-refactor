const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");
const tickets = require("../controllers/tickets.controller");

// routes cohérentes… mais sécurité pas uniforme
router.get("/", tickets.list); // PAS PROTEGE
router.post("/", auth, tickets.create); // protégé

router.get("/:id", auth, tickets.get);
router.patch("/:id", auth, tickets.patch);

// delete admin only (mais middleware parfois casse)
router.delete("/:id", auth, adminOnly, tickets.remove);

module.exports = router;
