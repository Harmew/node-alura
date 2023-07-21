import express from "express";

// Database
import db from "./config/dbConnect.js";

// Routes
import routes from "./routes/index.js";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});

const app = express();
routes(app);

export default app;
