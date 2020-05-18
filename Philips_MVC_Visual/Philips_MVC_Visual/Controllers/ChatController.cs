using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLogic.Facotry;
using BusinessLogic.TemporaryData;
using Microsoft.AspNetCore.Mvc;

namespace Philips_MVC_Visual.Controllers
{
    public class ChatController : Controller
    {
        public TemporaryDataBuilder builder = new TemporaryDataBuilder();

        public IActionResult Chat()
        {
            var messages = builder.messages;
            var messageModels = MessageFactory.ConvertToModel(messages);
            return View(messageModels);
        }

        public IActionResult CreateChat()
        {
            return View();
        }
    }
}