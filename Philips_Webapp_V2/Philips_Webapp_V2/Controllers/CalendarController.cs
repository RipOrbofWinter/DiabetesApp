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
            var gun = TempData["GetIntakes"] as IntakeData[];

            if (gun == null)
                return RedirectToAction("GetIntakes", "Gun");

            TempData["GetIntakes"] = gun;

            return View();
        }

        public ActionResult IntakeDetails(string id)
        {
            var gun = TempData["GetIntakes"] as IntakeData[];
            TempData["GetIntakes"] = gun;

            var intake = gun.Where(x => x.id == id).FirstOrDefault();

            return View(intake);
        }

        public ActionResult DisplayCurrentDay()
        {
            var gun = TempData["GetIntakes"] as IntakeData[];
            var dayDate = TempData["currentDate"] as string;
            TempData["GetIntakes"] = gun;
            TempData["currentDate"] = dayDate;

            var intake = gun.Where(x => x.dateOfIntake == dayDate).ToList();
            return View(intake);
        }

        [HttpPost]
        public JsonResult GetcurrentDay(IntakeData date)
        {
            var current = date.dateOfIntake.Replace('-', ':');
            TempData["currentDate"] = current;
            return Json(new { redirectTo = Url.Action("DisplayCurrentDay", "Calendar") });
        }

        public JsonResult GetEvents()
        {
            var gun = TempData["GetIntakes"] as IntakeData[];
            TempData["GetIntakes"] = gun;
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