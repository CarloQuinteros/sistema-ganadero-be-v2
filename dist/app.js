import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import agendaRouter from "./routes/agendaRoutes.js";
const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/agenda", agendaRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
export default app;
