import express from 'express'
import {
	getDrivers,
    getDriver,
    deletedDriver,
    updatedDriver
} from '../controllers/DriverProfile'
import {
    verifyToken,
    verifyTokenAndDriver
} from '../middleware/Auth'

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Driver Profile
 *  description: Driver Profile
 * 
 * */


/**
 * @swagger
 * /api/v1/drivers/profile:
 *   get:
 *     summary: Getting all Drivers
 *     tags: [Driver Profile]
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
 * /api/v1/drivers/profile/{id}:
 *  get:
 *    summary: get a Driver
 *    tags:
 *    - "Driver Profile"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Driver id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: Driver information
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
 * /api/v1/drivers/profile/{id}:
 *  delete:
 *    summary: Deleting a Driver
 *    tags:
 *    - "Driver Profile"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: driver id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: deleted driver
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

router.route("/").get(getDrivers)
router.route("/:id").get(getDriver).delete(deletedDriver).put(updatedDriver)

export default router