import { ONE_DAY } from "../constants/constants.js"
import { loginUser, logoutUser, refreshSession, registerUser } from "../service/auth.js"


export const registrationController = (req,res) => {
    const user = registerUser(req.body)
    res.status(200).json({
        message: 'Registration successfully finished',
        data: user
    })
}
export const loginUserController = async (req,res) => {
    const session = await loginUser(req.body);
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    }),
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    });
    res.status(201).json({
        message: "successfully logged in",
        data: {
            accessToken: session.accessToken
        }
    })
}

const setupSession = (res, session) => {
        res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expiries: new Date(Date.now() + ONE_DAY)
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expiries: new Date(Date.now() + ONE_DAY)
    });
};

export const logoutUserController = async (req,res) => {
    if(req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId)
    }
    res.clearCookie("refreshToken")
    res.clearCookie("sessionId")
    res.status(204).send()
}
export const refreshSessionController = async (req,res) => {
    const session = await refreshSession({
        sessionId: req.cookies.sessionId, 
        refreshToken: req.cookies.refreshToken
    })
    setupSession(res, session)
    res.status(200).json({
        message: 'Successfully update a session',
        data: {
            accessToken: session.accessToken
        }
    })
}