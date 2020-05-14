
// Formule 1: Bereken hoeveel eenheden insuline je nodig hebt per gegeten koolhydraten.
exports.CarbohydrateCoverage = (CHOMealGrams, UserTotalDailyInsulineDose) => {
    if (UserTotalDailyInsulineDose == 0)
        throw new SyntaxError("UserTotalDailyInsulineDose was equal to 0");

    if (CHOMealGrams == 0)
        throw new SyntaxError("CHOMealGrams was equal to 0");

    //CHO = Carbohydrate
    var units = CHOMealGrams / exports.CalculateCarbohydateRatio(UserTotalDailyInsulineDose);

    //returns the units of rapid acting insulin to cover the carbohydrate.
    return units;
}

// Formule 1b: Bereken wat je CHORatio is. 
exports.CalculateCarbohydateRatio = (UserTotalDailyInsulineDose) => {
    //This can be calculated using the Rule of �500�: Carbohydrate Bolus Calculation

    if (UserTotalDailyInsulineDose == 0)
        throw new SyntaxError("UserTotalDailyInsulineDose was equal to 0");

    var carbohydateCoverageRatio = Math.floor((500 / UserTotalDailyInsulineDose));

    //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
    return carbohydateCoverageRatio;
}

// Formule 2: Hoge bloedsuiker correctie berekenen
exports.CalculateHighBloodSugarCorrection = (UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget) => {
    var bloodSugarDifference = exports.CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

    if (UserTotalDailyInsulineDose == 0)
        throw new SyntaxError("UserTotalDailyInsulineDose was equal to 0");

    if (bloodSugarDifference == 0)
        throw new SyntaxError("BloodSugarDifference was equal to 0");

    var correctionDose = Math.floor(bloodSugarDifference / exports.CalculateHighBloodSugarCorrectionFactor(UserTotalDailyInsulineDose));

    //returns the units of rapid acting insulin
    return correctionDose;
}
// Formule 2b: Bloedsuiker verschill tussen doel en werkelijk berekenen.
exports.CalculateTargetBloodSugarDifference = (currentBloodSugar, bloodSugarTarget) => {
    if (currentBloodSugar == 0)
        throw new SyntaxError("currentBloodSugar was equal to 0");

    if (bloodSugarTarget == 0)
        throw new SyntaxError("bloodSugarTarget was equal to 0");


    var bloodSugarDifference = currentBloodSugar - bloodSugarTarget;

    return bloodSugarDifference;
}

// Formule 2c: Correctie factor berekenen.
exports.CalculateHighBloodSugarCorrectionFactor = (UserTotalDailyInsulineDose) => {
    //This can be calculated using the Rule of �1800�.

    if (UserTotalDailyInsulineDose == 0)
        throw new SyntaxError("UserTotalDailyInsulineDose was equal to 0");

    var correctionFactor = 1800 / UserTotalDailyInsulineDose;

    //returns the correctionFactor that will reduce the blood sugar level
    return correctionFactor;
}

//Formule 3: Totale hoeveelheid insuline berekenen Door formule 1 en 2 te combineren.
exports.CalculateTotalMealtimeDose = (CHOMealGrams, UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget) => {
    var totalMealDose = exports.CarbohydrateCoverage(CHOMealGrams, UserTotalDailyInsulineDose)
        + exports.CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget);

    return totalMealDose;
}

// Formule 4: Bereken wat je TDI(totale dagelijkse insuline dosering). 
exports.CalculateDailyInsulinDoseRequirement = (UserTotalKilogramWeight, BasalBackgroundPercentage = 100) => {

    if (UserTotalKilogramWeight == 0)
        throw new SyntaxError("UserTotalKilogramWeight was equal to 0");
    if (BasalBackgroundPercentage == 0)
        throw new SyntaxError("BasalBackgroundPercentage was equal to 0");

    var UserTotalDailyInsulineDose = ((0.55 * UserTotalKilogramWeight) * BasalBackgroundPercentage) / 100;

    return UserTotalDailyInsulineDose;
}

