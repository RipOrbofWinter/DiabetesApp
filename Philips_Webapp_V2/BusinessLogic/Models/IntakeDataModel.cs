using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Models
{
	public class IntakeDataModel
	{
		public DateTime Date { get; set; }
		public string CalorieIntake { get; set; }
		public string CHORatio { get; set; }
		public string InsulinUnitsTaken { get; set; }
		public string weight { get; set; }
		public string bloodSugar { get; set; }
		public string user { get; set; }
	}
}
