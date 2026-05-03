import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import handlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.config.js";
import { initializePassport } from "./config/passport.config.js";

import sessionsRouter from "./routes/sessions.router.js";
import usersRouter from "./routes/users.router.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main"
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

initializePassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Registro de usuario"
  });
});

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});