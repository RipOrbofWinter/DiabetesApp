import React from "react";
import { View, Text, Button } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class CustomComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentDay: 17, //TODO: Get Current Day
      currentMonth: 5, //TODO: Get Current Month
      currentYear: 2020, //TODO: Get Current Year
      selectedDateString: '17-5-2020',
      markedDates:  GetCurrentMonthData()
    };
  }

  render() { 
    return (
       
      <View>
        <Text>
          Custom Component
        </Text>
        <Calendar
          maxDate={'2020-05-17'}
          minDate={'2020-04-25'}
          markedDates={this.state.markedDates}
          onDayPress={(day) => 
            this.setState({currentDay: day.day, currentMonth: day.month, currentYear: day.year, selectedDateString: day.dateString}) +
            console.log(day) +
            this.setState({markedDates: UpdateCurrentDay(this.state.markedDates, day)})
          }
          
        />
        {/* TODO: Replace with Insulin component */}
        <View>
          <Text>Geselecteerde datum: { this.state.currentDay } - { this.state.currentMonth } - { this.state.currentYear }</Text>
          <Text>Inname 1</Text>
          <Text>Inname 2</Text>
          <Text>Inname 3</Text>
        </View>
      </View>
       
    );
  }  
}

function UpdateCurrentDay(markedDates, day){
  
  markedDates = GetCurrentMonthData();
  if(markedDates[day.dateString]){
    markedDates[day.dateString].selected = true;
  }
  

  // Debugging for loop
  // for (let [key, value] of Object.entries(markedDates)) {
  //   console.log(`${key}: ${value}`);
  // }

  return markedDates;
}

//TODO: Replace hardcoded data with GUN.JS values
function GetCurrentMonthData(){
  var markedDates = {
    '2020-04-25': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-04-26': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-04-27': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-04-28': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-04-29': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-04-30': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-01': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-02': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-03': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-04': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-05': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-06': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-07': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-08': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-09': {marked: true, dotColor: 'green', activeOpacity: 0},
    '2020-05-10': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-11': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-12': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-13': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-14': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-15': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-16': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2020-05-17': {marked: true, dotColor: 'red', activeOpacity: 0}
  }

  return markedDates;
}