/**
 * QuickDesk API (VOLONTAIREMENT SALE)
 * - logique mélangée
 * - config en dur
 * - routes incohérentes
 * - pas de validation
 * - console.log partout
 */

const express = require("express");
const app = express();

app.use(express.json());

// config en dur + incohérente
const PORT = process.env.PORT || 3333;
const JWT_SECRET = "super-secret-key"; // <-- volontairement dans le code

// "db" en mémoire + fichier à côté (mauvais choix / hybride)
let tickets = [];
let comments = [];
let users = [
  { id: 1, email: "maya@cafevortex.local", password: "1234", role: "admin" },
  { id: 2, email: "chloe@cafevortex.local", password: "1234", role: "user" }
];

// routes importées à moitié (sale)
const ticketRoutes = require("./src/routes/tickets.routes");
app.use("/tickets", ticketRoutes);

// route "ticket" au singulier (incohérent)
const ticketSingleRoutes = require("./src/routes/ticket.routes");
app.use("/ticket", ticketSingleRoutes);

// auth locale inline (sale)
app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  console.log("LOGIN ATTEMPT", email);

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) {
    return res.status(401).send("bad credentials"); // pas de JSON
  }

  const token = require("jsonwebtoken").sign(
    { userId: found.id, role: found.role },
    JWT_SECRET
  );

  res.json({ token, role: found.role });
});

// seed rapide (sale)
app.get("/seed", (req, res) => {
  tickets.push({
    id: "t1",
    title: "Imprimante cassée",
    description: "Ne marche plus",
    priority: "HIGHHH", // volontairement n'importe quoi
    status: "open",
    site: "centre",
    requester: "Chloé",
    createdAt: new Date().toISOString()
  });

  return res.json({ ok: true, ticketsCount: tickets.length });
});

// endpoints "debug"
app.get("/debug/all", (req, res) => {
  res.json({ tickets, comments, users: users.map(u => ({ ...u, password: "****" })) });
});

app.listen(PORT, () => {
  console.log("QuickDesk running on port", PORT);
});

module.exports = { app, tickets, comments, users, JWT_SECRET };
