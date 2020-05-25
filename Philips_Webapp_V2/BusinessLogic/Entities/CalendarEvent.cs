using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Entities
{
	public class CalendarEvent
	{
		public string Subject { get; set; }
		public string Description { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Theme { get; set; }
		public bool IsFullDay { get; set; }

		public CalendarEvent()
		{
			
		}
	}
}
