// ======================= Core & External Modules =======================
import express, { Application } from "express";
import cors from "cors";
import morgan, { StreamOptions } from "morgan";

// ======================= Configs & Utils ================================
import { env } from "./config/env";
import connectDB from "./database/db";

// ======================= Controllers & Routes ===========================
import ServerCheck from "./controllers/ServerCheck";
import AuthRoutes from "./routes/auth.route";
import AdminProductRoutes from "./routes/adminproduct.route";
import CartRoutes from "./routes/cart.route";
// ======================= Initialize Application =========================
connectDB();

const app: Application = express();

const stream: StreamOptions = {
  write: (message) => console.log(message.trim()),
};

if (env.NODE_ENV !== "production") {
  app.use(morgan("dev", { stream }));
} else {
  app.use(morgan("combined", { stream }));
}

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));

// ======================= Health Check ===================================
app.get("/", ServerCheck);

// ======================= API Routes =====================================
app.use("/auth", AuthRoutes);
app.use("/adminproduct", AdminProductRoutes);
app.use("/cart", CartRoutes);

// ======================= Start Server ===================================
app.listen(Number(env.PORT)).on("listening", () => {
    console.info(`[Server] Successfully started 🚀 on http://localhost:${env.PORT} (${env.NODE_ENV || "development"} mode)`);
}).on("error", (err: NodeJS.ErrnoException) => {
    console.error("[Server] Failed to start:", err);
    process.exit(1);
});
