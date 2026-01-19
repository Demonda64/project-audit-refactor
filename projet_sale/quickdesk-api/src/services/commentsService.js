const root = require("../../index");

// pas de relation propre ticket/comment
exports.addComment = (ticketId, body, author) => {
  const c = {
    id: "c" + Math.floor(Math.random() * 99999),
    ticketId: ticketId,
    body: body,
    author: author || "anonymous",
    createdAt: new Date().toISOString()
  };
  root.comments.push(c);
  return c;
};

exports.listComments = (ticketId) => {
  return root.comments.filter(c => c.ticketId == ticketId);
};
