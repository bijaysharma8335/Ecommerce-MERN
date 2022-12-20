const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(
    "sk_test_51Ld5jYSIyhZkpeatIoHteTd36r1O07a4KincImUObYTvHZtAv0LRoY5HxkMLQyOTWMx2Av1aAE9jnexsU3sWQRcM00pKI3XevV"
);

const server = http.createServer(app);
const { Server } = require("socket.io");

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

app.post("/create-payment", async (req, res) => {
    const amount = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        res.status(200).json(paymentIntent);
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }
});
server.listen(8000, () => {
    console.log("server is running at port", 8000);
});

app.set("socketio", io);
