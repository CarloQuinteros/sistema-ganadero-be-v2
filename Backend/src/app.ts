import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import agendaRouter from "./routes/agendaRoutes.js";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import corralRouter from "./routes/corralRoutes.js";
import animalRouter from "./routes/animalRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.use(express.json());
app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/agenda", agendaRouter);
app.use("/api/corral", corralRouter);
app.use("/api/animal", animalRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
