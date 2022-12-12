const router = require("express").Router();
const User = require("../models/User");

//signup user
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        console.log(user);
        res.json(user);
    } catch (error) {
        if (error.code === 1000)
            return res.status(400).send("Email already exists");

        res.status(400).send(error.message);
    }
});

//login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);

        res.json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//get users
router.get("/", async (req, res) => {
    try {
        const users = User.find({ isAdmin: false }).populate("orders");
        res.json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
