import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 
var weightSetting = gun.get('weight');
var sugarSetting = gun.get('sugar');

export default class SettingsComponent extends React.Component { 

    constructor(){
        super();
        this.state = {
            weightState: getWeight(),
            sugarState: getSugar()
        };
    }

    render() { 
        return (
            <View>            
                <Text>Instellingen</Text>
                {/* <Text>{ "\n \n" }</Text>  */}
                
                <Text>Gewicht instellen</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder={getWeight()}
                    onChangeText={(weightState) => this.setState({weightState})}
                />
                {/* <Text>{ "\n " } </Text> */}
                <Text>Bloedsuikerspiegel doel</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder={getSugar()}
                    onChangeText={(sugarState) => this.setState({sugarState})}
                    
                />
                {/* <Text>{ "\n " } </Text> */}
                <Button
                    title="Opslaan instellingen"
                    onPress={() => {setWeight(this.state.weightState); setSugar(this.state.sugarState); this.props.navigation.navigate('Home') }} 
                />
                <Button
                    title="Annuleren"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>
        )
    }
}

///Get and set methods from the settings screen
var sugar = 0;
var weight = 0;

function setWeight(data)
{
    if(data){
        weightSetting.set(data);
    }
}
function setSugar(data)
{
    if(data){
        sugarSetting.set(data);
    }
}

function getWeight()
{
    gun.get('weight').on(function(item, id){
        weight = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return weight
}
function getSugar()
{
    gun.get('sugar').on(function(item, id){
        sugar = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return sugar;
}


// var connectedUsername = gun.get(user2).put({name: capitalizeFirstLetter(user2)});
//   gun.get('user').get(user1).set(connectedUsername);
// var message = gun.get(user2).put({messageObject});
//   gun.get('user').get(user1).get(user2).get('chat').set(message);

// var connectedUsername = gun.get(user1).put({name: capitalizeFirstLetter(user1)});
//   gun.get('user').get(user2).set(connectedUsername);
// var message = gun.get(user1).put({messageObject});
//   gun.get('user').get(user2).get(user2).get('chat').set(message);

// var connectedUsername = gun.get(user1).put({name: capitalizeFirstLetter(user1)});
//   gun.get('user').get(user2).set(connectedUsername);
// gun.get('user').get(user2).get('name').get('chat').set(messageObject);

// Send new intake data
// var manualObject = {
//   user: "Mickey", 
//   dateOfIntake: "2020:06:03",
//   intakeDayId: "1",
//   weight: "170",
//   CHOMealGrams: "500.",
//   CHORatio: "1:8",
//   bloodSugar: "180",
//   InsulinUnits: "5"
// }

// for(var x = 1; x<=5; x++){
//   var id = 'id' + (x + 10);

//   var manualObject = {
//     user: "Dr. Luuk", 
//     dateOfIntake: "2020:07:10",
//     intakeDayId: id,
//     weight: "170",
//     CHOMealGrams: "230",
//     CHORatio: "1:"+ Math.floor(Math.random() * 2) + 8,
//     bloodSugar: "200",
//     InsulinUnits: Math.floor(Math.random() * 10) + 5
//   }
//   var newUser = gun.get(id).put({id: id});
//   gun.get('users5').set(newUser);
//   var newUser = gun.get(id).get('intake').put({manualObject});
//   gun.get('users5').set(newUser);
// }

// for(var x = 1; x<=16; x++){
//     var id = 'id' + x;
//   gun.get('users5').get(id).get('intake').map().on(function(item, id){
//     console.log(item.user + item.intakeDayId, item.dateOfIntake)
//   })
// }

// gun.get('users5').get("id14").get("intake").map().on(function(item, id){
//   console.log(item)
// })
// console.log(counter);


// gun.get('user').get(user1).get('luuk').map().on(function(item, id){

//   console.log(item)
//   })