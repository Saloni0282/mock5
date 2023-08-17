const express = require('express');
const cors = require('cors');
const { connection } = require("./config/db");
const {router}=require("./routes/routes")
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to Plan App");
});

app.use("/", router)

const PORT = process.env.port
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
        console.log("Error to connect the database");
    }
    console.log(`Server listening on port ${PORT}`);
});