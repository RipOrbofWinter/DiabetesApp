using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.ExtensionMethods;
using BusinessLogic.Facotry;
using BusinessLogic.Models;
using BusinessLogic.TemporaryData;
using System.Web.Mvc;

namespace Philips_MVC_Visual.Controllers
{
    public class ChatController : Controller
    {
        public TemporaryDataBuilder builder = new TemporaryDataBuilder();

        public ActionResult Chat()
        {
            var messages = builder.messages;
            var messageModels = MessageFactory.ConvertToModel(messages);
            return View(messageModels);
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