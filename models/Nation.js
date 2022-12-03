import mongoose from "mongoose";

const NationSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Nation Name is required"],
    },
    phone_code: {
        type: String,
        required: [true, "phone code is required"]
    },
},
    { timestamps: true });

export default mongoose.model("Nation", NationSchema)