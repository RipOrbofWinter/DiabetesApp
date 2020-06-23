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
      currentDay: new Date().getDate(),
      currentMonth: (new Date().getMonth() + 1), 
      currentYear: new Date().getFullYear(),
      selectedDateString: '2020-6-6',
      markedDates:  GetCurrentMonthData(),
      currentDoses: GetAmountOfDoses(GetCurrentDate()), //Get Gun Data
      minDate: '2020-04-01',
      maxDate: '2021-04-01'
    };
  }

  render() { 
    return (
      <View>
        <Text>
          Custom Component
        </Text>
        <Calendar
          maxDate={this.state.maxDate}
          minDate={this.state.minDate}
          markedDates={this.state.markedDates}
          onDayPress={(day) => 
            this.setState({currentDay: day.day, currentMonth: day.month, currentYear: day.year, selectedDateString: day.dateString}) +
            //this.setState({markedDates: UpdateCurrentDay(day, this.state.markedDates)}) +
            this.setState({currentDoses: GetAmountOfDoses(day.dateString)})
            
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

var gunDates = {};
function GetCurrentMonthData(){
  var loopLength = 0;
  gun.get('users5').map().on(function(item, id){
    if(item.id != null){
      loopLength++
    }
  })
  
  for(var x = 1; x < loopLength; x++){
    var id = 'id' + x
    gun.get('users5').get(id).get('intake').map().on(function(item, id){
      var itemDateDash = item.dateOfIntake.replace(/:/g, '-')
      if(gunDates[itemDateDash] == null){
        gunDates[itemDateDash] = {marked: true, dotColor: 'green', activeOpacity: 0}
        
      }
      
    })
  }

  //fallback
  if(gunDates == null){
    gunDates = {
      '2020-06-01': {marked: true, dotColor: 'red', activeOpacity: 0}
    }
    calendarGun.set(gunDates);
  }
  return gunDates
}



function GetAmountOfDoses(datestring){
  var counter = 0;
  var loopLength = 0;
  gun.get('users5').map().on(function(item, id){
    if(item.id != null){
      loopLength++
    }
  })
  
  for(var x = 1; x < loopLength; x++){
    var id = 'id' + x
    gun.get('users5').get(id).get('intake').map().on(function(item, id){
      var itemDateDash = item.dateOfIntake.replace(/:/g, '-')
      if(itemDateDash == datestring){
        counter++
      }
      
    })
  }
  return counter;
}


function GetCurrentDate(){
  var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
  return date
}

//#region Debug loop
function LoopThroughGunIntakes(){
  var loopLength = 0;
  gun.get('users5').map().on(function(item, id){
    if(item.id != null){
      loopLength++
    }
  })
  
  for(var x = 1; x < loopLength; x++){
    var id = 'id' + x
    gun.get('users5').get(id).get('intake').map().on(function(item, id){
      console.log(item);
    })
  }
}
//#endregion Debug Loop

// var markedDatesExample = {
//   '2020-04-25': {marked: true, dotColor: 'green', activeOpacity: 0},
//   '2020-04-26': {marked: true, dotColor: 'red', activeOpacity: 0},
// }