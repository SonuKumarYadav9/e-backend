import express from "express";
import  router from "./src/routes/routes.js";
import multer from 'multer';
import dotenv from 'dotenv';
import connectDB from "./src/DB/database.js";

dotenv.config();

const app = express();

//Global MIDDLEWARES
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use(express.json());

//Database
connectDB()

app.use("/api/", router);

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

