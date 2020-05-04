    class InsulinFactory
    {
        // Formule 1: Bereken hoeveel eenheden insuline je nodig hebt per gegeten koolhydraten.
        static CarbohydrateCoverage( CHOMealGrams, CHORatio)
        {
            if (CHOMealGrams == 0 || CHORatio == 0)
                return 0;//error

            //CHO = Carbohydrate
            var units = CHOMealGrams / CHORatio;

            //returns the units of rapid acting insulin to cover the carbohydrate.
            return units;
        }

            // Formule 1b: Bereken wat je CHORatio is. 
            static CalculateCarbohydateRatio(dailyInsulinDose)
            {
                //This can be calculated using the Rule of �500�: Carbohydrate Bolus Calculation

                if (dailyInsulinDose == 0)
                    return 0;//error

                var carbohydateCoverageRatio = math.floor((500 / dailyInsulinDose));     
                
                //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
                return carbohydateCoverageRatio;
            }

            // Formule 1c/2d: Bereken wat je TDI(totale dagelijkse insuline dosering). 
            static  CalculateDailyInsulinDoseRequirement( TotalKilogramWeight, BasalBackgroundPercentage = 100)
            {
                if (TotalKilogramWeight == 0 || BasalBackgroundPercentage == 0)
                    return 0;//error

                var dailyInsulinRequirement = ((0.55 * TotalKilogramWeight) * BasalBackgroundPercentage)/100;

                return dailyInsulinRequirement;
            }

        // Formule 2: Hoge bloedsuiker correctie berekenen
        static CalculateHighBloodSugarCorrection( sugarCorrectionFactor, currentBloodSugar, bloodSugarTarget)
        {
            var bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

            if (sugarCorrectionFactor == 0 || bloodSugarDifference == 0)
                return 0;//error

            var correctionDose = bloodSugarDifference / sugarCorrectionFactor;

            //returns the units of rapid acting insulin
            return correctionDose;
        }
            // Formule 2b: Bloedsuiker verschill tussen doel en werkelijk berekenen.
            static CalculateTargetBloodSugarDifference( currentBloodSugar , bloodSugarTarget)
            {
                if (currentBloodSugar == 0 || bloodSugarTarget == 0)
                    return 0;//error

                var bloodSugarDifference = currentBloodSugar - bloodSugarTarget;
                return bloodSugarDifference;
            }

            // Formule 2c: Correctie factor berekenen.
            static CalculateHighBloodSugarCorrectionFactor(dailyInsulinDose)
            {
                //This can be calculated using the Rule of �1800�.
    
                if (dailyInsulinDose == 0)
                    return 0;//error
    
                var correctionFactor = 1800 / dailyInsulinDose;
    
                //returns the correctionFactor that will reduce the blood sugar level
                return correctionFactor;
            }

        //Formule 3: Totale hoeveelheid insuline berekenen Door formule 1 en 2 te combineren.
        static CalculateTotalMealtimeDose(carbohydrateCoverageDose,highBloodSugarCorrectionDose)
        {
            if (carbohydrateCoverageDose == 0 || highBloodSugarCorrectionDose == 0)
                return 0;//error

            var totalMealDose = CarbohydrateCoverage() + formule2;
            return totalMealDose;
        }
    }
