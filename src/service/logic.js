import createHttpError from "http-errors"
import { carsCollection } from "../DB/dbSchema.js"
import { calculatePaginationData } from "../utils/parsedNumbers.js"
import { SORT_ORDER } from "../constants/constants.js"
import filters from "../utils/carFilters.js"


export const getAllCar = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ACS,
    sortBy = "_id",
    filter = {}
}) => {
    const limit = perPage
    const skip = (page - 1 ) * perPage
    const carQuery = carsCollection.find()
    filters(carQuery, filter )
    const carCount = await carsCollection.find().merge(carQuery).countDocuments()

    const car = await carQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder}).exec()
    const paginationData = calculatePaginationData(carCount, page, perPage)
    return {
        data: car,
        ...paginationData
    }
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