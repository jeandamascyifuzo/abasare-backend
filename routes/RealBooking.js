import express from 'express'
import {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
  updatedBooking
} from '../controllers/RealBooking'

import {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
} from '../middleware/Auth' 

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - is_rated
 *         - pickup_address
 *         - drop_address
 *         - ride_status
 *         - total_amount
 *         - payment_status
 *         - booking_status
 *         - clientProfileId
 *         - driverProfileId
 *         - cancelled_by
 *         - cancellation_reason
 *       properties:
 *         is_rated:
 *           type: string
 *           description: is_rated of the user 
 *         pickup_address:
 *           type: string
 *           description: pickup_address of the user 
 *         drop_address:
 *           type: string
 *           description: drop_address of the user
 *         ride_status:
 *           type: string
 *           description: ride_status of the user
 *         total_amount:
 *           type: string
 *           description: total_amount of the user
 *         payment_status:
 *           type: string
 *           description: payment_status of the user
 *         booking_status:
 *           type: string
 *           description: booking_status of the user
 *         clientProfileId:
 *           type: string
 *           description: clientProfileId of the user
 *         driverProfileId:
 *           type: string
 *           description: driverProfileId of the user
 *         cancelled_by:
 *           type: string
 *           description: cancelled_by of the user
 *         cancellation_reason:
 *           type: string
 *           description: cancellation_reason of the user
 *       example:
 *         is_rated: something
 *         pickup_address: something
 *         drop_address: something
 *         ride_status: something
 *         total_amount: something
 *         payment_status: something
 *         booking_status: something
 *         clientProfileId: something
 *         driverProfileId: something
 *         cancelled_by: something
 *         cancellation_reason: something
 *   error: 
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        data:
 *          type: null
 *        message:
 *          type: string    
 */

/**
 * @swagger
 * tags:
 *  name: RealBooking
 *  description: RealBooking
 * 
 * */


/**
 * @swagger 
 * /api/v1/real_booking/{driverId}:
 *  post:
 *    summary: Creating Booking
 *    tags:
 *    - "RealBooking"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 is_rated:
 *                    type: string
 *                    description: string of the is_rated 
 *                 order_id:
 *                    type: string
 *                    description: string of the order_id
 *                 pickup_address:
 *                    type: string
 *                    description: string of the pickup_address
 *                 drop_address:
 *                    type: string
 *                    description: string of the drop_address
 *                 booking_status:
 *                    type: string
 *                    description: string of the booking_status
 *                 ride_status:
 *                    type: string
 *                    description: string of the ride_status
 *                 total_amount:
 *                    type: string
 *                    description: string of the total_amount
 *                 payment_status:
 *                    type: string
 *                    description: string of the payment_status
 *                 driverProfileId:
 *                    type: string
 *                    description: string of the driverProfileId
 *                 clientProfileId:
 *                    type: string
 *                    description: string of clientProfileId
 *                 cancelled_by:
 *                    type: string
 *                    description: string of the cancelled_by
 *                 cancellation_reason:
 *                    type: string
 *                    description: string of cancellation_reason
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Driver id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: Booking have been added
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: object 
 *                    message:
 *                      type: string                        
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

/**
 * @swagger
 * /api/v1/real_booking:
 *   get:
 *     summary: Getting all Booking
 *     tags: [RealBooking]
 *     responses:
 *       200:
 *         description: All available Booking
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
 * /api/v1/real_booking/{id}:
 *  get:
 *    summary: get Booking
 *    tags:
 *    - "RealBooking"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: booking id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: Booking information
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
 *          description: Driver doesn't exist
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
 * /api/v1/real_booking/{id}:
 *  delete:
 *    summary: Deleting a Booking
 *    tags:
 *    - "RealBooking"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Booking id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: deleted Booking
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


router.route("/:driverId/:userId").post(createBooking)
router.route("/").get(getBookings)
router.route("/:id").get(getBooking).delete(cancelBooking).put(updatedBooking)

export default router