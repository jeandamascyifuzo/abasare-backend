import mongoose from "mongoose";
import validator from 'validator'

const RegisterDriverSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password: String,
    confirmPassword: String,
    userType: {
        type: String,
        enum: ["driver", "admin"],
        default: "driver",
    },
},
    { timestamps: true });

export default mongoose.model("registerDriver", RegisterDriverSchema)