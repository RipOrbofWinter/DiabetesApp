using BusinessLogic.ExtensionMethods;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Entities
{
	public class ChatMessage : EntityModelBase
	{
		public string Text { get; set; }
		public DateTime Date { get; set; }

		public ChatMessage()
		{
			Date = DateTime.Now;
		}
	}
}
