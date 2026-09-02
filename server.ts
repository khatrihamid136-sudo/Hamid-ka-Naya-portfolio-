import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initialPortfolioData } from "./src/data/initialData";

const app = express();
const PORT = 3000;

// Body parser for JSON
app.use(express.json({ limit: "50mb" }));

// Server data store path
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portfolio-store.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error("Failed to create data directory:", err);
  }
}

// API Route: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API Route: GET full portfolio data (accessible across all devices & browsers)
app.get("/api/portfolio-data", (_req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return res.json({ success: true, data: parsed, source: "server_storage" });
    }
    // Fallback to default initial portfolio data
    return res.json({ success: true, data: initialPortfolioData, source: "defaults" });
  } catch (err) {
    console.error("Error reading portfolio data from disk:", err);
    return res.json({ success: true, data: initialPortfolioData, source: "fallback_on_error" });
  }
});

// API Route: POST update full portfolio data (persists globally for all clients)
app.post("/api/portfolio-data", (req, res) => {
  try {
    const payload = req.body;
    if (!payload || typeof payload !== "object") {
      return res.status(400).json({ success: false, error: "Invalid payload format" });
    }

    // Write to server disk
    fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), "utf-8");
    console.log(`[SERVER] Portfolio data persisted globally at ${new Date().toISOString()}`);
    return res.json({ success: true, message: "Portfolio saved globally for all devices and browsers", updatedAt: Date.now() });
  } catch (err: any) {
    console.error("Error saving portfolio data to disk:", err);
    return res.status(500).json({ success: false, error: err?.message || "Failed to persist data on server" });
  }
});

// API Route: Reset data to initial defaults
app.post("/api/reset-portfolio-data", (_req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      fs.unlinkSync(DATA_FILE);
    }
    return res.json({ success: true, data: initialPortfolioData, message: "Reset to default initial data" });
  } catch (err: any) {
    console.error("Error resetting data on server:", err);
    return res.status(500).json({ success: false, error: err?.message || "Failed to reset data" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
