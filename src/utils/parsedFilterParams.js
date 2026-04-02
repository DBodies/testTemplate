 const parseEngine = (engine) => {
    if(typeof engine !== 'string') return
    const normalize = engine.trim().toLowerCase()
    const allowed = ['petrol", "diesel", "electric", "hybrid']
    if(allowed.includes(normalize)) return normalize
}
const parseTransmission = (transmission) => {
    if(typeof transmission !== 'string') return
    const normalize = transmission.trim().toLowerCase()
    const allowed = ["manual", "automatic", "cvt", "robot"]
    if(allowed.includes(normalize)) return normalize
}
const parseDrivetrain = (drivetrain) => {
    if(typeof drivetrain !== 'string') return
    const normalize = drivetrain.trim().toLowerCase()
    const allowed = ["fwd", "rwd", "awd", "4wd"]
    if(allowed.includes(normalize)) return normalize
}
const parseBodytype = (bodytype) => {
    if(typeof bodytype !== 'string')  return
    const normalize = bodytype.trim().toLowerCase()
    const allowed = ["sedan", 
        "hatchback", 
        "wagon",
        "suv", 
        "coupe", 
        "convertible", 
        "pickup", 
        "van"]
        if(allowed.includes(normalize)) return
}
const parseString = (value) => {
    if (typeof value !== "string") return;
    return value.trim().toLowerCase();
};
export const parseNumber = (number) => {
    const isString = typeof number === 'string'
    if(!isString) return
    const parsedNumber = parseInt(number)
    if(Number.isNaN(number)) {
        return
    }
    return parsedNumber
}
export const parsedAllParams = (query) => {
    const {
engine,
transmission,
drivetrain,
body_type,
brand,
model,
maxYear,
minYear,
maxPrice,
minPrice,
maxMileage,
minMileage,
color,
features
    } = query

    const parsedEngine = parseEngine(engine);
const parsedTransmission = parseTransmission(transmission);
const parsedDrivetrain = parseDrivetrain(drivetrain);
const parsedBodyType = parseBodytype(body_type);
const parsedBrand = parseString(brand);
const parsedModel = parseString(model);
const parsedMaxYear = parseNumber(maxYear);
const parsedMinYear = parseNumber(minYear);
const parsedMaxPrice = parseNumber(maxPrice);
const parsedMinPrice = parseNumber(minPrice);
const parsedMaxMileage = parseNumber(maxMileage);
const parsedMinMileage = parseNumber(minMileage);
const parsedColor = parseString(color);
const parsedFeatures = parseString(features);

return {
engine: parsedEngine,
transmission: parsedTransmission,
drivetrain: parsedDrivetrain,
body_type: parsedBodyType,
brand: parsedBrand,
model: parsedModel,
maxYear: parsedMaxYear,
minYear: parsedMinYear,
maxPrice: parsedMaxPrice,
minPrice: parsedMinPrice,
maxMileage: parsedMaxMileage,
minMileage: parsedMinMileage,
color: parsedColor,
features: parsedFeatures
};
}