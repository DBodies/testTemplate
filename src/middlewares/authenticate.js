import createHttpError from "http-errors"
import { SessionCollection, userCollection } from "../DB/userCollection.js"

export const authenticate = async (req,res, next) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) {
        next(createHttpError(401, 'Please provide the auth header'))
        return
    }
    const bearer = authHeader.split(" ")[0]
    const token = authHeader.split(" ")[1]
    if(bearer !== "Bearer" || !token) {
        next(createHttpError(401, "Authorization header should be a Bearer type"))
        return
    }
    const session = await SessionCollection.findOne({accessToken:token})
    if(!session) {
        next(createHttpError(401, "Please, login to your account"))
        return
    }
    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil)
    if(isAccessTokenExpired) {
        next(createHttpError(401, 'Access token expired'))
    }
    const user = await userCollection.findById(session.userId)
    if(!user) {
        next(createHttpError(401, 'User not found'))
        return
    }
    req.user = user
    next()
}