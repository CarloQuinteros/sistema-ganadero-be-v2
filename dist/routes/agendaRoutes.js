import { Router } from "express";
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
agendaRouter.get("/", (req, res) => {
    res.send({ message: "Agenda route works!" });
});
export default agendaRouter;
