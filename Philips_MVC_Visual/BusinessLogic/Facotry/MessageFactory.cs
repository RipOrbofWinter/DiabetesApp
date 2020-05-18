using BusinessLogic.Entities;
using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Facotry
{
	public static class MessageFactory
	{
		public static List<ChatMessageModel> ConvertToModel(List<ChatMessage> chatMessages)
		{
			List<ChatMessageModel> models = new List<ChatMessageModel>();

			foreach (var chatMessage in chatMessages)
			{
				ChatMessageModel model = new ChatMessageModel
				{
					Text = chatMessage.Text,
					Date = chatMessage.Date,
				};

				models.Add(model);
			}

			return models;
		}
	}
}
