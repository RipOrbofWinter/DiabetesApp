        // Formule 1: Bereken hoeveel eenheden insuline je nodig hebt per gegeten koolhydraten.
        function CarbohydrateCoverage( CHOMealGrams, UserTotalDailyInsulineDose)
        {
            if (CHOMealGrams == 0 || UserTotalDailyInsulineDose == 0)
                return 0;//error

            //CHO = Carbohydrate
            var units = CHOMealGrams / CalculateCarbohydateRatio(UserTotalDailyInsulineDose);

            //returns the units of rapid acting insulin to cover the carbohydrate.
            return units;
        }

            // Formule 1b: Bereken wat je CHORatio is. 
            function CalculateCarbohydateRatio(UserTotalDailyInsulineDose)
            {
                //This can be calculated using the Rule of �500�: Carbohydrate Bolus Calculation

                if (dailyInsulinDose == 0)
                    return 0;//error

                var carbohydateCoverageRatio = math.floor((500 / UserTotalDailyInsulineDose));     
                
                //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
                return carbohydateCoverageRatio;
            }

        // Formule 2: Hoge bloedsuiker correctie berekenen
        function CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget)
        {
            var bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

            if (sugarCorrectionFactor == 0 || bloodSugarDifference == 0)
                return 0;//error

            var correctionDose = bloodSugarDifference / CalculateHighBloodSugarCorrectionFactor(UserTotalDailyInsulineDose);

            //returns the units of rapid acting insulin
            return correctionDose;
        }
            // Formule 2b: Bloedsuiker verschill tussen doel en werkelijk berekenen.
            function CalculateTargetBloodSugarDifference(currentBloodSugar , bloodSugarTarget)
            {
                if (currentBloodSugar == 0 || bloodSugarTarget == 0)
                    return 0;//error

                var bloodSugarDifference = currentBloodSugar - bloodSugarTarget;
                
                return bloodSugarDifference;
            }

            // Formule 2c: Correctie factor berekenen.
            function CalculateHighBloodSugarCorrectionFactor(UserTotalDailyInsulineDose)
            {
                //This can be calculated using the Rule of �1800�.
    
                if (UserTotalDailyInsulineDose == 0)
                    return 0;//error
    
                var correctionFactor = 1800 / UserTotalDailyInsulineDose;
    
                //returns the correctionFactor that will reduce the blood sugar level
                return correctionFactor;
            }

        //Formule 3: Totale hoeveelheid insuline berekenen Door formule 1 en 2 te combineren.
        function CalculateTotalMealtimeDose(CHOMealGrams, UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget)
        {
            var totalMealDose = CarbohydrateCoverage(CHOMealGrams, UserTotalDailyInsulineDose) + CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget);
            return totalMealDose;
        }

         // Formule 4: Bereken wat je TDI(totale dagelijkse insuline dosering). 
         function  CalculateDailyInsulinDoseRequirement(UserTotalKilogramWeight, BasalBackgroundPercentage = 100)
        {
            if (UserTotalKilogramWeight == 0 || BasalBackgroundPercentage == 0)
                return 0;//error
            
            var UserTotalDailyInsulineDose = ((0.55 * UserTotalKilogramWeight) * BasalBackgroundPercentage)/100;
            
            return UserTotalDailyInsulineDose;
        }

        module.exports = {
            CalculateDailyInsulinDoseRequirement
          }