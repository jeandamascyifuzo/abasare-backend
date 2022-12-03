import { success, fail, sendError, } from '../function/respond'
import Nation from '../models/Nation'

const createNation = async (req, res) => {
    try {
        const { name, phone_code } = req.body
        const newUser = new Nation({
            name: name,
            phone_code: phone_code
        });
        
        const findUser = await Nation.findOne({ name: name });
        if (findUser) return sendError(res, 404, "This Nation already exist!", null);

        const userSaved = await newUser.save();
        return success(res, 201, "Nation added successfully", userSaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getNations = async (req, res) => {
    try {
        const users = await Nation.find().sort("-createdAt");
        return success(res, 200, "retrieved all Nations", users)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getNation = async (req, res) => {
    try {
        const nation = await Nation.findById(req.params.id)
        if (!nation) return fail(res, 400, "Nation doesn't exist", null)
        return success(res, 200, "retrieved Nations", nation)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedNation = async (req, res) => {
    try {
        const nation = await Nation.findByIdAndDelete(req.params.id)
        if (!nation) return fail(res, 400, "Nation doesn't exist", null)
        return success(res, 200, "Nation deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedNation = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedNation = await Nation.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedNation) {
            return success(res, 201, "User updated successful", updatedNation)
        }
        else {
            return fail(res, 404, `We don't have User with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

export {
    createNation,
    getNations,
    getNation,
    deletedNation,
    updatedNation
};