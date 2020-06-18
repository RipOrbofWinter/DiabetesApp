using BusinessLogic.Entities;
using BusinessLogic.Gun;
using BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Factory
{
    public static class IntakeDataFactory
    {
        public static List<IntakeDataModel> ConvertToModel(List<IntakeData> intakedata)
        {
            List<IntakeDataModel> models = new List<IntakeDataModel>();

            foreach (var data in intakedata)
            {
                var model = ConvertToModel(data);
                models.Add(model);
            }

            return models;
        }

        public static IntakeDataModel ConvertToModel(IntakeData intakeData)
        {
            IntakeDataModel data = new IntakeDataModel
            {
                Date = DateTime.Parse(intakeData.dateOfIntake),
                CalorieIntake = intakeData.CHOMealGrams,
                CHORatio = intakeData.CHORatio,
                InsulinUnitsTaken = intakeData.InsulinUnits,
                bloodSugar = intakeData.bloodSugar,
                weight = intakeData.weight,
                user = intakeData.user,
            };

            return data;
        }

        public static List<CalendarEvent> ConvertToCalendarEvents(List<IntakeData> intakedatas)
        {
            List<CalendarEvent> calendarEvents = new List<CalendarEvent>();
            foreach (var intakedata in intakedatas)
            {
                var calendarEvent = ConvertToCalendarEvents(intakedata);
                calendarEvents.Add(calendarEvent);
            }
            return calendarEvents;

        }

        public static CalendarEvent ConvertToCalendarEvents(IntakeData intakedata)
        {
            var dataArray = intakedata.dateOfIntake.Split(':');

            var date = new DateTime(int.Parse(dataArray[0]), int.Parse(dataArray[1]), int.Parse(dataArray[2]));
            
            CalendarEvent calendarEvent = new CalendarEvent()
            {
                Start = date,
                End = date,
                Subject = "Intake: " + intakedata.dateOfIntake,
                Description =
                " CHOMealGrams: " + intakedata.CHOMealGrams +
                " CHORatio: " + intakedata.CHORatio +
                " InsulinUnits: " + intakedata.InsulinUnits +
                " weight:" + intakedata.weight + 
                " User: " + intakedata.user,
                Theme = "green",
                IsFullDay = true,
            };

            return calendarEvent;
        }
    }
}
