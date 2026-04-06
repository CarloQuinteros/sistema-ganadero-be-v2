import chalk from "chalk";
import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start; // tiempo que tardo el request

    // Definimos el color de los estados http

    const statusColor =
      res.statusCode >= 400
        ? chalk.red
        : res.statusCode >= 300
          ? chalk.yellow
          : chalk.green;

    const safeBody = { ...body };
    if (safeBody.password) {
      safeBody.password = "******";
    }

    console.log(
      `Method: ${chalk.blue(method)} URL: ${chalk.cyan(url)},Body: ${chalk.magenta(JSON.stringify(safeBody))}, Status: ${statusColor(res.statusCode)} Duration: ${chalk.greenBright(duration + "ms")}`,
    );
  });
  next();
};

export default logger;
