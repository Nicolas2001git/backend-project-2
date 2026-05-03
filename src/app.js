import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";

import { connectDB } from "./config/db.config.js";
import { initializePassport } from "./config/passport.config.js";

import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});