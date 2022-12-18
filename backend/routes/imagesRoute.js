const cloudinary = require("cloudinary");
const router = require("express").Router();
require("dotenv").config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
router.delete("/:public_id", async (req, res) => {
    try {
        await cloudinary.UploadStream.destroy(public_id);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
