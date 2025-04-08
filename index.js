import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import users from "./view/router.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://atlas-sample-dataset-load-67f3cb8a76d84f705e043b98:<db_password>@cluster0.eqvmchj.mongodb.net/?retryWrites=true&w=majority&appName=UploadFile")
  .then(() => console.log("You! Connected to MongoDB..."))
  .catch((err) =>
    console.error("Could not connect to MongoDB... " + err.message)
  );

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/api/user",users);


const port = process.env.PORT || 7373;
const server=app.listen(port, () => {
  console.log("Server connected to " + port);
});
