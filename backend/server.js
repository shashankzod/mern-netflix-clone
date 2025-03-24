import express from "express";
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import auth from "./routes/auth.js";
import movie from "./routes/movie.js";
import tv from "./routes/tv.js";
import search from "./routes/search.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT
const __dirname = path.resolve();

dotenv.config();

app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/api/v1/auth", auth);
app.use("/api/v1/movie",protectRoute, movie);
app.use("/api/v1/tv",protectRoute, tv);
app.use("/api/v1/search",protectRoute, search);

if (ENV_VARS.NODE_ENV === "production"){
	app.use(express.static(path.join(__dirname, "/frontend/dist")))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
	})
}

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});


