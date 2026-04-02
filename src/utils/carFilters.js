const filters = (carsQuery, filter) => {
if(filter.engine) {
    carsQuery.where('engine.type').equals(filter.engine);
}
if(filter.transmission) {
    carsQuery.where('transmission').equals(filter.transmission);
}
if(filter.drivetrain) {
    carsQuery.where('drivetrain').equals(filter.drivetrain);
}
if(filter.body_type) {
    carsQuery.where('body_type').equals(filter.body_type);
}
if(filter.brand) {
    carsQuery.where('brand').equals(filter.brand);
}
if(filter.model) {
    carsQuery.where('model').equals(filter.model);
}
if(filter.maxYear) {
    carsQuery.where('year').lte(filter.maxYear);
}
if(filter.minYear) {
    carsQuery.where('year').gte(filter.minYear);
}
if(filter.maxPrice) {
    carsQuery.where('price_usd').lte(filter.maxPrice);
}
if(filter.minPrice) {
    carsQuery.where('price_usd').gte(filter.minPrice);
}
if(filter.maxMileage) {
    carsQuery.where('mileage_km').lte(filter.maxMileage);
}
if(filter.minMileage) {
    carsQuery.where('mileage_km').gte(filter.minMileage);
}
if(filter.color) {
    carsQuery.where('color').equals(filter.color);
}
if(filter.features) {
    carsQuery.where('features').equals(filter.features);
}
};

export  default filters;
