const mongoose = require("mongoose");
const connStr = "";
mongoose
    .connect(connStr, { useNewUserParser: true })
    .then(() => console.log("Connected to mongodb"))
    .catch((err) => console.log(err));
