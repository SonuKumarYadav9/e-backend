import express from "express";
import mongoose from "mongoose";
import  router from "./src/routes/routes.js";
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

//Global MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use(express.json());

// Database Coonection
mongoose.connect(process.env.D_B, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to Database"))
    .catch((e) => console.log(e));

app.use("/api/", router);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

