import { success, fail, sendError } from "../function/respond";
import Booking from "../models/RealBooking";
import NewRide from "../models/NewRides";

const createRides = async (req, res) => {
  try {
    const {
      customerId,
      customerName,
      when,
      bookingTime,
      latitude,
      longitude,
      pickupAddress,
      pickupDatetime,
      dropAddress,
      dropDatetime,
      totalKmJourney,
      fareApplied,
      excessKm,
      standardFarePerKm,
      baseFare,
      additonalFare,
      subTotalFare,
      totalDiscount,
      totalFare,
      paymentMode,
      bookingStatus,
    } = req.body;

    const newDriver = new NewRide({
      customerId,
      customerName,
      when,
      bookingTime,
      pickupCoordinates: {
        latitude,
        longitude,
      },
      pickupAddress,
      pickupDatetime,
      dropAddress,
      dropCoordinates: {
        latitude,
        longitude,
      },
      dropDatetime,
      totalKmJourney,
      fareApplied,
      excessKm,
      standardFarePerKm,
      baseFare,
      additonalFare,
      subTotalFare,
      totalDiscount,
      totalFare,
      paymentMode,
      bookingStatus,
    });
    const newRideSaved = await newDriver.save();
    return success(res, 201, "Request added successfully", newRideSaved);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getRides = async (req, res) => {
  try {
    var bookingHistory = [];
    const bookingHisto = await Booking.find()
      .populate("clientProfileId")
      .sort("-createdAt");
    bookingHisto.forEach((item) => {
      bookingHistory.push({
        _id: item._id,
        customerId: item.clientProfileId[0].userId,
        customerName: item.clientProfileId[0].name,
        when: "now",
        bookingTime: "string",
        pickupAddress: item.pickup_address,
        pickupDatetime: "2021-04-12T09:24:39.059756Z",
        pickupCoordinates: {
          latitude: "12.34354",
          longitude: "35.34345",
        },
        dropAddress: item.drop_address,
        dropDatetime: "2021-04-12T09:24:39.059756Z",
        dropCoordinates: {
          latitude: "12.34354",
          longitude: "35.34345",
        },
        totalKmJourney: 55.54,
        fareApplied: "Normal",
        excessKm: 15.54,
        standardFarePerKm: 10,
        baseFare: 60,
        additonalFare: 353,
        subTotalFare: 445,
        totalDiscount: 45.54,
        totalFare: "frw" + " "+ item.total_amount,
        paymentMode: "Online",
        bookingStatus: item.booking_status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      });
    });
    return res.status(200).json({
      statuscode: "200",
      body: {
        count: "1374",
        next: "https://api.example.org/accounts/?limit=100&offset=500",
        previous: "https://api.example.org/accounts/?limit=100&offset=500",
        result: bookingHistory,
      },
      message: "Pending Local Ride List Fetched Successfully",
    });
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getDriverBookings = async (req, res) => {
  try {
    var bookingHistory = [];
    const bookingHisto = await Booking.find()
      .populate("clientProfileId")
      .sort("-createdAt");
      bookingHisto.forEach((item) => {
        if (req.params.id === item.driverId)
        bookingHistory.push({
          _id: item._id,
          customerId: item.clientProfileId[0].userId,
          customerName: item.clientProfileId[0].name,
          when: "now",
          bookingTime: "string",
          pickupAddress: item.pickup_address,
          pickupDatetime: "2021-04-12T09:24:39.059756Z",
          pickupCoordinates: {
            latitude: "12.34354",
            longitude: "35.34345",
          },
          dropAddress: item.drop_address,
          dropDatetime: "2021-04-12T09:24:39.059756Z",
          dropCoordinates: {
            latitude: "12.34354",
            longitude: "35.34345",
          },
          totalKmJourney: 55.54,
          fareApplied: "Normal",
          excessKm: 15.54,
          standardFarePerKm: 10,
          baseFare: 60,
          additonalFare: 353,
          subTotalFare: 445,
          totalDiscount: 45.54,
          totalFare: "frw" + " "+ item.total_amount,
          paymentMode: "Online",
          bookingStatus: item.booking_status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
    return res.status(200).json({
      statuscode: "200",
      body: {
        count: "1374",
        next: "https://api.example.org/accounts/?limit=100&offset=500",
        previous: "https://api.example.org/accounts/?limit=100&offset=500",
        result: bookingHistory,
      },
      message: "Pending Local Ride List Fetched Successfully",
    });
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const deletedRides = async (req, res) => {
  try {
    const newRide = await NewRide.findByIdAndDelete(req.params.id);
    if (!newRide) return fail(res, 400, "Ride doesn't exist", null);
    return success(res, 200, "Ride deleted successful", null);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const updatedRide = async (req, res) => {
  try {
    var id = req.params.id;
    const updatedRide = await NewRide.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (updatedRide) {
      return success(res, 201, "Ride updated successful", updatedRide);
    } else {
      return fail(res, 404, `We don't have Ride with this id ${id}`, null);
    }
  } catch (error) {
    res.status(200).json({ status: "fail", message: error });
  }
};

export { createRides, getRides, getDriverBookings, deletedRides, updatedRide };
