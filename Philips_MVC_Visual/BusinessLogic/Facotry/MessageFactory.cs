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
				var model = ConvertToModel(chatMessage);
				models.Add(model);
			}

			return models;
		}

		public static ChatMessageModel ConvertToModel(ChatMessage chatMessage)
		{
			ChatMessageModel model = new ChatMessageModel
			{
				Text = chatMessage.Text,
				Date = chatMessage.Date,
			};

			return model;
		}
	}
}
