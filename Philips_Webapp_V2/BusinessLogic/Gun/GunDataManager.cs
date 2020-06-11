using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Gun
{
	public static class GunDataManager
	{
		public static List<MessageData> DataList { get; set; }

		public static void AddToList(MessageData data)
		{
			if (data == null)
				return;

			//DataList.Add(data);
		}
	}
}
