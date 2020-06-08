using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.ExtensionMethods
{
	public static class BoolRandom
	{
		readonly static Random r = new Random();
		public static bool NextBool(int truePercentage = 50)
		{
			return r.NextDouble() < truePercentage / 100.0;
		}
	}
}
