import { success, fail, sendError, } from '../function/respond'
import UserProfile from '../models/UserProfile'

const createUserProfile = async (req, res) => {

    try {
        const {
            user_id,
            api_token,
            fcm_id,
            device_token,
            socialmedia_uid,
            user_name,
            phone,
            phone_code,
            emailid,
            password,
            profile_pic,
            status,
            phone_verified,
            timestamp
        } = req.body

        const newClient = new UserProfile({
            user_id,
            api_token,
            fcm_id,
            device_token,
            socialmedia_uid,
            user_name,
            phone,
            phone_code,
            emailid,
            password,
            profile_pic,
            status,
            phone_verified,
            timestamp
        });
        const clientSaved = await newClient.save();
        return success(res, 201, "User profile created successfully", clientSaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getUserProfiles = async (req, res) => {
    try {
        const userProfile = await UserProfile.find();
        return res.status(200).json({
            success: 1,
            message: "You have Signed in Successfully!",
            data: {
                userinfo: userProfile
            }
        })
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id)
        if (!userProfile) return fail(res, 400, "userProfile doesn't exist", null)
        return success(res, 200, "Data fetched!", userProfile)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id)
        if (!userProfile) return fail(res, 400, "User Profile doesn't exist", null)
        return success(res, 200, "User Profile deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

export {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    deleteUserProfile
};