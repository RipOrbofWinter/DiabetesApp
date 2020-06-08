using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Gun
{
	public static class GunDataManager
	{
		public static List<Data> DataList { get; set; }

		public static void AddToList(Data data)
		{
			if (data == null)
				return;

			//DataList.Add(data);
		}
	}
}
