import { success, fail, sendError, } from '../function/respond'
import Town from '../models/Town'

const createTown = async (req, res) => {
    try {
        const { name, state } = req.body
        const newCity = new Town({
            name: name,
            state: state
        });
        
        const findCity = await Town.findOne({ state: state });
        if (findCity) return fail(res, 404, "This State already exist!", null);

        const citySaved = await newCity.save();
        return success(res, 201, "Town added successfully", citySaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getTowns = async (req, res) => {
    try {
        const city = await Town.find().sort("-createdAt");
        return success(res, 200, "retrieved all Cities", city)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getTown = async (req, res) => {
    try {
        const city = await Town.findById(req.params.id)
        if (!city) return fail(res, 400, "City doesn't exist", null)
        return success(res, 200, "retrieved City", city)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedTown = async (req, res) => {
    try {
        const city = await Town.findByIdAndDelete(req.params.id)
        if (!city) return fail(res, 400, "City doesn't exist", null)
        return success(res, 200, "City deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedTown = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedCity = await Town.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedCity) {
            return success(res, 201, "City updated successful", updatedCity)
        }
        else {
            return fail(res, 404, `We don't have City with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

export {
    createTown,
    getTowns,
    getTown,
    deletedTown,
    updatedTown
};