import { Hono } from "hono";
import todoRoutes from "./routes/todos";
import listRoutes from "./routes/lists";
import authRoutes from "./routes/auth";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

const routes = app
  .route("/todos", todoRoutes)
  .route("/lists", listRoutes)
  .route("/auth", authRoutes)
  .get("/", (c) => c.json({ message: "Hello Hono!" }));

export default app;
export type AppType = typeof routes;
