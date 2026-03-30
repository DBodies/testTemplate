import createHttpError from "http-errors"
import { users } from "../DB/DB.js"

const firstPractice = async ()  => {
const user = await users
.filter(user =>  user.age >= 18)
.map(user => user.name)
if(!user) {
    createHttpError(404, 'User not found')
}
return user
} 
export const firstPracticeController = async (req,res,next ) => {
try {
    const response = await firstPractice()
    res.status(200).json({
              message: 'Successfully got an answer',
      data: response,
    }) 
} catch (err) {
        next(err)
    }
}