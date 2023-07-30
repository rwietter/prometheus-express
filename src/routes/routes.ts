import { Router } from "express";
import { Counter, register, Gauge } from "prom-client";
import { User } from "../controllers/User/User";

export const router = Router();

const user = new User();

const PromCounter = new Counter({
  name: 'http_requests_total',
  help: 'Counter for requests to the API',
  labelNames: ['route'],
});

const PromGauge = new Gauge({
  name: 'node_version_info',
  help:'The current version of node running',
  labelNames: ['version'],
});

PromGauge.set({ version: process.version }, 1);

router.post("/", (req, res, next) => {
  PromCounter.inc({ route: '/' });
  user.create(req, res, next);
});

router.post("/user", (req, res, next) => {
  PromCounter.inc({ route: '/user' });
  res.json({ message: "Hello World" });
});

router.get("/metrics", async (req, res, next) => {
  try {
    res.setHeader("Content-Type", register.contentType);
    return res.send(await register.metrics());
  } catch (err) {
    next(err);
  }
});
