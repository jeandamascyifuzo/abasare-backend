import mongoose from "mongoose";

const NewRidesSchema = new mongoose.Schema({
    customerId: String,
    customerName: String,
    when: String,
    bookingTime: String,
    pickupCoordinates:{
        latitude: String,
        longitude: String
    },
    pickupAddress: String,
    pickupDatetime: String,
    dropAddress: String,
    dropCoordinates: {
        latitude: String,
        longitude: String
    },
    dropDatetime: String,
    totalKmJourney: String,
    fareApplied: String,
    excessKm: String,
    standardFarePerKm: String,
    baseFare: String,
    additonalFare: String,
    subTotalFare: String,
    totalDiscount: String,
    totalFare: String,
    paymentMode: String,
    bookingStatus: String
},
    { timestamps: true });

export default  mongoose.model("NewRides", NewRidesSchema)