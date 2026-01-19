const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const comments = require("../controllers/comments.controller");

router.get("/:id/comments", auth, comments.list);
router.post("/:id/comment", comments.add);

module.exports = router;
