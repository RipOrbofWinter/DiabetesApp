using BusinessLogic.Entities;
using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Factory
{
	public static class IntakeDataFactory
	{
		public static List<IntakeDataModel> ConvertToModel(List<IntakeData> intakedata)
		{
			List<IntakeDataModel> models = new List<IntakeDataModel>();

			foreach (var data in intakedata)
			{
				var model = ConvertToModel(data);
				models.Add(model);
			}

			return models;
		}

		public static IntakeDataModel ConvertToModel(IntakeData intakeData)
		{
			IntakeDataModel data = new IntakeDataModel
			{
				Date = intakeData.DateOfIntake,
				CalorieIntake = intakeData.CalorieIntake,
				CHORatio = intakeData.CHORatio,
				InsulinUnitsTaken = intakeData.InsulinUnitsTaken,
			};

			return data;
		}
	}
}
