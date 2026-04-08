import createHttpError from "http-errors"
import { SessionCollection, userCollection } from "../DB/userCollection.js"
import bcrypt from 'bcrypt'
import { randomBytes } from "crypto"
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/constants.js"

export const registerUser = async (payload) => {
const user = await userCollection.findOne({email: payload.email})
if(user) {
    throw createHttpError(409, 'User has already registered')
}
const encryptedPassword = await bcrypt.hash(payload.password, 10)
return userCollection.create({
    ...payload,
    password: encryptedPassword
})
}
export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64')
    const refreshToken = randomBytes(30).toString('base64')

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
    }
}
export const loginUser = async (payload) => {
    const email = await userCollection.findOne({email: payload.email})
    if(!email) {
        throw createHttpError(404, "User not found")
    }
    const isEqual = await bcrypt.compare(payload.password, email.password) 
    if(!isEqual) {
        throw createHttpError(401, 'Unauthorized')
    }
   await SessionCollection.deleteOne({userId: email._id})
    const accessToken = randomBytes(30).toString('base64')
    const refreshToken = randomBytes(30).toString('base64')

    return await SessionCollection.create({
        userId: email._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
    })
}
export const logoutUser = async (sessionId) => {
await SessionCollection.deleteOne({_id: sessionId})
}
export const refreshSession = async({sessionId, refreshToken}) => {
    const session = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken})
    if(!session) {
        throw createHttpError(401, 'Session not found')
    }
    const isRefreshTokenExpired = new Date() > new Date(session.refreshTokenValidUntil)
    if(isRefreshTokenExpired) {
        throw createHttpError(401, 'Token expired')
    }
    const newSession = createSession()
    await SessionCollection.deleteOne({
        _id: sessionId,
        refreshToken
    })
    return await SessionCollection.create({
        userId: session.userId,
        ...newSession
    })
}