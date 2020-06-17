using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Mvc;
using BusinessLogic.Gun;
using BusinessLogic.Factory;
using BusinessLogic.Entities;

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

            List<CalendarEvent> events = new List<CalendarEvent>();

            if (gun != null)
            {
                //gun loaded 
                events = IntakeDataFactory.ConvertToCalendarEvents(gun.ToList());
            }

            return new JsonResult { Data = events, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}