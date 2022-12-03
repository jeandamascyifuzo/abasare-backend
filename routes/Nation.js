import express from 'express'
import {
    createNation,
    getNations,
    getNation,
    deletedNation,
    updatedNation
} from '../controllers/Nation'

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
} from '../middleware/Auth' 

const router = express.Router();

router.route("/").post(createNation).get(getNations)
router.route("/:id").get(getNation).delete(deletedNation).put(updatedNation)

export default router