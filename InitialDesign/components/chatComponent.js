import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";
import Gun from 'gun/gun.js' 
import { ScrollView } from "react-native-gesture-handler";
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 

// Meerdere keren berichten ontvangen bug:
/// 1. te veel ontvangen is gelijk aan aantal berichten sinds laatste refresh
// 1.1 Als verzender 2x een bericht ontvangt ontstaat de bug
// 1.1.1 2x versturen van een bericht removed de bug
// 1.2 Na 2x bericht te ontvangen krijg je 3x hetzelfde bericht of na 3x bericht ontvangen krijg je 5 keer? of na 6 berichten krijg je 8 keer zelfde bericht?
/// !!! 2. laatste bericht te veel ontvangen wordt vervangen met nieuw berict van beide kanten?
/// 3. Als this.textBoxMessage wordt aangepast verdwijnt de bug... :thinking: 
/// 4. Refresh reset alles
// 5. .on wordt meerdere keren uitgevoerd, 
// Warning: Can't call setState on a component that is not yet mounted.
//  This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};`
//  class property with the desired state in the ChatComponent component.


export default class ChatComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      text: 'What is your name?',
      textBoxMessage: 'Typ jouw bericht hier',
      name: 'test',
      message: '',
      messagesObject: ''
    }

    this.$message = this.$gun.get('user').get('chat').get('message21')
    let _this = this
    this.$message.on(function(data, key) {
      _this.setState({messagesObject:getMessages("This.message.on")})
    })
  }

  render() { 
    return (
       
        <FlatList
          data={DATA}
          renderItem={({item, index, separators}) => (
            <View style={{backgroundColor: 'white', flex: 1}}>
              <Text style={{lineHeight: 25}}>{item.title} - { ConvertTimeStampToDateTime(item.timestamp) }</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <View 
            style={{flex: 0.1}}
            contentContainerStyle={{flexGrow: 1}}
            >
              <TextInput 
                style={{ 
                  borderLeftWidth: 1,
                  borderRightWidth: 1, 
                  borderTopWidth: 1, 
                  borderBottomWidth: 1, 
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                onChangeText={(textBoxMessage) => this.setState({textBoxMessage})} 
              />
              <Button title='Stuur Bericht' 
                onPress={()=>{
                  //this.$message.put({message:this.state.textBoxMessage})
                  setMessage(this.state.textBoxMessage, GetTimeStamp());
                  this.setState({textBoxMessage:''})
                }}
                style={{bottom: 1000, position: 'absolute'}}
              />
            </View>
          }
        />
    );
  }  
}

function Item({ title }) {
  return (
    <View >
      <Text>{title}</Text>
    </View>
  );
}

var messageObject  = {
  title: 'message wordt getest 2',
  timestamp: ''
}

var user1 = "mickey"
var user2 = "luuk"
var date = "2020:06:03"
// var intakeId = "1"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


var DATA = [
  {
    id: 'test',
    title: 'First Item',
  }
];

var message;

function setMessage(message, timestamp)
{
  var messageObject = {
      title: message,
      timestamp: timestamp
  }

  if(message){
      //sugarSetting.set(data);
      gun.get('user').get('chat').get('message21').set(messageObject);
  }

  console.log(gun.get('user').get('chat').get('message21'));
}

function getMessage()
{
    gun.get('user').get('chat').get('message21').on(function(item, id){
        message = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return message
}

function getMessages(functionOrigin)
{
  DATA = [];
  var counter = 0;
  gun.get('user').get('chat').get('message21').map().on(function(item, id){
    var messageObject  = {
      id: id,
      title: item.title,
      timestamp: item.timestamp
    }
    if (counter == 0){
      // console.log("message id: " + messageObject.id)
      DATA.push(messageObject);
    }
    else if(DATA[DATA.length - 1] != undefined && DATA[DATA.length - 1].id != messageObject.id){
      // console.log("message id: " + messageObject.id + " past id: " + DATA[DATA.length - 1].id)
      DATA.push(messageObject);
    }
    else{
      console.log("Duplicate: " + messageObject.id + " Stopped")
    }
    counter++;
  })
  //console.log(DATA);
  return DATA.sort((a, b) => parseFloat(a.timestamp) - parseFloat(b.timestamp));
}

function GetTimeStamp(){
  var d = new Date();
  return d.getTime();
}

function ConvertTimeStampToDateTime(timestamp){
  var date = new Date(timestamp);
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var formattedTime = year + "-" + month + "-" + day + " " + hours + ':' + minutes;
  return formattedTime;
}