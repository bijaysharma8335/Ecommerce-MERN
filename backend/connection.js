const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

connString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@atlascluster.xroj15q.mongodb.net/ecomern?retryWrites=true&w=majority`;
mongoose
    .connect(connString, {
        useNewUrlParser: true,

        useUnifiedTopology: true,
    })
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));

//password PDvSKoaSnx12ZaUX   ecom-mern
mongoose.connection.on("error", (err) => {
    console.log(err);
});
