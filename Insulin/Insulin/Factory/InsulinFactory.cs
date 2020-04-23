using System;

namespace Insulin.Factory
{
    public static class InsulinFactory
    {

        public static float CarbohydrateCoverage(float CHOMealGrams, int CHORatio)
        {
            if (CHOMealGrams == 0 || CHORatio == 0)
                return 0;//error

            //CHO = Carbohydrate
            float units = CHOMealGrams / CHORatio;

            //returns the units of rapid acting insulin to cover the carbohydrate.
            return units;
        }

        public static float CalculateHighBloodSugarCorrection(float sugarCorrectionFactor, float currentBloodSugar, float bloodSugarTarget)
        {
            float bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

            if (sugarCorrectionFactor == 0 || bloodSugarDifference == 0)
                return 0;//error

            float correctionDose = bloodSugarDifference / sugarCorrectionFactor;

            //returns the units of rapid acting insulin
            return correctionDose;
        }

        public static float CalculateTotalMealtimeDose(float carbohydrateCoverageDose,float highBloodSugarCorrectionDose)
        {
            if (carbohydrateCoverageDose == 0 || highBloodSugarCorrectionDose == 0)
                return 0;//error

            float totalMealDose = carbohydrateCoverageDose + highBloodSugarCorrectionDose;
            return totalMealDose;
        }

        public static float CalculateDailyInsulinDoseRequirement(float TotalKilogramWeight,float BasalBackgroundPercentage = 100f)
        {
            if (TotalKilogramWeight == 0 || BasalBackgroundPercentage == 0)
                return 0;//error

            float dailyInsulinRequirement = ((0.55f * TotalKilogramWeight) * BasalBackgroundPercentage)/100;

            return dailyInsulinRequirement;
        }

        public static int CalculateCarbohydateRatio(float dailyInsulinDose)
        {
            //This can be calculated using the Rule of “500”: Carbohydrate Bolus Calculation

            if (dailyInsulinDose == 0)
                return 0;//error

            int carbohydateCoverageRatio = (int)(500 / dailyInsulinDose);     
            
            //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
            return carbohydateCoverageRatio;
        }

        public static float CalculateHighBloodSugarCorrectionFactor(float dailyInsulinDose)
        {
            //This can be calculated using the Rule of “1800”.

            if (dailyInsulinDose == 0)
                return 0;//error

            float correctionFactor = 1800 / dailyInsulinDose;

            //returns the correctionFactor that will reduce the blood sugar level
            return correctionFactor;

        }

        public static float CalculateTargetBloodSugarDifference(float currentBloodSugar, float bloodSugarTarget)
        {
            if (currentBloodSugar == 0 || bloodSugarTarget == 0)
                return 0;//error

            float bloodSugarDifference = currentBloodSugar - bloodSugarTarget;
            return bloodSugarDifference;
        }

    }
}
