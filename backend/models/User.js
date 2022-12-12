const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserSChema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "is required"],
        },
        email: {
            type: String,
            required: [true, "is required"],
            unique: true,
            index: true,
            validate: {
                validator: function (str) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
                },
                message: (props) => `${props.value} is not valid email`,
            },
        },

        password: {
            type: String,
            required: [true, "is required"],
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },

        cart: {
            type: Object,
            default: {
                total: 0,
                count: 0,
            },
        },
        notifications: {
            type: Array,
            default: [],
        },
        orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    },
    { minimize: false }
);

UserSChema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid Credentials");
    const isSamePassword = bcrypt.compareSync(password, user.password);
    if (isSamePassword) return user;
    throw new Error("Invalid credentials");
};

UserSChema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

//before saving  hash password

UserSChema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSChema.pre("remove", function (next) {
    this.model("Order").remove({ Owner: this._id }, next);
});
const User = mongoose.model("User", UserSChema);
