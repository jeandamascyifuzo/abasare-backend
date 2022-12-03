import { success, fail, sendError } from "../function/respond";
import BookingHistory from "../models/BookingHistory";
import Booking from "../models/RealBooking";

const createBooking = async (req, res) => {
  try {
    const {
      booking_id,
      is_reported,
      is_rated,
      order_id,
      pickup_date,
      return_date,
      billing_type,
      ride_status,
      total_amount,
      payment_status,
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
      is_unlimited,
      cancelled_by,
      cancellation_reason,
    } = req.body;

    const newClient = new BookingHistory({
      booking_id,
      is_reported,
      is_rated,
      order_id,
      pickup_date,
      return_date,
      billing_type,
      ride_status,
      total_amount,
      payment_status,
      vehicle_details: {
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
        is_unlimited,
      },
      cancelled_by,
      cancellation_reason,
    });
    const clientSaved = await newClient.save();
    return success(res, 201, "Your Booking created successfully", clientSaved);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getBookings = async (req, res) => {
  try {
    var bookingHistory = [];
    const bookingHisto = await Booking.find().populate("driverProfileId").sort("-createdAt");
    bookingHisto.forEach((item) => {
      bookingHistory.push({
        _id: item._id,
        booking_id: 596,
        is_reported: item.is_reported,
        is_rated: item.is_rated,
        order_id: item.order_id,
        pickup_date: "2022-04-01 07:05",
        return_date: "2022-09-30 02:05",
        billing_type: "Unlimited",
        ride_status: item.ride_status,
        total_amount: item.total_amount,
        payment_status: item.payment_status,
        vehicle_details: {
          "_id": item.driverProfileId[0]._id,
          "vehicle_id": item.driverProfileId[0].driverId,
          "model_id": 34,
          "type_id": 1,
          "photo": item.driverProfileId[0].avatar,
          "vehicle_name": item.driverProfileId[0].fullName,
          "limited_price": item.driverProfileId[0].cost,
          "unlimited_price": item.driverProfileId[0].phoneNumber,
          "seater": item.driverProfileId[0].rides,
          "fuel_type": "Diesel",
          "transmission": "Manual",
          "year": item.driverProfileId[0].yearExperience,
          "air_bags": "Yes",
          "is_limited": "Yes",
          "is_unlimited": "Yes"
        },
        cancelled_by: item.cancelled_by,
        cancellation_reason: item.cancellation_reason,
      });
    });
    return res.status(200).json({
      status: "1",
      message: "Data fetched.",
      data: bookingHistory,
    });
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getDriverBookings = async (req, res) => {
  try {
    var bookingHistory = [];
    
    const bookingHisto = await Booking.find().populate("driverProfileId").sort("-createdAt");

    bookingHisto.forEach((item) => {
      
      if (req.params.id === item.userId){
        bookingHistory.push({
          _id: item._id,
          booking_id: 596,
          is_reported: item.is_reported,
          is_rated: item.is_rated,
          order_id: item.order_id,
          pickup_date: "2022-04-01 07:05",
          return_date: "2022-09-30 02:05",
          billing_type: "Unlimited",
          ride_status: item.ride_status,
          total_amount: item.total_amount,
          payment_status: item.payment_status,
          vehicle_details: {
            "_id": item.driverProfileId[0]._id,
            "vehicle_id": item.driverProfileId[0].driverId,
            "model_id": 34,
            "type_id": 1,
            "photo": item.driverProfileId[0].avatar,
            "vehicle_name": item.driverProfileId[0].fullName,
            "limited_price": item.driverProfileId[0].cost,
            "unlimited_price": item.driverProfileId[0].phoneNumber,
            "seater": item.driverProfileId[0].rides,
            "fuel_type": "Diesel",
            "transmission": "Manual",
            "year": item.driverProfileId[0].yearExperience,
            "air_bags": "Yes",
            "is_limited": "Yes",
            "is_unlimited": "Yes"
          },
          cancelled_by: item.cancelled_by,
          cancellation_reason: item.cancellation_reason,
        });
      }
    });
    return res.status(200).json({
      status: "1",
      message: "Data fetched.",
      data: bookingHistory,
    });
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await BookingHistory.findByIdAndDelete(req.params.id);
    if (!booking) return fail(res, 400, "Booking doesn't exist", null);
    return success(res, 200, "Booking canceled successful", null);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

export { createBooking, getBookings, getDriverBookings, cancelBooking };
