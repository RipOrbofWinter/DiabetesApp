using BusinessLogic.Gun;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Philips_Webapp_V2.Controllers
{
    public class GunController : Controller
    {

		public ActionResult GetMessages()
		{
			return View();
		}

		[HttpPost]
		public JsonResult GetChatMessages(MessageData[] gunData)
		{
			TempData.Remove("GetMessages");
			TempData["GetMessages"] = gunData;
			return Json(new { redirectTo = Url.Action("Chat", "Chat") });
		}

		public ActionResult GetIntakes()
		{
			return View();
		}

		[HttpPost]
		public JsonResult GetUserIntakes(IntakeData[] gunData)
		{
			TempData["GetIntakes"] = gunData;
			return Json(new { redirectTo = Url.Action("Calendar", "Calendar") });
		}
	}
}