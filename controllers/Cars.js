import { success, fail, sendError, } from '../function/respond'
import Car from '../models/Cars'

const createCar = async (req, res) => {
    try {
        const { name, seats, firstSideImage, secondSideImage } = req.body
        const newCar = new Car({
            name: name,
            seats: seats,
            carImages: {
            firstSideImage:firstSideImage,
            secondSideImage:secondSideImage
            }
        });
        
        const findCar = await Car.findOne({ name: name });
        if (findCar) return sendError(res, 404, "Car name already exist!", null);

        const carSaved = await newCar.save();
        return success(res, 201, "Car added successfully", carSaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getCars = async (req, res) => {
    try {
        const users = await Car.find().sort("-createdAt");
        return success(res, 200, "retrieved Cars", users)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        if (!car) return fail(res, 400, "Car doesn't exist", null)
        return success(res, 200, "retrieved Car", car)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id)
        if (!car) return fail(res, 400, "Car doesn't exist", null)
        return success(res, 200, "Car deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedCar = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedCar = await Car.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedCar) {
            return success(res, 201, "Car updated successful", updatedCar)
        }
        else {
            return fail(res, 404, `We don't have Car with this id ${id}`, null)
        }
    } catch (error) {
        res.status(404).json({ status: 'fail', message: error });
    }
}

export {
    createCar,
    getCars,
    getCar,
    deletedCar,
    updatedCar
};