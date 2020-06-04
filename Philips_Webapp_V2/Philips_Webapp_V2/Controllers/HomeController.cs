using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using BusinessLogic.Models;
using BusinessLogic.Gun;

namespace Philips_MVC_Visual.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Index2(Data data2)
		{
			return View();
		}

		[HttpPost]
		public JsonResult GetData(Data data1)
		{
			GunDataManager.AddToList(data1);
			return Json(new { redirectTo = Url.Action("Index2", "Home", new { Name = data1.Name }, null) });
		}
	}
}
