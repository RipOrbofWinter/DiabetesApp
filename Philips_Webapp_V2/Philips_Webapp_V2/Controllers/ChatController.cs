using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.ExtensionMethods;
using BusinessLogic.Factory;
using BusinessLogic.Models;
using System.Web.Mvc;
using BusinessLogic.Gun;

namespace Philips_MVC_Visual.Controllers
{
    public class ChatController : Controller
    {
        public ActionResult Chat()
        {
            var gun = TempData["GetMessages"] as MessageData[];

            if (gun == null)
                return RedirectToAction("GetMessages", "Gun");

            var messageModels = MessageFactory.ConvertToModel(gun);
            return View(messageModels);
        }

        public ActionResult ChatV2(string chatroom = "message21")
        {
            return View((object)chatroom);
        }

        public JsonResult ChatV3(string room)
        {
            return Json(new { redirectTo = Url.Action("ChatV2", "Chat", new { chatroom = room }) });
        }


        public ActionResult ChatSend(string message)
        {
            return RedirectToAction("Chat");
        }

        public ActionResult CreateChat()
        {
            return View();
        }

        public ActionResult generatePassword()
        {
            var randomString = SecurePasswordHasher.RandomString(10);
            var hash = SecurePasswordHasher.Hash(randomString);
            return RedirectToAction("CreateChat");
        }
    }
}