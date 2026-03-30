import createHttpError from "http-errors"
import { carsCollection } from "../DB/dbSchema.js"

export const getAllCar = async () => {
    const car = await carsCollection.find()
    return car
}
export const getCarById = async (carId) => {
    const car = await carsCollection.findById(carId)
        if(!car) {
            throw createHttpError(404, "Car is not found")
        }
    return  car
}
export const deleteCar = async (carId) => {
    const car = await carsCollection.findByIdAndDelete(carId)
        if(!car) {
            throw createHttpError(404, "Car is not found")
        }
        return car
}
export const createCar = async (payload) => {
    const car =  await carsCollection.create(payload)
    return car
}
export const upsertedCar = async (carId, payload, options) => {
    const rawResult = await carsCollection.findByIdAndUpdate(
        {_id: carId},
        payload,
        {
            new: true,
            includeResultMetadata: true ,
            ...options
        }
    )
    if(!rawResult || !rawResult.value) return null
    return {
        car: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    }
}