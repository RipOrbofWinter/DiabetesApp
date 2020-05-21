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
		public List<CalendarEvent> calendarEvents;

		public TemporaryDataBuilder()
		{
			BuildMessages(40);
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
			calendarEvents = new List<CalendarEvent>();

			for (int i = 0; i < amount; i++)
			{
				IntakeData data = new IntakeData
				{
					Id = Guid.NewGuid(),
					DateOfIntake = DateTime.Now,
					CalorieIntake = i * 10,
					CHORatio = rnd.Next(1, 12),
					InsulinUnitsTaken = rnd.Next(1, 7),
				};


				CalendarEvent cEvent = new CalendarEvent
				{
					Subject = $"Intake {i}:{data.DateOfIntake.Day}",
					Description = $"CHO ratio: {data.CHORatio}, Calories: {data.CalorieIntake}, Units: {data.InsulinUnitsTaken}",
					StartDate = data.DateOfIntake,
					EndDate = data.DateOfIntake,
					Theme = "green",
					IsFullDay = false,
				};

				calendarEvents.Add(cEvent);
				intakeData.Add(data);
			}
		}
	}
}
