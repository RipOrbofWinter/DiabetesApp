using BusinessLogic.Entities;
using BusinessLogic.Gun;
using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Factory
{
	public static class MessageFactory
	{
		public static List<ChatMessageModel> ConvertToModel(MessageData[] data)
		{
			List<ChatMessageModel> models = new List<ChatMessageModel>();

			foreach (var chatMessage in data)
			{
				var model = ConvertToModel(chatMessage);
				if (model == null)
					continue;

				models.Add(model);
			}

			return models;
		}

		public static ChatMessageModel ConvertToModel(MessageData data)
		{

			if (data.title == null)
				return null;

			ChatMessageModel model = new ChatMessageModel();
			if(data.id != null)
			{
				model.id = data.id;
			}
			if (data.timestamp != null)
			{
				model.Date = data.timestamp;
			}
			model.Text = data.title;
			return model;
		}
	}
}
