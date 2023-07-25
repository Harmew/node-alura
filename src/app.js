import express from "express";

// Database
import db from "./config/dbConnect.js";

// Routes
import routes from "./routes/index.js";

// Middlewares
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
