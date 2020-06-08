using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
	public class IntakeDataModel
	{
		public DateTime Date { get; set; }
		public float CalorieIntake { get; set; }
		public int CHORatio { get; set; }
		public int InsulinUnitsTaken { get; set; }
	}
}
