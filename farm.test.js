const { getYieldForPlant, getYieldForCrop, getCostsForCrop, getTotalYield, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
            },
            wind: {
                low: -50,
                medium: 0,
                high: 50,
            }
        },
    };

    const environmentFactors1 = {
        sun: "low",
        wind: "medium",
    };

    const tomatoes = {
        name: "tomatoes",
        yield: 20,
        factor: {
            sun: {
                low: -75,
                medium: -25,
                high: 0,
            },
            wind: {
                low: 50,
                medium: 0,
                high: -75,
            },
        },
    };
    test("Get yield for plant without environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors1)).toBe(15);
        expect(getYieldForPlant(tomatoes, environmentFactors1)).toBe(5);
    })
});

describe("getYieldForCrop", () => {
    const beans = {
        name: "beans",
        yield: 3,
        factor: {
            wind: {
                low: 0,
                medium: -50,
                high: -75,
            }
        }
    };
    const input = {
        crop: beans,
        numCrops: 10,
    };

    const environmentFactors3 = {
        wind: "medium",
    };

    test("Get yield for crop without environmental factors", () => {
        expect(getYieldForCrop(input)).toBe(30);
    });
    test("Get yield for crop with environmental factors", () => {
        expect(getYieldForCrop(input, environmentFactors3)).toBe(15);
    })
});

describe("getTotalYield", () => {
    const cucumbers = {
        name: "cucumbers",
        yield: 8,
        factor: {
            sun: {
                low: -50,
                medium: -25,
                high: 0,
            },
            wind: {
                low: 0,
                medium: 0,
                high: 0,
            }
        }
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        factor: {
            sun: {
                low: 0,
                medium: 0,
                high: 0,
            },
            wind: {
                low: 50,
                medium: 0,
                high: -50,
            }
        }
    };
    const crops = [
        { crop: cucumbers, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors4 = {
        wind: "low",
    }
    test("Calculate total yield with multiple crops without environmental factors", () => {
        expect(getTotalYield({ crops })).toBe(48);
    });

    test("Calculate total yield with multiple crops with environmental factors", () => {
        expect(getTotalYield({ crops }, environmentFactors4)).toBe(52);
    })

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Calculate total costs for crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            costPerPlant: 2,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostsForCrop(input)).toBe(20)
    })
});

describe("getRevenueForCrop", () => {
    const corn = {
        name: "corn",
        yield: 4,
        price: 4,
        factor: {
            sun: {
                low: -25,
                medium: 0,
                high: 25
            },
            wind: {
                low: 50,
                medium: 0,
                high: -50
            }
        }
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    const environmentFactors5 = {
        wind: "low",
        sun: "medium"
    }
    test("Calculate total revenue for crop with environmental factors", () => {
        expect(getRevenueForCrop(input, environmentFactors5)).toBe(60)
    })
    test("Calculate total revenue for crop without environmental factors", () => {
        expect(getRevenueForCrop(input)).toBe(40)
    })
});

describe("getProfitForCrop", () => {
    const corn = {
        name: "corn",
        yield: 3,
        price: 4,
        costPerPlant: 2,
        factor: {
            sun: {
                low: 100,
                medium: 50,
                high: 0
            },
            wind: {
                low: -50,
                medium: 0,
                high: 50
            }
        }
    };
    const input = {
        crop: corn,
        numCrops: 10,
    };
    const environmentFactors6 = {
        wind: "low",
        sun: "high"
    }
    test("Calculate total profit for crop with environmental factors", () => {
        expect(getProfitForCrop(input, environmentFactors6)).toBe(50)
    })
    test("Calculate total profit for crop without environmental factors", () => {
        expect(getProfitForCrop(input)).toBe(100)
    })
});

describe("getTotalProfit", () => {
    const corn = {
        name: "corn",
        yield: 3,
        price: 4,
        costPerPlant: 2,
        factor: {
            sun: {
                low: 0,
                medium: 100,
                high: 200,
            },
            wind: {
                low: 0,
                medium: -50,
                high: -50,
            }
        }
    };
    const pumpkin = {
        name: "pumpkin",
        yield: 4,
        price: 6,
        costPerPlant: 4,
        factor: {
            sun: {
                low: 0,
                medium: 50,
                high: 100
            },
            wind: {
                low: -50,
                medium: -25,
                high: 0
            }
        }
    };

    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors7 = {
        wind: "low",
        sun: "low"
    }

    test("Calculate profit over multiple crops", () => {

        expect(getTotalProfit({ crops })).toBe(90);
    })
    test("Calculate profit over multiple crops with environmental factors", () => {
        expect(getTotalProfit({ crops }, environmentFactors7)).toBe(66)
    })
})