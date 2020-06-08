using BusinessLogic.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Entities
{
	public class IntakeData : EntityModelBase
	{
		public DateTime DateOfIntake { get; set; }
		public float CalorieIntake { get; set; }
		public int CHORatio { get; set; }
		public int InsulinUnitsTaken { get; set; }
	}
}
