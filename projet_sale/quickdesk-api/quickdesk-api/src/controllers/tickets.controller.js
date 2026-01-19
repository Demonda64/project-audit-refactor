const ticketService = require("../services/ticket_service");

exports.create = (req, res) => {
  const t = ticketService.createTicket(req.body || {});
  res.json(t);
};

exports.list = (req, res) => {
  const data = ticketService.listTickets(req.query || {});
  res.json({ items: data, count: data.length });
};

exports.get = (req, res) => {
  const t = ticketService.getTicket(req.params.id);
  if (!t) return res.status(404).send("not found");
  res.json(t);
};

exports.patch = (req, res) => {
  const t = ticketService.updateTicket(req.params.id, req.body || {});
  if (!t) return res.status(404).json({ error: "missing ticket" });
  res.json(t);
};

exports.remove = (req, res) => {
  const ok = ticketService.deleteTicket(req.params.id);
  if (!ok) return res.status(404).send("no");
  res.json({ deleted: true });
};
