import createHttpError from "http-errors"
import { ROLES } from "../constants/constants.js"

export const checkRoles = (...roles) => 
    (req,res,next) => {
        const {user} = req
        if(!user) {
            if(roles.includes(ROLES.GUEST)) {
                next()
                return
            }
            return  next(createHttpError(401, "Please authorize in your account"))
        }
        if(roles.includes(user.role)) {
            return next()
        }
        return next(createHttpError(403, "Forbidden"))
}