
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Confera API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
