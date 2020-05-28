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
            weightState: '',
            sugarState: ''
        };
    }

    render() { 
        return (
            <View>            
                <Text>Instellingen</Text>
                <br></br> 
                <br></br>
                <Text>Gewicht instellen</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder={getWeight()}
                    onChangeText={(weightState) => this.setState({weightState})}
                    defaultValue={this.state.weightState}
                />
                <br></br>
                <Text>Bloedsuikerspiegel doel</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder={getSugar()}
                    onChangeText={(sugarState) => this.setState({sugarState})}
                    defaultValue={this.state.sugarState}
                />
                    <br></br>
                <Button
                    title="Opslaan instellingen"
                    onPress={() => {setWeight(this.state.weightState); setSugar(this.state.sugarState); this.props.navigation.navigate('Home') }} 
                />
                <Button
                    title="Annuleren"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        )
    }
}

///Get and set methods from the settings screen
var sugar = 0;
var weight = '';

function setWeight(data)
{
    if(data != ''){
        weightSetting.set(data);
        console.log(weightSetting)
    }
}
function setSugar(data)
{
    if(data != ''){
        sugarSetting.set(data);
        console.log(sugarSetting)
    }
}

function getWeight()
{
    weightSetting.on(function(item, id){
        weight = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return weight

}
function getSugar()
{
    sugarSetting.on(function(item, id){
        sugar = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return sugar
}