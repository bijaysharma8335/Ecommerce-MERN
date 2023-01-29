const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

// get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//create products
router.post("/", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            images: pictures,
        } = req.body;
        const product = await Product.create({
            name,
            description,
            price,
            category,
            pictures,
        });
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//update product

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const {
            name,
            description,
            price,
            category,
            images: pictures,
        } = req.body;
        const product = await Product.findByIdAndUpdate(id, {
            name,
            description,
            price,
            category,
            pictures,
        });
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
//delete product
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        const user = await User.findById(user_id);
        if (!user.isAdmin)
            return res.status(401).json("You don't have permission");
        await Product.findByIdAndDelete(id);
        const products = await Product.find();
        res.status(200).json(products);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// get only one product
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        const similar = await Product.find({
            category: product.category,
        }).limit(5);
        res.status(200).json({ product, similar });
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//categories
router.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    try {
        let products;
        if (category == "all") {
            products = await Product.find().sort({ _id: -1 });
        } else {
            products = await Product.find({ category }).sort({ _id: -1 });
        }
        res.status(200).json(products);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

//cart routes
router.post("/add-to-cart", async (req, res) => {
    const { userId, productId, price } = req.body;
    // console.log("userId, productId, price", userId, productId, price);
    // console.log("productId", productId);

    try {
        const user = await User.findById(userId);
        // console.log("user", user);

        const userCart = user.cart;
        if (user.cart[productId]) {
            console.log("I am here");
            userCart[productId] += 1;
        } else {
            userCart[productId] = 1;
        }
        userCart.count += 1;
        userCart.total = userCart.total + parseInt(price);
        // console.log(typeof userCart.total);
        user.cart = userCart;
        user.markModified("cart");
        await user.save();
        user.cart = userCart;
        console.log(" userCart.total", userCart.total);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
});
// router.post("/add-to-cart", async (req, res) => {
//     const { userId, productId, price } = req.body;
//     console.log("typeof", typeof price);
//     try {
//         const user = await User.findById(userId);
//         const userCart = user.cart;
//         userCart.count += 1;
//         userCart.total += userCart.total + parseInt(price);
//         console.log(
//             "Number(userCart.total) Number(price)",
//             userCart.total,
//             price
//         );
//         user.cart = userCart;
//         user.markModified("cart");
//         // user.markModified("cart");
//         await user.save();
//     } catch (error) {}
// });

//increase cart product
router.post("/increase-cart", async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total += Number(price);
        userCart.count += 1;
        userCart[productId] += 1;
        user.cart = userCart;
        user.markModified("cart");
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//decrease cart product
router.post("/decrease-cart", async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        userCart.total -= Number(price);
        userCart.count -= 1;
        userCart[productId] -= 1;
        user.cart = userCart;
        user.markModified("cart");
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

//remove product from cart
router.post("/remove-from-cart", async (req, res) => {
    const { userId, productId, price } = req.body;
    // console.log(req.body)
    try {
        const user = await User.findById(userId);
        const userCart = user.cart;
        // console.log(userCart);
        userCart.total -= Number(userCart[productId]) * Number(price);
        userCart.count -= userCart[productId];
        delete userCart[productId];
        user.cart = userCart;
        user.markModified("cart");
        await user.save();
        // console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;
