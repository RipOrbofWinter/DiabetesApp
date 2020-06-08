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
		public JsonResult GetChatMessages(Data[] gunData)
		{
			TempData["GetMessages"] = gunData;
			return Json(new { redirectTo = Url.Action("Chat", "Chat") });
		}
	}
}