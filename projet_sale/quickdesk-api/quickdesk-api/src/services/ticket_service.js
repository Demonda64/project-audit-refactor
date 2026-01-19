const root = require("../../index");
const nowDate = require("../utils/date");
const { getNow } = require("../utils/time");

function makeId() {
  return "t" + Math.floor(Math.random() * 100000);
}

exports.createTicket = (payload) => {
  const t = {
    id: makeId(),
    title: payload.title,
    description: payload.description,
    priority: payload.priority || "low",
    status: payload.status || "open",
    site: payload.site || "centre",
    requester: payload.requester || "unknown",
    createdAt: nowDate(),
    updatedAt: getNow()
  };

  root.tickets.push(t);
  console.log("ticket created", t.id);
  return t;
};

exports.listTickets = (query) => {
  let list = root.tickets;

  if (query.status) list = list.filter(t => t.status == query.status);
  if (query.site) list = list.filter(t => t.site == query.site);
  if (query.priority) list = list.filter(t => (t.priority || "").toLowerCase() === (query.priority || "").toLowerCase());

  return list;
};

exports.getTicket = (id) => {
  return root.tickets.find(t => t.id == id);
};

exports.updateTicket = (id, patch) => {
  const t = root.tickets.find(x => x.id == id);
  if (!t) return null;

  if (patch.title) t.title = patch.title;
  if (patch.description) t.description = patch.description;
  if (patch.priority) t.priority = patch.priority;
  if (patch.status) t.status = patch.status;
  if (patch.site) t.site = patch.site;

  t.updatedAt = nowDate();
  return t;
};

exports.deleteTicket = (id) => {
  const before = root.tickets.length;
  root.tickets = root.tickets.filter(t => t.id != id);
  return before !== root.tickets.length;
};
