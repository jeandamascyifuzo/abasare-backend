import { success, fail, sendError, } from '../function/respond'
import Driver from '../models/DriverProfile'
import Register from '../models/RegisterDriver'


const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().sort("-createdAt");
        // drivers.forEach((item)=>{
        //     console.log(item.fullName)
        // })
        return success(res, 200, "retrieved all Drivers", drivers)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getDriver = async (req, res) => {
    try {
        const driverId = await Register.findById(req.params.id)
        const userId = driverId._id
        const driver = await Driver.findOne({driverId:userId})
        if (!driver) return fail(res, 400, "Driver doesn't exist", null)
        return success(res, 200, "retrieved Driver", driver)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id)
        if (!driver) return fail(res, 400, "Driver doesn't exist", null)
        return success(res, 200, "Driver deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedDriver = async (req, res) => {
    try {
        
        const driverId = await Register.findById(req.params.id)
        const foundId = driverId._id
        const updatedDriver = await Driver.findOneAndUpdate({ driverId: foundId }, req.body, {
            new: true,
        })
        if (updatedDriver) {
            return success(res, 201, "Driver updated successful", updatedDriver)
        }
        else {
            return fail(res, 404, `We don't have Driver with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

export {
    getDrivers,
    getDriver,
    deletedDriver,
    updatedDriver
};