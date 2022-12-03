import { success, fail, sendError, } from '../function/respond'
import Booking from '../models/Booking'
import DriverProfile from '../models/DriverProfile'



const createBooking = async (req, res) => {

    try {
        const {
            vehicle_id,
            model_id,
            type_id,
            photo,
            vehicle_name,
            limited_price,
            unlimited_price,
            seater,
            fuel_type,
            transmission,
            year,
            air_bags,
            is_limited,
            is_unlimited
        } = req.body

        const driver = await DriverProfile.findById(req.params.driverId)
        if (!driver) return fail(res, 400, "driver doesn't exist", null)
        const newClient = new Booking({
            vehicle_id,
            model_id,
            type_id,
            photo,
            vehicle_name,
            limited_price,
            unlimited_price,
            seater,
            fuel_type,
            transmission,
            year,
            air_bags,
            is_limited,
            is_unlimited
        });
        const clientSaved = await newClient.save();
        return success(res, 201, "Your Booking created successfully", clientSaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getBookings = async (req, res) => {
    try {

        var AvailableDrivers = [];
        const drivers = await DriverProfile.find({"acceptingBooking":true})
             drivers.forEach((item)=>{
                AvailableDrivers.push(
                    {
                        "_id": item.id,
                        "vehicle_id": item.driverId,
                        "model_id": 34,
                        "type_id": 1,
                        "photo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU",
                        "vehicle_name": item.fullName,
                        "limited_price": item.cost,
                        "unlimited_price": item.phoneNumber,
                        "seater": item.rides,
                        "fuel_type": "Diesel",
                        "transmission": "Manual",
                        "year": item.yearExperience,
                        "air_bags": "Yes",
                        "is_limited": "Yes",
                        "is_unlimited": "Yes"
                    }
                );

     })
     return res.status(200).json({
        status: "1",
        message:"Data fetched.",
        data: AvailableDrivers
     })
        // const bookings = await Booking.find()
        // return success(res, 200, "Data fetched.", bookings)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getBooking = async (req, res) => {
    try {
        const user = await Booking.findById(req.params.id)
        .populate("clientProfileId")
        .populate("driverProfileId")
        if (!user) return fail(res, 400, "Booking doesn't exist", null)
        return success(res, 200, "Data fetched.", user)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id)
        if (!booking) return fail(res, 400, "Booking doesn't exist", null)
        return success(res, 200, "Booking canceled successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

export {
    createBooking,
    getBookings,
    getBooking,
    cancelBooking
};