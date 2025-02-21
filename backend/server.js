import express from "express";
import cookieParser from "cookie-parser";
import  authRoutes  from "./routes/authroutes.js";
import router from "./routes/routes.js";
import cors from "cors";
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: '*', 
 
}));

app.use(express.json()); 
app.use("/auth", authRoutes); 
app.use("/tasks", router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
