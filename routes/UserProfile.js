import express from 'express'
import {
    createUserProfile,
    getUserProfiles,
    getUserProfile,
    deleteUserProfile
} from '../controllers/UserProfile'

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
} from '../middleware/Auth' 

const router = express.Router();




router.route("/").post(createUserProfile).get(getUserProfiles)
router.route("/:id").get(getUserProfile).delete(deleteUserProfile)

export default router