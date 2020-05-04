const {
     CarbohydrateCoverage,
     CalculateHighBloodSugarCorrection,
     CalculateTotalMealtimeDose,
     CalculateDailyInsulinDoseRequirement,
     CalculateCarbohydateRatio,
     CalculateHighBloodSugarCorrectionFactor,
     CalculateTargetBloodSugarDifference
     } = require('../Factory/InsulinFactory');

test("CarbohydrateCoverage_CorrectResult", ()=>{
            //arrange  
            var CHOMeal = 60;
            var CHORatio = 10;

            //act
            var CHOInsulinDose = CarbohydrateCoverage(CHOMeal, CHORatio);

            //assert
            expect(CHOInsulinDose).toBe(6);
});

test("CarbohydrateCoverage_NullInput", ()=>{
    //arrange  
    var CHOMeal = 60;
    var CHORatio = 10;

    //act 
    var CHOInsulinDose_1 = CarbohydrateCoverage(CHOMeal, 0);
    var CHOInsulinDose_2 = CarbohydrateCoverage(0, CHORatio);
    var CHOInsulinDose_3 = CarbohydrateCoverage(0, 0);

    //assert
    expect(CHOInsulinDose_1).toBe(0);
    expect(CHOInsulinDose_2).toBe(0);
    expect(CHOInsulinDose_3).toBe(0);

});

test("HighBloodSugarCorrection_CorrectResult", ()=>{
    //arrange  
    var sugarCorrectionFactor = 50;
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var correctionDose = CalculateHighBloodSugarCorrection(sugarCorrectionFactor,currentBloodSugar,bloodSugarTarget);

    //assert
    expect(correctionDose).toBe(2);
    
});

test("HighBloodSugarCorrection_NullInput", ()=>{
            //arrange 
            var sugarCorrectionFactor = 50;
            var currentBloodSugar = 220;
            var bloodSugarTarget = 120;

            //act 
            var correctionDose1 = CalculateHighBloodSugarCorrection(0, currentBloodSugar, bloodSugarTarget);
            var correctionDose2 = CalculateHighBloodSugarCorrection(sugarCorrectionFactor, 0, bloodSugarTarget);
            var correctionDose3 = CalculateHighBloodSugarCorrection(sugarCorrectionFactor, currentBloodSugar, 0);
            var correctionDose4 = CalculateHighBloodSugarCorrection(0, 0, 0);

            //assert
            expect(correctionDose1).toBe(0);
            expect(correctionDose2).toBe(0);
            expect(correctionDose3).toBe(0);
            expect(correctionDose4).toBe(0);
});

test("CalculateTargetBloodSugarDifference_CorrectResult", ()=>{
    //arrange 
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

    expect(bloodSugarDifference).toBe(100);
});

test("CalculateTargetBloodSugarDifference_NullInput", ()=>{
    //arrange 
    var currentBloodSugar = 220;
    var bloodSugarTarget = 120;

    //act 
    var bloodSugarDifference1 = CalculateTargetBloodSugarDifference(0, bloodSugarTarget);
    var bloodSugarDifference2 = CalculateTargetBloodSugarDifference(currentBloodSugar, 0);
    var bloodSugarDifference3 = CalculateTargetBloodSugarDifference(0, 0);
    //act 

    expect(bloodSugarDifference1).toBe(0);
    expect(bloodSugarDifference2).toBe(0);
    expect(bloodSugarDifference3).toBe(0);
});

test("TotalMealtimeDose_CorrectResult", ()=>{
    //arrange 
    var carbohydrateCoverageDose = 6;
    var highBloodSugarCorrectionDose = 2;

    //act 
    var totalMealtimeDose = CalculateTotalMealtimeDose(carbohydrateCoverageDose, highBloodSugarCorrectionDose);

    //act 
    expect(totalMealtimeDose).toBe(8);
});

test("TotalMealtimeDose_NullInput", ()=>{

    //arrange 
    var carbohydrateCoverageDose = 6;
    var highBloodSugarCorrectionDose = 2;

    //act 
    var totalMealtimeDose1 = CalculateTotalMealtimeDose(0, highBloodSugarCorrectionDose);
    var totalMealtimeDose2 = CalculateTotalMealtimeDose(carbohydrateCoverageDose, 0);
    var totalMealtimeDose3 = CalculateTotalMealtimeDose(0, 0);

    //act 
    expect(totalMealtimeDose1).toBe(0);
    expect(totalMealtimeDose2).toBe(0);
    expect(totalMealtimeDose3).toBe(0);
});
test("DailyInsulinDoseRequirement_CorrectResult", ()=>{

    //arrange 
    var TotalKilogramWeight = 70; //70 kg
    var BasalBackgroundPercentage = 50;

    //act 
    var insulinDoseRequirement1 = CalculateDailyInsulinDoseRequirement(TotalKilogramWeight);
    var insulinDoseRequirement2 = CalculateDailyInsulinDoseRequirement(TotalKilogramWeight, BasalBackgroundPercentage);

    //act 
    expect(insulinDoseRequirement1).toBe(38.5);
    expect(insulinDoseRequirement2).toBe(19.25);
});

test("DailyInsulinDoseRequirement_NullInput", ()=>{

    //arrange 
    var TotalKilogramWeight = 70; //70 kg
    var BasalBackgroundPercentage = 50;

            //act 
    var insulinDoseRequirement1 = CalculateDailyInsulinDoseRequirement(TotalKilogramWeight,0);
    var insulinDoseRequirement2 = CalculateDailyInsulinDoseRequirement(0, BasalBackgroundPercentage);
    var insulinDoseRequirement3 = CalculateDailyInsulinDoseRequirement(0, 0);

    //act  
    expect(insulinDoseRequirement1).toBe(0);
    expect(insulinDoseRequirement2).toBe(0);
    expect(insulinDoseRequirement3).toBe(0);
});

test("CarbohydrateRatio_CorrectResult", ()=>{
    //arrange 
    var dailyInsulinDose = 40;

    //act 
    var carbohydateCoverageRatio = CalculateCarbohydateRatio(dailyInsulinDose);

     //act 
    expect(carbohydateCoverageRatio).toBe(12);
});

test("CarbohydrateRatio_NullInput", ()=>{
    //act 
    var carbohydateCoverageRatio = CalculateCarbohydateRatio(0);

    //act 
    expect(carbohydateCoverageRatio).toBe(0);
});

test("HighBloodSugarCorrectionFactor_CorrectResult", ()=>{
    //arrange 
    var dailyInsulinDose =40;
     
    //act 
    var correctionFacto = CalculateHighBloodSugarCorrectionFactor(dailyInsulinDose);

    //act 
    expect(correctionFacto).toBe(45);
});

test("HighBloodSugarCorrectionFactor_NullInput", ()=>{
    //act
    var correctionFacto = CalculateHighBloodSugarCorrectionFactor(0);

    //act 
    expect(correctionFacto).toBe(0);
});

