import createHttpError from "http-errors"
import { createCar, deleteCar, getAllCar, getCarById, upsertedCar } from "../service/logic.js"
import { SORT_ORDER } from "../constants/constants.js"

export const getAllCarCOntrollers = async (req,res) => {
    const {page, perPage} = req.query
    const {sortOrder, sortBy} = req.query
    const result = await getAllCar({
        page,
        perPage,
        sortOrder,
        sortBy
    })
    res.status(200).json({
        data: result
    })
}
export const getCarByIdController = async (req,res,next) => {
    const {carId} = req.params
    const result = await getCarById(carId)
    res.status(200).json({
        data: result
    })
}
export const deleteCarByIdController = async (req,res,next) => {
    const {carId} = req.params
    const result = await deleteCar(carId)
    res.status(200).json({
        message: `Item with id ${carId} was successfully deleted`,
        data: {}
    })
}
export const createCarController = async (req,res,next) => {
    const payload = req.body
    const result = await createCar(payload)
    res.status(200).json({
        message: `Successfully create a car`,
        data: result
    })
}
export const patchCarController = async (req,res,next) => {
    const {carId} = req.params
    const result = await upsertedCar(carId, req.body, {upsert:true})
    const status = result.isNew ? 201 : 200
    res.status(status).json({
        message: 'Successfully upserted a car',
        data:result.car
    })
}