import { success, fail, sendError } from "../function/respond";
import { sendEmail, hashPassword, comparePassword } from "../utils/email";
import Register from "../models/RegisterDriver";
import DriverProfile from "../models/DriverProfile";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";

const registerDriver = async (req, res) => {
  try {
    const {
      email,
      userType,
      driverId,
      fullName,
      commission,
      employeeId,
      lastLocationUpdatedAt,
      address,
      cityName,
      phoneNumber,
      alternatePhoneNumber,
      gender,
      avatar,
      licenseNumber,
      fontSide,
      backSide,
      status,
      acceptingBooking,
      yearExperience,
      rides,
      cost,
      latitude,
      longitude,
    } = req.body;

    const passwordNew = generator.generate({
      length: 11,
      numbers: true,
    });

    const hashedPassword = passwordNew;
    const password = hashedPassword;

    const newDriver = new Register({
      email: email,
      password: hashPassword(password),
      userType: userType,
    });

    const findDriver = await Register.findOne({ email: email });
    if (findDriver)
      return sendError(
        res,
        409,
        "This email already exist! change email address 👍🏼",
        null
      );

    const driverSaved = await newDriver.save(function (err, room) {
      const driverId = room._id;
      const driverProfile = new DriverProfile({
        fullName,
        email,
        userType,
        commission,
        employeeId,
        lastLocationUpdatedAt,
        driverId,
        address: address,
        cityName: cityName,
        phoneNumber: phoneNumber,
        alternatePhoneNumber: alternatePhoneNumber,
        gender: gender,
        avatar: avatar,
        licenseNumber: licenseNumber,
        licenseImage: {
          fontSide: fontSide,
          backSide: backSide,
        },
        status: status,
        yearExperience: yearExperience,
        rides: rides,
        cost: cost,
        acceptingBooking: acceptingBooking,
        lastLocation: {
          latitude: latitude,
          longitude: longitude,
        },
      });

      driverProfile.save();
      const URL = `https://www.abasare.com/`;
      const message = `
    Dear ${driverProfile.fullName},
    Congratulations, you are most welcome to Abasare company ltd. 
    we have accepted your request.
    please login to our site:${URL}, 
    your username and password are as follow: 
    username:${newDriver.email}, 
    Password:${password}
    `;
      sendEmail({
        email: newDriver.email,
        subject: "Congratulations, welcome to Abasare.",
        message,
      });
    });

    return success(res, 201, "Email Sent successfully", driverSaved);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getDrivers = async (req, res) => {
  try {
    const users = await Register.find().sort("-createdAt");
    return success(res, 200, "retrieved all Drivers", users);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const getDriver = async (req, res) => {
  try {
    const id = req.params.driverId;
    const user = await Register.findById(id);
    if (!user) return fail(res, 400, "Driver doesn't exist", null);
    return success(res, 200, "retrieved Driver", user);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const deletedDriver = async (req, res) => {
  try {
    const user = await Register.findByIdAndDelete(req.params.id);
    if (!user) return fail(res, 400, "Driver doesn't exist", null);
    return success(res, 200, "Driver deleted successful", null);
  } catch (error) {
    return sendError(res, 500, error.message, null);
  }
};

const updatedDriver = async (req, res) => {
  try {
    var id = req.params.id;
    const updatedDriver = await Register.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    if (updatedDriver) {
      return success(res, 201, "Driver updated successful", updatedDriver);
    } else {
      return fail(res, 404, `We don't have Driver with this id ${id}`, null);
    }
  } catch (error) {
    res.status(200).json({ status: "fail", message: error });
  }
};

const changeDriverPass = async (req, res) => {
  try {
    var id = req.params.id;
    let { password, confirmPassword } = req.body;
    if (password != confirmPassword)
      return fail(res, 400, "Password doens't match");
    let data = await Register.findOneAndUpdate(
      { _id: id },
      { password: hashPassword(password) }
    );
    const findeUpdateDriver = await Register.findOne({ _id: id });
    if (findeUpdateDriver) {
      return success(
        res,
        200,
        "Password Changed successful",
        findeUpdateDriver
      );
    } else {
      return fail(res, 400, "User doens't exist", null);
    }
  } catch (error) {
    res.status(200).json({ status: "fail", message: error });
  }
};

const driverLogin = (req, res, next) => {
  Register.find({ email: req.body.email })
    .select()
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return fail(res, 404, "invalid credential", null);
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              userType: user[0].userType,
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_SEC,
            {
              expiresIn: "1h",
            }
          );
          return res
            .status(200)
            .json({ status: "success", user, token, message: "Welcome 👍🏾" });
        }
        return fail(res, 404, "invalid credential", null);
      });
    })
    .catch((err) => {
      console.log(err);
      return sendError(res, 500, null, err.message);
    });
};

export {
  registerDriver,
  getDrivers,
  getDriver,
  deletedDriver,
  updatedDriver,
  changeDriverPass,
  driverLogin,
};
