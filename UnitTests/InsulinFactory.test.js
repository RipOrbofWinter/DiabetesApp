const {
    CarbohydrateCoverage,
    CalculateHighBloodSugarCorrection,
    CalculateTotalMealtimeDose,
    CalculateDailyInsulinDoseRequirement,
    CalculateCarbohydateRatio,
    CalculateHighBloodSugarCorrectionFactor,
    CalculateTargetBloodSugarDifference
} = require('../Factory/InsulinFactory');

test("CarbohydrateCoverage_CorrectResult", () => {
    //arrange  
    var CHOMeal = 60;
    var UserTotalDailyInsulineDose = 50;

    //act
    var CHOInsulinDose = CarbohydrateCoverage(CHOMeal, UserTotalDailyInsulineDose);

    //assert
    expect(CHOInsulinDose).toBe(6);

});

test("CarbohydrateCoverage_NullInput", () => {
    //arrange  
    var CHOMeal = 60;
    var CHORatio = 10;

    //assert
    expect(() => {
        CarbohydrateCoverage(CHOMeal, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CarbohydrateCoverage(CHOMeal, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CarbohydrateCoverage(CHOMeal, 0);
    }).toThrowError(TypeError);

});

test("HighBloodSugarCorrection_CorrectResult", () => {
    //arrange  
    var UserTotalDailyInsulineDose = 50;
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var correctionDose = CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget);

    //assert
    expect(correctionDose).toBe(2);

});

test("HighBloodSugarCorrection_NullInput", () => {
    //arrange 
    var UserTotalDailyInsulineDose = 40;
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //assert
    expect(() => {
        CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, 0, bloodSugarTarget);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateHighBloodSugarCorrection(0, currentBloodSugar, bloodSugarTarget);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateHighBloodSugarCorrection(0, 0, 0);
    }).toThrowError(TypeError);

});

test("CalculateTargetBloodSugarDifference_CorrectResult", () => {
    //arrange 
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);
    
    //assert
    expect(bloodSugarDifference).toBe(100);
});

test("CalculateTargetBloodSugarDifference_NullInput", () => {
    //arrange 
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //assert 
    expect(() => {
        CalculateTargetBloodSugarDifference(0, bloodSugarTarget);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateTargetBloodSugarDifference(currentBloodSugar, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateTargetBloodSugarDifference(0, 0);
    }).toThrowError(TypeError);
});

test("TotalMealtimeDose_CorrectResult", () => {
    //arrange 
    var CHOMeal = 60;
    var UserTotalDailyInsulineDose = 50;
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var totalMealtimeDose = CalculateTotalMealtimeDose(CHOMeal,UserTotalDailyInsulineDose,currentBloodSugar, bloodSugarTarget);

    //assert 
    expect(totalMealtimeDose).toBe(8);
});

test("TotalMealtimeDose_NullInput", () => {

    //arrange 
    var carbohydrateCoverageDose = 6;
    var highBloodSugarCorrectionDose = 2;

    //assert 
    expect(() => {
        CalculateTotalMealtimeDose(0, highBloodSugarCorrectionDose);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateTotalMealtimeDose(carbohydrateCoverageDose, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateTotalMealtimeDose(0, 0);
    }).toThrowError(TypeError);
});
test("DailyInsulinDoseRequirement_CorrectResult", () => {

    //arrange 
    var TotalKilogramWeight = 70; //70 kg
    var BasalBackgroundPercentage = 50;

    //act 
    var insulinDoseRequirement1 = CalculateDailyInsulinDoseRequirement(TotalKilogramWeight);
    var insulinDoseRequirement2 = CalculateDailyInsulinDoseRequirement(TotalKilogramWeight, BasalBackgroundPercentage);

    //assert 
    expect(insulinDoseRequirement1).toBe(38.5);
    expect(insulinDoseRequirement2).toBe(19.25);
});

test("DailyInsulinDoseRequirement_NullInput", () => {

    //arrange 
    var TotalKilogramWeight = 70; //70 kg
    var BasalBackgroundPercentage = 50;

    //assert  
    expect(() => {
        CalculateDailyInsulinDoseRequirement(TotalKilogramWeight, 0);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateDailyInsulinDoseRequirement(0, BasalBackgroundPercentage);
    }).toThrowError(TypeError);
    expect(() => {
        CalculateDailyInsulinDoseRequirement(0, 0);
    }).toThrowError(TypeError);
});

test("CarbohydrateRatio_CorrectResult", () => {
    //arrange 
    var dailyInsulinDose = 40;

    //act 
    var carbohydateCoverageRatio = CalculateCarbohydateRatio(dailyInsulinDose);

    //assert 
    expect(carbohydateCoverageRatio).toBe(12);
});

test("CarbohydrateRatio_NullInput", () => {
    //assert 
    expect(() => {
        CalculateCarbohydateRatio(0);
    }).toThrowError(TypeError);
});

test("HighBloodSugarCorrectionFactor_CorrectResult", () => {
    //arrange 
    var dailyInsulinDose = 40;

    //act 
    var correctionFacto = CalculateHighBloodSugarCorrectionFactor(dailyInsulinDose);

    //assert 
    expect(correctionFacto).toBe(45);
});

test("HighBloodSugarCorrectionFactor_NullInput", () => {
    //assert 
    expect(() => {
        CalculateHighBloodSugarCorrectionFactor(0);
    }).toThrowError(TypeError);
});

