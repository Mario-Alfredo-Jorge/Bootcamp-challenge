import "dotenv/config";
import express from "express";
import youch from "youch";
import cors from 'cors'
import "express-async-errors";
import routes from "./routes";
import * as sentry from "@sentry/node";
import { resolve } from "path";
import sentryConfig from "./config/sentry";
import "./database";

class App {
  constructor() {
    this.server = express();

    sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandlers();
  }

  middlewares() {
    this.server.use(sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors())
    this.server.use(
      "/files",
      express.static(resolve(__dirname, "..", "tmp", "uploads"))
    );
  }
  routes() {
    this.server.use(routes);
    this.server.use(sentry.Handlers.errorHandler());
  }

  exceptionHandlers() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV == "development") {
        const errors = await new youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: "internal server error" });
    });
  }
}

export default new App().server;
