import express from 'express'
import {
    createUser,
    getUsers,
    getUser,
    deletedUser,
    updatedUser,
    changeUserPass,
    userLogin
} from '../controllers/User'

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
 *         - password   
 *         - confirmPassword
 *       properties:
 *         email:
 *           type: string
 *           description: email of the user 
 *         password:
 *           type: string
 *           description: password of the user 
 *         confirmPassword:
 *           type: string
 *           description: confirmPassword of the user
 *       example:
 *         email: cyifuzo.dev@gmail.com
 *         password: Admin123  
 *         confirmPassword: Admin123
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
 *  name: Users(Clients)
 *  description: Users
 * 
 * */ 

/**
 * @swagger 
 * /api/v1/user:
 *  post:
 *    summary: Creating user
 *    tags:
 *    - "Users(Clients)"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 email:
 *                    type: string
 *                    description: This string of email
 *                 password:
 *                    type: string
 *                    description: This string of password
 *                 confirmPassword:
 *                    type: string
 *                    description: This string of 10 confirmPassword
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
 * /api/v1/user:
 *   get:
 *     summary: Getting all users
 *     tags: [Users(Clients)]
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
 * /api/v1/user/{id}:
 *  get:
 *    summary: get a user
 *    tags:
 *    - "Users(Clients)"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: user id
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
 *          description: User doesn't exist
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
 * /api/v1/user/{id}:
 *  delete:
 *    summary: Deleting a user
 *    tags:
 *    - "Users(Clients)"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: user id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: deleted user
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
 * /api/v1/user/login:
 *  post:
 *    summary: logging in user
 *    tags:
 *    - "Users(Clients)"
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

router.post("/login", userLogin);
router.put("/change/password/:id", changeUserPass);
router.route("/").post(createUser).get( getUsers)
router.route("/:id").get(getUser).delete(deletedUser).put(updatedUser)

export default router