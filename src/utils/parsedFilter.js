import { SORT_ORDER } from "../constants/constants"

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = (SORT_ORDER.ACS, SORT_ORDER.DESC).includes(sortOrder)
    if(isKnownOrder) {
        return sortOrder
    }
    return SORT_ORDER.ACS
}
const parseSortBy = (sortBy) => {
    const keysOfCars = [
    "_id",
  "brand",
  "model",
  "year",
  "price_usd",
  "mileage_km",
  "engine",
  "transmission",
  "drivetrain",
  "body_type",
  "color",
  "features",
  "in_stock"
    ]
    if(keysOfCars.includes(sortBy)) return sortBy
    return "_id"
}
export const parseSortParams = (query) => {
    const {sortOrder, sortBy} = query

    const parsedSortOrder = parseSortOrder(sortOrder)
    const parsedSortBy = parseSortBy(sortBy)
    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy
    }
}