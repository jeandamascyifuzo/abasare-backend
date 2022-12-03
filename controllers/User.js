import { success, fail, sendError, } from '../function/respond'
import User from '../models/User'
import UserProfile from '../models/ClientProfile'

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword } from '../utils/email'

const createUser = async (req, res) => {
    try {
        const {
            customer_id,
            name,
            email,
            userId,
            password,
            confirmPassword,
            userType,
            phone_code,
            phone,
            nationality,
            address,
            doc_type,
            domestic_license,
            driving_permit_fontSide,
            driving_permit_backSide,
            international_license,
            passport,
            aadhar_card,
            status,
        } = req.body
        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: password,
            confirmPassword:confirmPassword,
            userType: userType
        });
        
        const findUser = await User.findOne({ email: email });
        if (findUser) return sendError(res, 409, "This email already exist! change email address 👍🏼", null);

        const userSaved = await newUser.save(function (err, room) {
            const userId = room._id;
            const userProfile = new UserProfile({
                customer_id,
                name: name,
                email: email,
                userId: userId,
                phone_code: phone_code,
                phone,
                nationality: nationality,
                address: address,
                doc_type: doc_type,
                domestic_license: domestic_license,
                driving_permit: {
                    driving_permit_fontSide: driving_permit_fontSide,
                    driving_permit_backSide: driving_permit_backSide
                },
                international_license: international_license,
                passport: passport,
                aadhar_card: aadhar_card,
                status: status
            })
            userProfile.save()
        })
        return success(res, 201, "User added successfully", userSaved)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort("-createdAt");
        return success(res, 200, "retrieved all users", users)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return fail(res, 400, "user doesn't exist", null)
        return success(res, 200, "retrieved Users", user)

    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const deletedUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return fail(res, 400, "user doesn't exist", null)
        return success(res, 200, "user deleted successful", null)
    } catch (error) {
        return sendError(res, 500, error.message, null)
    }
}

const updatedUser = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        })
        if (updatedUser) {
            return success(res, 201, "User updated successful", updatedUser)
        }
        else {
            return fail(res, 404, `We don't have User with this id ${id}`, null)
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

const changeUserPass = async (req, res) => {
    try {
        var id = req.params.id;
        let {password,confirmPassword} = req.body;
        if(password !=confirmPassword) return fail(res,400,"Password doens't match")
        let data = await User.findOneAndUpdate({ _id: id },
             {password: hashPassword(password)} );
        const findeUpdateUser = await User.findOne({ _id: id });
        if (findeUpdateUser) {
            return success(res,200,"Password Changed successful",findeUpdateUser);
        }
        else {
            return fail(res,400,"User doens't exist",null );
        }
    } catch (error) {
        res.status(200).json({ status: 'fail', message: error });
    }
}

const userLogin = (req, res, next) => {
    User.find({ email: req.body.email })
        .select()
        .exec()
        .then(user => {
            if (user.length < 1) {
                return fail(res, 404, "invalid credential", null)
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        {
                            userType: user[0].userType,
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SEC,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({ status: 'success', user, token, message: 'Welcome 👍🏾' });
                }
                return fail(res, 404, "invalid credential", null)
            });
        })
        .catch(err => {
            console.log(err);
            return sendError(res, 500, null, err.message)
        });
};

export {
    createUser,
    getUsers,
    getUser,
    deletedUser,
    updatedUser,
    changeUserPass,
    userLogin
};