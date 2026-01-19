const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3333;
const JWT_SECRET = "super-secret-key";

let tickets = [];
let comments = [];
let users = [
  { id: 1, email: "maya@cafevortex.local", password: "1234", role: "admin" },
  { id: 2, email: "chloe@cafevortex.local", password: "1234", role: "user" }
];

const ticketRoutes = require("./src/routes/tickets.routes");
app.use("/tickets", ticketRoutes);

const ticketSingleRoutes = require("./src/routes/ticket.routes");
app.use("/ticket", ticketSingleRoutes);

app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  console.log("LOGIN ATTEMPT", email);

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) {
    return res.status(401).send("bad credentials");
  }

  const token = require("jsonwebtoken").sign(
    { userId: found.id, role: found.role },
    JWT_SECRET
  );

  res.json({ token, role: found.role });
});

app.get("/seed", (req, res) => {
  tickets.push({
    id: "t1",
    title: "Imprimante cassée",
    description: "Ne marche plus",
    priority: "HIGHHH",
    status: "open",
    site: "centre",
    requester: "Chloé",
    createdAt: new Date().toISOString()
  });

  return res.json({ ok: true, ticketsCount: tickets.length });
});

app.get("/debug/all", (req, res) => {
  res.json({ tickets, comments, users: users.map(u => ({ ...u, password: "****" })) });
});

app.listen(PORT, () => {
  console.log("QuickDesk running on port", PORT);
});

module.exports = { app, tickets, comments, users, JWT_SECRET };
