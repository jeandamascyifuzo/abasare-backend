import express from 'express'
import {
    createTown,
    getTowns,
    getTown,
    deletedTown,
    updatedTown
} from '../controllers/Town'

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
 *         - name
 *         - state 
 *       properties:
 *         name:
 *           type: string
 *           description: name of the city 
 *         state:
 *           type: string
 *           description: state of the city
 *       example:
 *         name: Karuruma
 *         state: KAR
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
 *  name: City
 *  description: cities
 * 
 * */ 

/**
 * @swagger 
 * /api/v1/town:
 *  post:
 *    summary: Creating town
 *    tags:
 *    - "City"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 name:
 *                    type: string
 *                    description: This string of name
 *                 state:
 *                    type: string
 *                    description: This string of state
 *    responses:
 *        200: 
 *          description: city have been created
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
 * /api/v1/town:
 *   get:
 *     summary: Getting all towns
 *     tags: [City]
 *     responses:
 *       200:
 *         description: All available city
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
 * /api/v1/town/{id}:
 *  get:
 *    summary: get a town
 *    tags:
 *    - "City"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: city id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: User information
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
 *          description: city doesn't exist
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
 * /api/v1/town/{id}:
 *  delete:
 *    summary: Deleting a town
 *    tags:
 *    - "City"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: town id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: deleted town
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

router.route("/").post(createTown).get(getTowns)
router.route("/:id").get(getTown).delete(deletedTown).put(updatedTown)

export default router