const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const comments = require("../controllers/comments.controller");

// incohérent: /ticket/:id/comments au lieu de /tickets/:id/comments
router.get("/:id/comments", auth, comments.list);
router.post("/:id/comment", comments.add); // PAS PROTEGE

module.exports = router;
