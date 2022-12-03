import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from "bcryptjs"

const UserProfileSchema = new mongoose.Schema({
    user_id: String,
    api_token: String,
    fcm_id: String,
    device_token: String,
    socialmedia_uid: String,
    user_name: String,
    phone: String,
    phone_code: String,
    emailid: {
        type: String,
        required: [true, "Email is required"],
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password: String,
    profile_pic: String,
    status: String,
    phone_verified: String,
    timestamp: String
},
    { timestamps: true });

    UserProfileSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next()
        this.password = await bcrypt.hash(this.password, 12)
        next()
    })

export default mongoose.model("UserProfile", UserProfileSchema)