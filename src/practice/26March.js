import createHttpError from 'http-errors'
import {usersByAge, numbers, usersName, numbersWithDuplicate,
    usersId
} from '../DB/DB.js'


const groupByAge = (usersByAge) => {
return usersByAge.reduce((acc,user) => {
    if(!acc[user.age]) {
        acc[user.age] = []
    }
    acc[user.age].push(user.name)
    return acc
}, {})
}
export const groupByAgeController = async (req,res,next) => {
    try {
        const result = groupByAge(usersByAge)
        res.status(200).json({
            data:result
        })
    } catch (err) {
next(err)
    }
}
// ----------------------------------------------------------------
const getOlderUser = (usersByAge) => {
return usersByAge.reduce((oldest, user) => {
    if(user.age > oldest.age) {
        return user
    }
    return oldest
})
}
export const getOlderUserController = async (req,res,next) => {
    try {
        const result = getOlderUser(usersByAge)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}
// ----------------------------------------------------------------

const countNumbers = (numbers) => {
return numbers.reduce((prev, cur) => {
    const total = prev + cur
    return total
}, {})
}

export const countNumbersController = async (req,res,next) => {
    try {
        const result = await countNumbers(numbers)
        res.status(200).json({
            data:result
        })
    } catch(err) {
        next(err)
    }
}
// ----------------------------------------------------------------
const roleCount = (usersName) => {
return usersName.reduce((acc, cur) => {
acc[cur.role] = (acc[cur.role] || 0 ) + 1
return acc
}, {})
}
export const userNameController = async (req,res,next) => {
    try {
        const result = await roleCount(usersName)
        res.status(200).json({
            data: result
        })
    }catch(err) {
        next(err)
    }
}
// ----------------------------------------------------------------
const deleteDuplicate = (numbersWithDuplicate) => {
    const withoutDuplicate = [...new Set(numbersWithDuplicate)]
    return withoutDuplicate
}
export const deleteDuplicateController = async (req,res,next) => {
    try {
        const result = await deleteDuplicate(numbersWithDuplicate)
        res.status(200).json({
            data: result
        })
    }catch(err) {
        next(err)
    }
}
// ----------------------------------------------------------------
const theOldestUser = async (usersByAge) => {
    return usersByAge.reduce((acc, user) => {
        if(acc.age > user.age) {
            return acc
        }
        return user
    },{})
}  
export const theOldestUserController = async (req, res,next) => {
    const result = await theOldestUser(usersByAge)
    res.status(200).json({
        data: result
    })
}
// ----------------------------------------------------------------
const userID = (usersId) => {
    return usersId.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
    },{})
}
export const userIdController = async (req,res,next) => {
    try {
         const result = await userID(usersId)
         res.status(200).json({
            data:result
         })
    }catch (err) {
        next(err)
    }
}
// ---------------------------------------------------------------- 27.03.

export const validateBody = (usersByAge) => async (req,res,next) => {
    try {
        await usersByAge.validateAsync(req.body, {abortEarly: false})
        next()
    }catch( err ) {
    const error = createHttpError(400, 'Request is wrong', 
        {
            errors: err.details
        })
    next(error)
}
}

export const errorHandler = (err,req,res,next) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message || "Something went wrong"
    })
}
export const patchUser = (database) => {
}
export const ctrlWrapper = (controller) => {
    return async (req,res,next) => {
        try {
            await controller(req,res,next)
        }catch(err) {
            next(err)
        }
    }
}