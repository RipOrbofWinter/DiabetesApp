import React from "react";
import { View, Text, TextInput, Button } from "react-native";
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 
var weightSetting = gun.get('weight');

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

function setWeight(data)
{
    weightSetting.set(data);
    console.log(weightSetting)
}
function setSugar(data)
{
    sugar = data
}

function getWeight()
{
    // gun.get('weight').get('weight')
    return "test";
}
function getSugar()
{
    return sugar;
}