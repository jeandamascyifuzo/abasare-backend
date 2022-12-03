import express from 'express'
import {
    registerDriver,
    getDrivers,
    getDriver,
    deletedDriver,
    updatedDriver,
    changeDriverPass,
    driverLogin
} from '../controllers/RegisterDriver'

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
 *         - email
 *         - fullName
 *         - address
 *         - cityName
 *         - phoneNumber
 *         - alternatePhoneNumber
 *         - gender
 *         - avatar
 *         - licenseNumber
 *         - fontSide
 *         - backSide
 *         - latitude   
 *         - longitude
 *         - commission
 *         - yearExperience
 *         - rides
 *         - cost
 *       properties:
 *         email:
 *           type: string
 *           description: email of the user 
 *         fullName:
 *           type: string
 *           description: fullName of the user 
 *         address:
 *           type: string
 *           description: address of the user
 *         cityName:
 *           type: string
 *           description: cityName of the user
 *         phoneNumber:
 *           type: string
 *           description: phoneNumber of the user
 *         alternatePhoneNumber:
 *           type: string
 *           description: alternatePhoneNumber of the user
 *         gender:
 *           type: string
 *           description: gender of the user
 *         avatar:
 *           type: string
 *           description: avatar of the user
 *         licenseNumber:
 *           type: string
 *           description: licenseNumber of the user
 *         fontSide:
 *           type: string
 *           description: fontSide of the user
 *         backSide:
 *           type: string
 *           description: backSide of the user
 *         latitude:
 *           type: string
 *           description: latitude of the user
 *         longitude:
 *           type: string
 *           description: longitude of the user
 *         commission:
 *           type: string
 *           description: commission of the user
 *         yearExperience:
 *           type: string
 *           description: yearExperience of the user
 *         rides:
 *           type: string
 *           description: rides of the user
 *         cost:
 *           type: string
 *           description: cost of the user
 *       example:
 *         email: cyifuzo.dev@gmail.com
 *         fullName: string  
 *         address: muhanga
 *         cityName: kigali
 *         phoneNumber: 098765  
 *         alternatePhoneNumber: 345678
 *         gender: male
 *         avatar: imageLink
 *         licenseNumber: 987rthjkl
 *         fontSide: imageLink
 *         backSide: imageLink
 *         latitude : 98765  
 *         longitude: 09876
 *         commission: 6000
 *         yearExperience: 5 years
 *         rides: 6
 *         cost: 15000
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
 *  name: Driver
 *  description: Driver
 * 
 * */

/**
 * @swagger 
 * /api/v1/driver:
 *  post:
 *    summary: Creating Driver
 *    tags:
 *    - "Driver"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 email:
 *                    type: string
 *                    description: This string of email
 *                 fullName:
 *                    type: string
 *                    description: string of the fullName 
 *                 address:
 *                    type: string
 *                    description: string of the cityName
 *                 cityName:
 *                    type: string
 *                    description: string of the user
 *                 phoneNumber:
 *                    type: string
 *                    description: string of the phoneNumber
 *                 alternatePhoneNumber:
 *                    type: string
 *                    description: string of the alternatePhoneNumber
 *                 gender:
 *                    type: string
 *                    description: string of the gender
 *                 avatar:
 *                    type: string
 *                    description: string of the profilePicture
 *                 licenseNumber:
 *                    type: string
 *                    description: string of the licenseNumber
 *                 fontSide:
 *                    type: string
 *                    description: string of the image fontSide
 *                 backSide:
 *                    type: string
 *                    description: string of the image backSide
 *                 latitude:
 *                    type: string
 *                    description: string of the latitude
 *                 longitude:
 *                    type: string
 *                    description: string of the longitude
 *                 commission:
 *                    type: string
 *                    description: string of the commission
 *                 yearExperience:
 *                    type: string
 *                    description: string of the yearExperience
 *                 rides:
 *                    type: string
 *                    description: string of the rides
 *                 cost:
 *                    type: string
 *                    description: string of the cost
 *    responses:
 *        200: 
 *          description: User have been created
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
 * /api/v1/driver:
 *   get:
 *     summary: Getting all Drivers
 *     tags: [Driver]
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
 * /api/v1/driver/{id}:
 *  get:
 *    summary: get a Driver
 *    tags:
 *    - "Driver"
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
 * /api/v1/driver/{id}:
 *  delete:
 *    summary: Deleting a Driver
 *    tags:
 *    - "Driver"
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


/**
 * @swagger 
 * /api/v1/driver/login:
 *  post:
 *    summary: Driver logging in 
 *    tags:
 *    - "Driver"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 email:
 *                    type: string
 *                    description: client@gmail.com
 *                 password:
 *                    type: string
 *                    description: test123  
 *    responses:
 *        200: 
 *          description: User logged in response
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                    token:
 *                      type: string                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Wrong credentials
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

router.post("/login", driverLogin);
router.put("/change/password/:id", changeDriverPass);
router.route("/").post(registerDriver).get(getDrivers)
router.route("/:id").get(getDriver).delete(deletedDriver).put(updatedDriver)

export default router
