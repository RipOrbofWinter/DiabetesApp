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