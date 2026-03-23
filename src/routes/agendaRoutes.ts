import { Router } from "express";
import { authorization } from "../middleware/authMiddleware.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";
const agendaRouter = Router();

/**
 * @swagger
 * /api/agenda:
 *   get:
 *     summary: Obtener todas las agendas
 *     tags: [Agenda]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                     $ref: '#/components/schemas/Agenda' 
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error

 */

agendaRouter.get("/", authorization, authorizeRole("ADMIN"), (req, res) => {
  res.send({ message: "Agenda route works! access granted" });
});

export default agendaRouter;
