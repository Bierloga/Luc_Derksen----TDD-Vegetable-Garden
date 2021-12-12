const getYieldForPlant = (vegetable) => {
    return vegetable.yield
}

const getYieldForCrop = (input) => {
    return input.numCrops * input.crop.yield
}

const getTotalYield = (item) => {
    const newArray = item.crops.map(plant => { return plant.crop.yield * plant.numCrops })
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return newArray.reduce(reducer)
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
}