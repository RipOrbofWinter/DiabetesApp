using BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace BusinessLogic.TemporaryData
{
	public class TemporaryDataBuilder
	{
		public List<ChatMessage> messages;

		public TemporaryDataBuilder()
		{
			BuildMessages(10);
		}

		private void BuildMessages(int amount)
		{
			messages = new List<ChatMessage>();
			for (int i = 0; i < amount; i++)
			{
				ChatMessage message = new ChatMessage
				{
					Id = Guid.NewGuid(),
					Text = $"{i}",				
				};
				messages.Add(message);
			}
		}
	}
}
