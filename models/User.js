import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Please  confirm Your Password !"],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: "Passwords are not matching",
        },
    },
    userType: {
        type: String,
        enum: ["client", "driver", "admin"],
        default: "client",
    },
},
    { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

export default mongoose.model("User", UserSchema)