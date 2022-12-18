const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
require("./connection");

const io = new Server(server, {
    cors: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
});

const User = require("./models/User");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoute");
const imageRoute = require("./routes/imagesRoute");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/images", imageRoute);

server.listen(8000, () => {
    console.log("server is running at port", 8000);
});

app.set("socketio", io);
