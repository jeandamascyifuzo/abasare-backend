import express from 'express'
import {
    createBooking,
    getBookings,
    cancelBooking,
    getBooking
} from '../controllers/Booking'
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
 *         - is_reported
 *         - is_rated
 *         - order_id
 *         - pickup_date
 *         - return_date
 *         - billing_type
 *         - ride_status
 *         - total_amount
 *         - payment_status
 *         - driverProfileId
 *       properties:
 *         is_reported:
 *           type: string
 *           description: is_reported of the user 
 *         is_rated:
 *           type: string
 *           description: is_rated of the user 
 *         order_id:
 *           type: string
 *           description: order_id of the user
 *         pickup_date:
 *           type: string
 *           description: pickup_date of the user
 *         return_date:
 *           type: string
 *           description: return_date of the user
 *         billing_type:
 *           type: string
 *           description: billing_type of the user
 *         ride_status:
 *           type: string
 *           description: ride_status of the user
 *         total_amount:
 *           type: string
 *           description: total_amount of the user
 *         payment_status:
 *           type: string
 *           description: payment_status of the user
 *         driverProfileId:
 *           type: string
 *           description: driverProfileId of the user
 *       example:
 *         is_reported: is_reported
 *         is_rated: is_rated  
 *         order_id: order_id
 *         pickup_date: 31/12/2021
 *         return_date: 1/1/2020 
 *         billing_type: cash
 *         ride_status: ride_status
 *         total_amount: frw 10000
 *         payment_status: pending
 *         driverProfileId: ggf098766gths
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
 *  name: Booking
 *  description: Booking
 * 
 * */

/**
 * @swagger 
 * /api/v1/booking/book/{driverId}:
 *  post:
 *    summary: Creating Booking
 *    tags:
 *    - "Booking"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 is_reported:
 *                    type: string
 *                    description: This string of is_reported
 *                 is_rated:
 *                    type: string
 *                    description: string of the is_rated 
 *                 order_id:
 *                    type: string
 *                    description: string of the order_id
 *                 pickup_date:
 *                    type: string
 *                    description: string of the pickup_date
 *                 return_date:
 *                    type: string
 *                    description: string of the return_date
 *                 billing_type:
 *                    type: string
 *                    description: string of the billing_type
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
 *                    description: string of the image driverProfileId
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
 * /api/v1/booking:
 *   get:
 *     summary: Getting all Bookings
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: All available Users
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
 * /api/v1/booking/{id}:
 *  get:
 *    summary: get a Booking
 *    tags:
 *    - "Booking"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Booking id
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
 * /api/v1/booking/cancel/{id}:
 *  delete:
 *    summary: cancel a Booking
 *    tags:
 *    - "Booking"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Booking id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: canceled Booking
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

router.post("/book/:driverId", createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.delete("/cancel/:id", cancelBooking);

export default router