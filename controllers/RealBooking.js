import { success, fail, sendError } from "../function/respond";
import Booking from "../models/RealBooking";
import DriverProfile from "../models/DriverProfile";
import { options } from "joi";
import Register from "../models/RegisterDriver";
import User from "../models/User";

const createBooking = async (req, res) => {
  try {
    const {
      is_rated,
      is_reported,
      order_id,
      pickup_address,
      drop_address,
      booking_status,
      ride_status,
      total_amount,
      payment_status,
      clientProfileId,
      driverProfileId,
      cancelled_by,
      cancellation_reason,
    } = req.body;

    const findUserId = await User.findById(req.params.userId);
    const foundUserId = findUserId._id;
    const findId = await Register.findById(req.params.driverId);
    const foundDriverId = findId._id;
    const driver = await DriverProfile.findOne({ driverId: foundDriverId });
    if (!driver) return fail(res, 400, "driver doesn't exist", null);
    const newClient = new Booking({
      is_rated,
      is_reported,
      order_id,
      userId: foundUserId,
      driverId: foundDriverId,
      pickup_address,
      drop_address,
      ride_status,
      total_amount,
      payment_status,
      booking_status,
      clientProfileId,
      driverProfileId: driver,
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
    const bookings = await Booking.find()
      .populate("clientProfileId")
      .populate("driverProfileId");
    return success(res, 200, "retrieved all Booking", bookings);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getBooking = async (req, res) => {
  try {
    const user = await Booking.findById(req.params.id)
      .populate("clientProfileId")
      .populate("driverProfileId");
    if (!user) return fail(res, 400, "Booking doesn't exist", null);
    return success(res, 200, "retrieved Booking", user);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return fail(res, 400, "Booking doesn't exist", null);
    return success(res, 200, "Booking canceled successful", null);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const updatedBooking = async (req, res) => {
  try {
    var id = req.params.id;
    const updatedBooking = await Booking.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (updatedBooking) {
      return success(res, 201, "User updated successful", updatedBooking);
    } else {
      return fail(res, 404, `We don't have User with this id ${id}`, null);
    }
  } catch (error) {
    res.status(200).json({ status: "fail", message: error });
  }
};

export {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
  updatedBooking,
};
