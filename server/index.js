require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')
const http = require("http").Server(app);

const db = require("./utils/database.js");
const userRouter = require("./routes/users");
const standingRouter = require("./routes/standing");
const authRouter = require("./routes/auth");

const { getAllRank } = require("./utils/contestRank.js");

const port = process.env.PORT || 8000;

app.use(cors({
    origin:"*",
}))

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
app.use("/standing", standingRouter);

// setTimeout(getAllRank, 5000);

app.use(express.static(__dirname + '/public'));
app.use('/auth', authRouter)

const server = http.listen(port, () => {
    console.log(`running on port ${port}`);
});