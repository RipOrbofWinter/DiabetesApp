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
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Privacy()
		{
			return View();
		}

		public ActionResult Calendar()
		{
			return View();
		}
	}
}
