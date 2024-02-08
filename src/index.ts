
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "../config/dbConfig";
import urlRoute from "../routes/urlRoute";

dotenv.config();
connectDB();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Option 1 :- Allow all origins with Default of cors(*)
server.use(cors());

server.get("/", (req,res) => {
    res.send("URL Shortener App");
})

server.use("/api", urlRoute);

const portNo = process.env.PORT || 5151;

server.listen(portNo, () => {
    console.log(`Server listening on port:${portNo}...`);
})