import React from "react";
import { View, Text, Button } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 
var calendarGun = gun.get('calendar');

export default class CustomCalendar extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentDay: 17, //TODO: Get Current Day
      currentMonth: 5, //TODO: Get Current Month
      currentYear: 2020, //TODO: Get Current Year
      selectedDateString: '17-5-2020',
      markedDates:  GetCurrentMonthData(),
      currentDoses: 5 //Get Gun Data
    };
  }

  render() { 
    return (
       
      <View>
        <Text>
          Custom Component
        </Text>
        <Calendar
          maxDate={'2020-09-16'}
          minDate={'2020-04-25'}
          markedDates={this.state.markedDates}
          onDayPress={(day) => 
            this.setState({currentDay: day.day, currentMonth: day.month, currentYear: day.year, selectedDateString: day.dateString}) +
            this.setState({markedDates: UpdateCurrentDay(day, this.state.markedDates)})
          }
          
        />
        {/* TODO: Replace with Insulin component */}
          <View>
            <Text>Geselecteerde datum: { this.state.currentDay } - { this.state.currentMonth } - { this.state.currentYear }</Text>
            <Text>Aantal innames: {this.state.currentDoses} </Text>
            <Button
              title="Innames inzien"
              onPress={() => this.props.navigation.navigate('InsulinList', {
                currentDay: this.state.currentDay,
                currentMonth: this.state.currentMonth,
                currentYear: this.state.currentYear,
                dateString: this.state.dateString,
                currentDoses: this.state.currentDoses
              })}
            />
            <Button
              title="Inname toevoegen"
              onPress={() => this.props.navigation.navigate('Insuline', {
                currentDay: this.state.currentDay,
                currentMonth: this.state.currentMonth,
                currentYear: this.state.currentYear,
                dateString: this.state.dateString
              })}
            />
          </View>
        </View>
       
    );
  }  
}

//export default withNavigation(CustomComponent);

var d = new Date();

function UpdateCurrentDay(day, markedDates){
  if(markedDates[day.dateString]){
    markedDates[day.dateString].selected = true;
    UpdateMarkedDatesGun(markedDates);
  }
  else{
    if(day.timestamp < d.getTime()){
      markedDates = AddDayToMarkedDates(day, markedDates);
    }
    
  }
  return markedDates;
}

function AddDayToMarkedDates(day, markedDates){
  markedDates[day.dateString] = {marked: true, dotColor: 'red', activeOpacity:0}
  UpdateMarkedDatesGun(markedDates);
  return markedDates;
}

function UpdateMarkedDatesGun(markedDates){
  if(markedDates){
      calendarGun.set(markedDates);
  }
}

var gunDates;
//TODO: Replace hardcoded data with GunDB values
function GetCurrentMonthData(){
  calendarGun.on(function(item, id){
      gunDates = item[Object.keys(item)[Object.keys(item).length - 1]]
  })
  if(gunDates == null){
    gunDates = {
      '2020-05-01': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-02': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-03': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-04': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-05': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-06': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-07': {marked: true, dotColor: 'red', activeOpacity: 0},
      '2020-05-08': {marked: true, dotColor: 'green', activeOpacity: 0},
      '2020-05-09': {marked: true, dotColor: 'green', activeOpacity: 0}
    }
    calendarGun.set(gunDates);
  }
  return gunDates
}

// var markedDates = {
//   '2020-04-25': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-26': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-27': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-28': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-29': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-30': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-01': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-02': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-03': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-04': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-05': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-06': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-07': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-08': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-09': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-05-10': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-11': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-12': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-13': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-14': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-15': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-16': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2020-05-17': {marked: true, dotColor: 'red', activeOpacity: 0}
// }