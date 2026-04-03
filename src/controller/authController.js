import { registerUser } from "../service/auth.js"

export const registrationController = (req,res) => {
    const user = registerUser(req.body)
    res.status(200).json({
        message: 'Registration successfully finished',
        data: user
    })
}