const express = require("express");
const DBConnect = require("./DB/db");
const userRouter = require("./routes/users");
const errorController = require("./utils/errorController");
const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
dotenv.config(".env")
const app = express();
const PORT = process.env.PORT;

DBConnect();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// request logging
app.use((req, res, next) => {
    console.log(`Request - ${req.method} - ${req.url}`)
    next();
})

app.use("/users", userRouter)

// capture invalid requests

app.get("*", (req, res) => {
    return res.status(404).json({ msg: "No endpoint found!" })
})

app.use(errorController)
app.listen(PORT, () => console.log("server is running on port ", PORT))