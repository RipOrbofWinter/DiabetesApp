using Insulin.Factory;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTesting.Factory
{
    [TestClass]
    public class InsulinFactoryTests
    {
        [TestMethod]
        public void CarbohydrateCoverage_CorrectResult()
        {
            //arrange  
            float CHOMeal = 60f;
            int CHORatio = 10;

            //act 
            float CHOInsulinDose = InsulinFactory.CarbohydrateCoverage(CHOMeal, CHORatio);

            //assert
            Assert.IsTrue(CHOInsulinDose == 6);
        }

        [TestMethod]
        public void CarbohydrateCoverage_NullInput()
        {
            //arrange  
            float CHOMeal = 60f;
            int CHORatio = 10;

            //act 
            float CHOInsulinDose_1 = InsulinFactory.CarbohydrateCoverage(CHOMeal, 0);
            float CHOInsulinDose_2 = InsulinFactory.CarbohydrateCoverage(0, CHORatio);
            float CHOInsulinDose_3 = InsulinFactory.CarbohydrateCoverage(0, 0);

            //assert
            Assert.IsTrue(CHOInsulinDose_1 == 0);
            Assert.IsTrue(CHOInsulinDose_2 == 0);
            Assert.IsTrue(CHOInsulinDose_3 == 0);
        }

        [TestMethod]
        public void HighBloodSugarCorrection_CorrectResult()
        {
            //arrange  
            float sugarCorrectionFactor = 50;
            float currentBloodSugar = 220;
            float bloodSugarTarget = 120;

            //act 
            float correctionDose = InsulinFactory.CalculateHighBloodSugarCorrection(sugarCorrectionFactor,currentBloodSugar,bloodSugarTarget);

            //assert
            Assert.IsTrue(correctionDose == 2);
        }

        [TestMethod]
        public void HighBloodSugarCorrection_NullInput()
        {
            //arrange 
            float sugarCorrectionFactor = 50;
            float currentBloodSugar = 220;
            float bloodSugarTarget = 120;

            //act 
            float correctionDose1 = InsulinFactory.CalculateHighBloodSugarCorrection(0, currentBloodSugar, bloodSugarTarget);
            float correctionDose2 = InsulinFactory.CalculateHighBloodSugarCorrection(sugarCorrectionFactor, 0, bloodSugarTarget);
            float correctionDose3 = InsulinFactory.CalculateHighBloodSugarCorrection(sugarCorrectionFactor, currentBloodSugar, 0);
            float correctionDose4 = InsulinFactory.CalculateHighBloodSugarCorrection(0, 0, 0);

            //assert
            Assert.IsTrue(correctionDose1 == 0);
            Assert.IsTrue(correctionDose2 == 0);
            Assert.IsTrue(correctionDose3 == 0);
            Assert.IsTrue(correctionDose4 == 0);
        }

        [TestMethod]
        public void CalculateTargetBloodSugarDifference_CorrectResult()
        {
            //arrange 
            float currentBloodSugar = 220;
            float bloodSugarTarget = 120;

            //act 
            float bloodSugarDifference = InsulinFactory.CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

            //act 
            Assert.IsTrue(bloodSugarDifference == 100);
        }

        [TestMethod]
        public void CalculateTargetBloodSugarDifference_NullInput()
        {
            //arrange 
            float currentBloodSugar = 220;
            float bloodSugarTarget = 120;

            //act 
            float bloodSugarDifference1 = InsulinFactory.CalculateTargetBloodSugarDifference(0, bloodSugarTarget);
            float bloodSugarDifference2 = InsulinFactory.CalculateTargetBloodSugarDifference(currentBloodSugar, 0);
            float bloodSugarDifference3 = InsulinFactory.CalculateTargetBloodSugarDifference(0, 0);
            //act 
            Assert.IsTrue(bloodSugarDifference1 == 0);
            Assert.IsTrue(bloodSugarDifference2 == 0);
            Assert.IsTrue(bloodSugarDifference3 == 0);
        }

        [TestMethod]
        public void TotalMealtimeDose_CorrectResult()
        {
            //arrange 
            float carbohydrateCoverageDose = 6;
            float highBloodSugarCorrectionDose = 2;

            //act 
            float totalMealtimeDose = InsulinFactory.CalculateTotalMealtimeDose(carbohydrateCoverageDose, highBloodSugarCorrectionDose);

            //act 
            Assert.IsTrue(totalMealtimeDose == 8);
        }

        [TestMethod]
        public void TotalMealtimeDose_NullInput()
        {
            //arrange 
            float carbohydrateCoverageDose = 6;
            float highBloodSugarCorrectionDose = 2;

            //act 
            float totalMealtimeDose1 = InsulinFactory.CalculateTotalMealtimeDose(0, highBloodSugarCorrectionDose);
            float totalMealtimeDose2 = InsulinFactory.CalculateTotalMealtimeDose(carbohydrateCoverageDose, 0);
            float totalMealtimeDose3 = InsulinFactory.CalculateTotalMealtimeDose(0, 0);

            //act 
            Assert.IsTrue(totalMealtimeDose1 == 0);
            Assert.IsTrue(totalMealtimeDose2 == 0);
            Assert.IsTrue(totalMealtimeDose3 == 0);
        }

        [TestMethod]
        public void DailyInsulinDoseRequirement_CorrectResult()
        {
            //arrange 
            float TotalKilogramWeight = 70; //70 kg
            float BasalBackgroundPercentage = 50f;

            //act 
            float insulinDoseRequirement1 = InsulinFactory.CalculateDailyInsulinDoseRequirement(TotalKilogramWeight);
            float insulinDoseRequirement2 = InsulinFactory.CalculateDailyInsulinDoseRequirement(TotalKilogramWeight, BasalBackgroundPercentage);

            //act 
            Assert.IsTrue(insulinDoseRequirement1 == 38.5f);
            Assert.IsTrue(insulinDoseRequirement2 == 19.25);
        }

        [TestMethod]
        public void DailyInsulinDoseRequirement_NullInput()
        {
            //arrange 
            float TotalKilogramWeight = 70; //70 kg
            float BasalBackgroundPercentage = 50f;

            //act 
            float insulinDoseRequirement1 = InsulinFactory.CalculateDailyInsulinDoseRequirement(TotalKilogramWeight,0);
            float insulinDoseRequirement2 = InsulinFactory.CalculateDailyInsulinDoseRequirement(0, BasalBackgroundPercentage);
            float insulinDoseRequirement3 = InsulinFactory.CalculateDailyInsulinDoseRequirement(0, 0);

            //act 
            Assert.IsTrue(insulinDoseRequirement1 == 0);
            Assert.IsTrue(insulinDoseRequirement2 == 0);
            Assert.IsTrue(insulinDoseRequirement3 == 0);
        }

        [TestMethod]
        public void CarbohydrateRatio_CorrectResult()
        {
            //arrange 
            float dailyInsulinDose = 40;

            //act 
            int carbohydateCoverageRatio = InsulinFactory.CalculateCarbohydateRatio(dailyInsulinDose);

            //act 
            Assert.IsTrue(carbohydateCoverageRatio == 12);
        }

        [TestMethod]
        public void CarbohydrateRatio_NullInput()
        {
            //act 
            float carbohydateCoverageRatio = InsulinFactory.CalculateCarbohydateRatio(0);

            //act 
            Assert.IsTrue(carbohydateCoverageRatio == 0);
        }

        [TestMethod]
        public void HighBloodSugarCorrectionFactor_CorrectResult()
        {
            //arrange 
            float dailyInsulinDose =40;
            //act 
            float correctionFacto = InsulinFactory.CalculateHighBloodSugarCorrectionFactor(dailyInsulinDose);

            //act 
            Assert.IsTrue(correctionFacto == 45);
        }

        [TestMethod]
        public void HighBloodSugarCorrectionFactor_NullInput()
        {
            //act
            float correctionFacto = InsulinFactory.CalculateHighBloodSugarCorrectionFactor(0);

            //act 
            Assert.IsTrue(correctionFacto == 0);
        }
    }
}
