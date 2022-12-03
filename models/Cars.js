import mongoose from "mongoose";

const CarsSchema = new mongoose.Schema({
    name: String,
    seats: String,
    carImages: [
        {
            firstSideImage: String,
            secondSideImage: String,
        }
    ],
},
    { timestamps: true });

export default mongoose.model("Cars", CarsSchema)