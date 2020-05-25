using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Models
{
	public class ChatMessageModel
	{
		public string Text { get; set; }
		public string Date { get; set; }
		public bool IsSent { get; set; }
	}
}
