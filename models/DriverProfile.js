import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
    driverId: String,
    fullName: {
        type: String,
        required: [true, "your fullNames are required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    cityName: {
        type: String,
        required: [true, "Your current location is required"]
    },
    phoneNumber: {
        type: Number,
        required: [true, "Telephone number is required"]
    },
    alternatePhoneNumber: Number,
    gender: String,
    avatar: String,
    licenseNumber: {
        type: String,
        required: [true, "LicenseNumber is required"]
    },
    licenseImage: [
        {
            fontSide: {
                type: String,
                required: [true, "License fontSide is required"]
            },
            backSide: {
                type: String,
                required: [true, "License backSide is required"]
            }
        }
    ],
    status: { type: String, enum: ["Active", "Not Active"], default: "Active" },
    acceptingBooking: { type: Boolean, default: true },
    lastLocation: [
        {
            latitude: Number,
            longitude: Number
        }
    ],
    acceptingBooking: {
        type: Boolean,
        default: true
    },
    commission: String,
    employeeId: String,
    lastLocationUpdatedAt: String,
    yearExperience: String,
    rides: String,
    cost: String
},
    { timestamps: true });

export default mongoose.model("Driver", DriverSchema)