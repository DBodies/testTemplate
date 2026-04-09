export const errorHandler = (err,req,res,next) => {
    const status = err.status || 500
    res.status(status).json({
        message: err.message || "Something went wrong"
    })
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