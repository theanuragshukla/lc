require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);

const db = require("./utils/database.js");
const userRouter = require("./routes/users");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (_, res) => {
    res.json({
        status: true,
        msg: "Alive!",
    });
    return;
});

app.use("/users", userRouter);

const server = http.listen(port, () => {
    console.log(`running on port ${port}`);
});
