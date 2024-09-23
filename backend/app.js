import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();

//middewares
app.use(cors());
app.use(express.json()); // tell the app will then only parse json data
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
    .connect(
        `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.lysmiic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => 
        app.listen(5000, () => 
            console.log("Server has started and connected to database!")
        )
    )
    .catch((error) => console.log(error));
