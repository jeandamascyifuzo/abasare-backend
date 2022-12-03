import jwt from"jsonwebtoken";
import { success,fail,sendError } from'../function/respond'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) return fail(res,403,null,"Wrong Token!");
            req.user = user;
            next();
        })
    } else {
        return fail(res,401,null,"Not authenticated!");
        
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "admin") {
            next();
        } else {
            return fail(res,403,null,"Change your own information");
        }
    });
};

const verifyTokenAndDriver = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "driver") {
            next();
        } else {
            return fail(res,403,null,"Change your own information");
        }
    });
};

const verifyTokenAndClient = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.userType === "client") {
            next();
        } else {
            return fail(res,403,null,"Change your own information");
        }
    });
};


export {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndDriver,
    verifyTokenAndClient
}