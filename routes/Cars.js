import express from 'express'
import {
    createCar,
    getCars,
    getCar,
    deletedCar,
    updatedCar
} from '../controllers/Cars'

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
} from '../middleware/Auth' 

const router = express.Router();

router.route("/").post(createCar).get(getCars)
router.route("/:id").get(getCar).delete(deletedCar).put(updatedCar)

export default router