using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using BusinessLogic.TemporaryData;
using System.Web.Mvc;
using BusinessLogic.Gun;
using BusinessLogic.Factory;

namespace Philips_MVC_Visual.Controllers
{
    public class CalendarController : Controller
    {

        public ActionResult Calendar()
        {
            return View();
        }

        public JsonResult GetEvents()
        {
            var gun = TempData["GetIntakes"] as IntakeData[];

            if (gun == null)
            {
                //gun not loaded 
            }

            //var events = IntakeDataFactory.fuctionToModel;
            return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}