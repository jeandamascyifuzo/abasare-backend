import mongoose from "mongoose";

const BookingHistorySchema = new mongoose.Schema({
    booking_id: String,
    is_reported: String,
    is_rated: String,
    order_id: String,
    pickup_date: String,
    return_date: String,
    billing_type: String,
    ride_status: String,
    total_amount: String,
    payment_status: String,
    vehicle_details: {
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
        air_bags: String,
        is_limited: String,
        is_unlimited: String
    },

    cancelled_by: String,
    cancellation_reason: String,

},
    { timestamps: true });

export default mongoose.model("BookingHistory", BookingHistorySchema)