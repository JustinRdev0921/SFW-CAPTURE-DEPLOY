import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import users from "./routes/users.routes.js";
import procesing from "./routes/procesing.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import logger from "./logger.js";
import { log } from "console";

const app = express();

app.use(cors({
  origin: 'http://192.168.80.29:8888',
  credentials: true
}));

const accessLogStream = fs.createWriteStream(
  // path.join(__dirname, "access.log"),
  path.resolve('./access.log'),
  { flags: "a" }
);
app.use(morgan("dev", { stream: accessLogStream }));

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/api", authRoutes);
app.use("/api", users);
app.use("/api", procesing);

// Manejador de errores global
app.use((err, req, res, next) => {
  logger.error(`Error global: ${err.message}`);
  res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
});

export default app;
