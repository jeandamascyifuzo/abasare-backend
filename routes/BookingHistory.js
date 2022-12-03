import express from 'express'
import {
    createBooking,
    getBookings,
    getDriverBookings,
    cancelBooking
} from '../controllers/BookingHistory'

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
} from '../middleware/Auth' 

const router = express.Router();


/**
 * @swagger
 * tags:
 *  name: Booking History
 *  description: Booking History
 * 
 * */


/**
 * @swagger
 * /api/v1/history/booking:
 *   get:
 *     summary: Getting all booking
 *     tags: [Booking History]
 *     responses:
 *       200:
 *         description: All available BookingHistory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Internal server error 
*/

/**
 * 
 * @swagger  
 * /api/v1/history/booking/{id}:
 *  get:
 *    summary: get a BookingHistory
 *    tags:
 *    - "Booking History"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: booking id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: BookingHistory information
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: integer
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: booking doesn't exist
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */


/**
 * @swagger 
 * 
 * /api/v1/history/booking/{id}:
 *  delete:
 *    summary: Deleting a BookingHistory
 *    tags:
 *    - "Booking History"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: booking id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: deleted booking
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: integer
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */

router.route("/").post(createBooking).get(getBookings)
router.route("/:id").get(getDriverBookings).delete(cancelBooking)

export default router