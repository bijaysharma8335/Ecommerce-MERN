const router = require("express").Router();
const Order = require("../models/Order");
const user = require("../models/User");
const Schema = require("mongoose");



//creating orders
router.post("/", async (req, res) => {
    const { userId, cart, country, address } = req.body;
    try {
        const user = await User.findById(userId);

        const order = await Order.create({
            owner: user._id,
            products: cart,
            country,
            address,
        });
        order.count = cart.count;
        order.total = cart.total;
        await order.save();
        user.cart = {
            total: 0,
            count: 0,
        };
        user.orders.push(order);
        user.markModified("orders");
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

//getting all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().populate("owner", ["email", "name"]);
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;
