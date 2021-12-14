const sunFactor = (input, environmentFactors) => {
    if (typeof environmentFactors !== 'undefined') {
        switch (environmentFactors.sun) {
            case 'low':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.sun.low + 100) / 100)
                } else { return ((input.crop.factor.sun.low + 100) / 100) }
                break
            case 'medium':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.sun.medium + 100) / 100)
                } else { return ((input.crop.factor.sun.medium + 100) / 100) }
                break
            case 'high':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.sun.high + 100) / 100)
                } else { return ((input.crop.factor.sun.high + 100) / 100) }
                break
            default:
                return 1;
                break;
        }
    } else { return 1 }
}

const windFactor = (input, environmentFactors) => {
    if (typeof environmentFactors !== 'undefined') {
        switch (environmentFactors.wind) {
            case 'low':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.wind.low + 100) / 100)
                } else { return ((input.crop.factor.wind.low + 100) / 100) }
                break
            case 'medium':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.wind.medium + 100) / 100)
                } else { return ((input.crop.factor.wind.medium + 100) / 100) }
                break
            case 'high':
                if (typeof input.factor !== 'undefined') {
                    return ((input.factor.wind.high + 100) / 100)
                } else { return ((input.crop.factor.wind.high + 100) / 100) }
                break
            default:
                return 1;
                break;
        }
    } else { return 1 }
}

const getYieldForPlant = (input, environmentFactors) => {
    return input.yield * (sunFactor(input, environmentFactors)) * (windFactor(input, environmentFactors))
}

const getYieldForCrop = (input, environmentFactors) => {
    return input.numCrops * input.crop.yield * (sunFactor(input, environmentFactors)) * (windFactor(input, environmentFactors))
}

const calcSunFactor = (input, environmentFactors) => {
    console.log("sun is")
    console.log(input)
    if (typeof environmentFactors !== 'undefined') {
        switch (environmentFactors.sun) {
            case 'low':
                return ((input.sun.low + 100) / 100)
                break
            case 'medium':
                return ((input.sun.medium + 100) / 100)
                break
            case 'high':
                return ((input.sun.high + 100) / 100)
                break
            default:
                return 1
        }
    } else { return 1 }
}

const calcWindFactor = (input, environmentFactors) => {
    if (typeof environmentFactors !== 'undefined') {
        switch (environmentFactors.wind) {
            case 'low':
                return ((input.wind.low + 100) / 100);
                break
            case 'medium':
                return ((input.wind.medium + 100) / 100);
                break
            case 'high':
                return ((input.wind.high + 100) / 100);
                break
            default:
                return 1
        }
    } else { return 1 }
}

const getTotalYield = (input, environmentFactors) => {
    const newArray = [];
    const arrLength = input.crops.length
    for (let i = 0; i < arrLength; i++) {
        const plantYield = (input.crops[i].crop.yield * input.crops[i].numCrops)
        const value = plantYield * (calcSunFactor(input.crops[i].crop.factor, environmentFactors)) * (calcWindFactor(input.crops[i].crop.factor, environmentFactors))
        newArray.push(value)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return newArray.reduce(reducer)
}

const getCostsForCrop = (input) => {
    return (input.numCrops * input.crop.costPerPlant)
}

const getRevenueForCrop = (input, environmentFactors) => {
    return (input.numCrops * input.crop.price * (sunFactor(input, environmentFactors)) * (windFactor(input, environmentFactors)))
}

const getProfitForCrop = (input, environmentFactors) => {
    return (input.numCrops * ((input.crop.price * input.crop.yield) - input.crop.costPerPlant)) * (sunFactor(input, environmentFactors)) * (windFactor(input, environmentFactors))
}

const getTotalProfit = (input, environmentFactors) => {
    const newArray = [];
    const arrLength = input.crops.length
    for (let i = 0; i < arrLength; i++) {
        const plantYield = (input.crops[i].crop.yield * input.crops[i].numCrops)
        const plantRevenue = (plantYield * input.crops[i].crop.price)
        const plantRevenueWithFactors = plantRevenue * (calcSunFactor(input.crops[i].crop.factor, environmentFactors)) * (calcWindFactor(input.crops[i].crop.factor, environmentFactors))
        const plantCost = (input.crops[i].crop.costPerPlant * input.crops[i].numCrops)
        const plantProfit = plantRevenueWithFactors - plantCost
        newArray.push(plantProfit)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return newArray.reduce(reducer)
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
}