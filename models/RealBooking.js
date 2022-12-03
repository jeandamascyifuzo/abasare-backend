import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    is_reported: String,
    order_id: String,
    userId: String,
    driverId: String,
    is_rated: String,
    pickup_address: String,
    drop_address: String,
    ride_status: String,
    total_amount: String,
    payment_status: String,
    booking_status: String,

    clientProfileId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
    driverProfileId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }],

    cancelled_by: String,
    cancellation_reason: String,

},
    { timestamps: true });

export default mongoose.model("RealBooking", BookingSchema)