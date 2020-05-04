
        exports.CarbohydrateCoverage = (CHOMealGrams, CHORatio) =>
        {       
            if (CHOMealGrams == 0 || CHORatio == 0)
                return 0;//error

            //CHO = Carbohydrate
            var units = CHOMealGrams / CHORatio;

            //returns the units of rapid acting insulin to cover the carbohydrate.
            return units;
        };
        
        exports.CalculateHighBloodSugarCorrection = ( sugarCorrectionFactor, currentBloodSugar, bloodSugarTarget) =>
        {
            var bloodSugarDifference = exports.CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

            if (sugarCorrectionFactor == 0 || bloodSugarDifference == 0)
                return 0;//error

            var correctionDose = bloodSugarDifference / sugarCorrectionFactor;

            //returns the units of rapid acting insulin
            return correctionDose;
        };

        exports.CalculateTotalMealtimeDose = (carbohydrateCoverageDose,highBloodSugarCorrectionDose) =>
        {
            if (carbohydrateCoverageDose == 0 || highBloodSugarCorrectionDose == 0)
                return 0;//error

            var totalMealDose = carbohydrateCoverageDose + highBloodSugarCorrectionDose;
            return totalMealDose;
        };

        exports.CalculateDailyInsulinDoseRequirement = ( TotalKilogramWeight, BasalBackgroundPercentage = 100) =>
        {
            if (TotalKilogramWeight == 0 || BasalBackgroundPercentage == 0)
                return 0;//error

            var dailyInsulinRequirement = ((0.55 * TotalKilogramWeight) * BasalBackgroundPercentage)/100;

            return dailyInsulinRequirement;
        };

        exports.CalculateCarbohydateRatio =(dailyInsulinDose) => 
        {
            //This can be calculated using the Rule of �500�: Carbohydrate Bolus Calculation

            if (dailyInsulinDose == 0)
                return 0;//error

            var carbohydateCoverageRatio =(500 / dailyInsulinDose);     

            var RoundedRatio = Math.floor(carbohydateCoverageRatio);
            
            //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
            return RoundedRatio;
        };

        exports.CalculateHighBloodSugarCorrectionFactor =(dailyInsulinDose) =>
        {
            //This can be calculated using the Rule of �1800�.

            if (dailyInsulinDose == 0)
                return 0;//error

            var correctionFactor = 1800 / dailyInsulinDose;

            //returns the correctionFactor that will reduce the blood sugar level
            return correctionFactor;

        };

        exports.CalculateTargetBloodSugarDifference = ( currentBloodSugar , bloodSugarTarget) =>
        {
            if (currentBloodSugar == 0 || bloodSugarTarget == 0)
                return 0;//error

            var bloodSugarDifference = currentBloodSugar - bloodSugarTarget;
            return bloodSugarDifference;
        }

    
