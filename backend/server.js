const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("connected to mongodb"))
    .catch((err) => console.log(err));
const io = new Server(server, {
    cors: "*",
    methods: "*",
});

const User = require("./models/User");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);

server.listen(5000, () => {
    console.log("server is running at port", 5000);
});
