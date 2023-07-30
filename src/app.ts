/**
 * This is a helper function that wraps the async functions in a try/catch block
 */
require("express-async-errors");
import "./lib/config/dotenv";
import express from "express";

import { router } from "./routes/routes";
import { errorHandler } from "./lib/error/errorHandler";
import { UnhandledErrors } from "./lib/error/unhandledErrors";
import { loggerHttpMiddleware } from "./lib/logger/logger";

import { collectDefaultMetrics, register } from "prom-client";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(loggerHttpMiddleware);
app.use(router);
app.use(errorHandler);

collectDefaultMetrics({ register });

UnhandledErrors();
