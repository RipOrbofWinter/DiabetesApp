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
		public List<IntakeData> intakeData;

		public TemporaryDataBuilder()
		{
			BuildMessages(10);
			BuildIntakeData(10);
		}

		private void BuildMessages(int amount)
		{
			messages = new List<ChatMessage>();
			for (int i = 0; i < amount; i++)
			{
				ChatMessage message = new ChatMessage
				{
					Id = Guid.NewGuid(),
					Text = $"message {i}",				
				};
				messages.Add(message);
			}
		}

		private void BuildIntakeData(int amount)
		{
			Random rnd = new Random();

			intakeData = new List<IntakeData>();
			for (int i = 0; i < amount; i++)
			{
				IntakeData data = new IntakeData
				{
					Id = Guid.NewGuid(),
					DateOfIntake = DateTime.Now,
					CalorieIntake = i * 10,
					CHORatio = rnd.Next(1,12),
					InsulinUnitsTaken = rnd.Next(1,7),
				};
				intakeData.Add(data);
			}
		}
	}
}
