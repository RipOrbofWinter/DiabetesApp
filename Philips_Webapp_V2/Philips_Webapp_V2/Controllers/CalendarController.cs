using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using BusinessLogic.TemporaryData;
using System.Web.Mvc;

namespace Philips_MVC_Visual.Controllers
{
	public class CalendarController : Controller
	{
		public TemporaryDataBuilder builder = new TemporaryDataBuilder();

		public ActionResult Calendar()
		{
			return View();
		}

		public JsonResult GetEvents()
		{
			var events = builder.calendarEvents;
			return new JsonResult{Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
	}
	}
}