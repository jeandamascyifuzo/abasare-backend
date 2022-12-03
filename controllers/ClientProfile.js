import { success, fail, sendError, } from '../function/respond'
import Client from '../models/ClientProfile'
import User from '../models/User'


const getClients = async (req, res) => {
    try {
        const drivers = await Client.find().sort("-createdAt");
        return success(res, 200, "retrieved all Users", drivers)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getClient = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const clientId = user._id
        const client = await Client.findOne({userId:clientId})
        if (!client) return fail(res, 400, "User doesn't exist", null)
        return success(res, 200, "retrieved User", client)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedClient = async (req, res) => {
    try {
        const driver = await Client.findByIdAndDelete(req.params.id)
        if (!driver) return fail(res, 400, "User doesn't exist", null)
        return success(res, 200, "User deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedDriver = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedClient = await Client.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedClient) {
            return success(res, 201, "User updated successful", updatedClient)
        }
        else {
            return fail(res, 404, `We don't have User with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

export {
    getClients,
    getClient,
    deletedClient,
    updatedDriver
};