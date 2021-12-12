const getYieldForPlant = (vegetable) => {
    return vegetable.yield
}

const getYieldForCrop = (input) => {
    return input.numCrops * input.crop.yield
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop
}