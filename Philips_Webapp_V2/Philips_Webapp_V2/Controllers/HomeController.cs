using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using BusinessLogic.Models;

namespace Philips_MVC_Visual.Controllers
{
	public class HomeController : Controller
	{
		public class Data
		{
			public string Name { get; set; }
		}

		public ActionResult Index()
		{
			return View();
		}
		
		[HttpPost]
		public JsonResult GetData(Data data)
		{
			return Json(data.Name , JsonRequestBehavior.AllowGet);
		}
	}
}
