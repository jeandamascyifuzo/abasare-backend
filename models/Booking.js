import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    vehicle_id: String,
    model_id: String,
    type_id: String,
    photo: String,
    vehicle_name: String,
    limited_price: String,
    unlimited_price: String,
    seater: String,
    fuel_type: String,
    transmission: String,
    year: String,
    air_bags:String,
    is_limited: String,
    is_unlimited: String,

    // clientProfileId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    // driverProfileId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }]
},
    { timestamps: true });

export default mongoose.model("Booking", BookingSchema)