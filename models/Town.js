import mongoose from "mongoose";

const TownSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "City Name is required"],
    },
    state: {
        type: String,
        required: [true, "State code is required"]
    },
},
    { timestamps: true });

export default mongoose.model("Town", TownSchema)