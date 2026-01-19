const commentsService = require("../services/commentsService");
const ticketService = require("../services/ticket_service");

exports.add = (req, res) => {
  const ticketId = req.params.id || req.body.ticketId;
  const ticket = ticketService.getTicket(ticketId);

  if (!ticket) return res.status(200).json({ ok: false, reason: "ticket not found" });

  const c = commentsService.addComment(ticketId, req.body.body, req.body.author);
  res.json(c);
};

exports.list = (req, res) => {
  const ticketId = req.params.id;
  res.json(commentsService.listComments(ticketId));
};
