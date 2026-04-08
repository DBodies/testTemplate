const filters = (carQuery, filter) => {
if(filter.engine) {
    carQuery.where('engine.type').equals(filter.engine);
}
if(filter.transmission) {
    carQuery.where('transmission').equals(filter.transmission);
}
if(filter.drivetrain) {
    carQuery.where('drivetrain').equals(filter.drivetrain);
}
if(filter.body_type) {
    carQuery.where('body_type').equals(filter.body_type);
}
if(filter.brand) {
    carQuery.where('brand').equals(filter.brand);
}
if(filter.model) {
    carQuery.where('model').equals(filter.model);
}
if(filter.maxYear) {
    carQuery.where('year').lte(filter.maxYear);
}
if(filter.minYear) {
    carQuery.where('year').gte(filter.minYear);
}
if(filter.maxPrice) {
    carQuery.where('price_usd').lte(filter.maxPrice);
}
if(filter.minPrice) {
    carQuery.where('price_usd').gte(filter.minPrice);
}
if(filter.maxMileage) {
    carQuery.where('mileage_km').lte(filter.maxMileage);
}
if(filter.minMileage) {
    carQuery.where('mileage_km').gte(filter.minMileage);
}
if(filter.color) {
    carQuery.where('color').equals(filter.color);
}
if(filter.features) {
    carQuery.where('features').equals(filter.features);
}
};

export  default filters;
