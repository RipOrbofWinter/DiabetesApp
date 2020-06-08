using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using BusinessLogic.Models;
using BusinessLogic.Gun;
using System.Web.Routing;

namespace Philips_MVC_Visual.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Index2()
		{
			return View();
		}

		[HttpPost]
		public JsonResult GetData(Data[] gunData)
		{
			TempData["GunData"] = gunData;
			return Json(new { redirectTo = Url.Action("Chat", "Chat") });
		}
	}
}
