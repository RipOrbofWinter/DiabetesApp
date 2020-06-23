import React from "react";
import { View, Text, ScrollView, Picker, TextInput, Button } from "react-native";
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 
// get current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '/' + mm + '/' + dd;


export default class SettingsComponent extends React.Component { 
    constructor(){
        super();
        this.state = {
            khValue: '',
            currentBloodSugar: '',
            dateOfIntake: today
        };
    }

    render() { 
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <br></br> 
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '60%', height: '30px', borderStyle: 'solid', border: '1px'}}>
                    <Text style={{ fontSize: '14pt'}}>Inname #</Text>
                </View>
                <br></br>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '60%', height: '30px', borderStyle: 'solid', border: '1px'}}>
                <TextInput
                            style={{height: 40, fontSize: '12pt'}}
                            placeholder={this.state.dateOfIntake}
                            onChangeText={(dateOfIntake) => this.setState({dateOfIntake})}
                        />
                </View>
                <ScrollView style={{width: '80%'}}>
                    <br></br>
                    <View style={{ alignItems: 'center', justifyContent: 'center',height: '110px', borderStyle: 'solid', border: '1px'}}>
                        <Text style={{ fontSize: '14pt'}}>Koolhydraten bij eetmoment:</Text>
                        <TextInput
                            style={{height: 40, fontSize: '12pt'}}
                            placeholder='100'
                            onChangeText={(khValue) => this.setState({khValue})}
                        />
                    </View>
                    {/* <br></br>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', border: '1px'}}>
                        <Text style={{ fontSize: '14pt'}}>CHO-ratio:</Text>
                        <br></br>
                        <Text style={{ fontSize: '12pt'}}>1:10</Text>
                    </View> */}
                    <br></br>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', border: '1px'}}>
                        <Text style={{ fontSize: '14pt'}}>Huidige Bloedsuikerspiegel</Text>
                        <TextInput
                            style={{height: 40, fontSize: '12pt'}}
                            onChangeText={(currentBloodSugar) => this.setState({currentBloodSugar})}
                            placeholder={getSugar()}
                        />
                    </View>
                    <br></br>
                    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', border: '1px'}}>
                        <Text style={{ fontSize: '14pt'}}>Doel Bloedsuikerspiegel: </Text>
                        <br></br>
                        <Text style={{ fontSize: '12pt'}}>{getSugar()}</Text>
                    </View>
                    <br></br>
                    {/* <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px', borderStyle: 'solid', border: '1px'}}>
                        <Text style={{ fontSize: '14pt'}}>Insuline advies: </Text>
                        <br></br>
                        <Text style={{ fontSize: '12pt'}}>this.state.</Text>
                    </View>
                    <br></br> */}
                    <Button
                    title="Opslaan inname"
                    onPress={() => { saveIntake(this.state.khValue, this.state.currentBloodSugar, this.state.dateOfIntake); this.props.navigation.navigate('Home')}} 
                    />
                    <Button
                    title="Annuleren"
                    onPress={() => { alert('Intake Canceled'); this.props.navigation.navigate('Home')}}
                    />
                </ScrollView>
            </View>
        )
    }
}
var sugar = 0;
var weight = 0;
function saveIntake(khValue, currentBloodsugar, dateOfIntake){
    var manualObject = {
        user: "Mickey", 
        dateOfIntake:(dateOfIntake.replace("/", ":")).replace("/", ":"),
        // intakeDayId: 1,
        intakeDayId: Math.floor(Math.random() * 10) + 1,
        weight: getWeight(),
        CHOMealGrams: khValue,
        CHORatio: "1:" + CalculateCarbohydateRatio(CalculateDailyInsulinDoseRequirement(getWeight())),
        bloodSugar: getSugar(),
        InsulinUnits: CalculateTotalMealtimeDose(khValue, CalculateDailyInsulinDoseRequirement(getWeight()), currentBloodsugar, getSugar())
    }
    console.log(manualObject); 
    // Testing if any data failed
    const values = Object.values(manualObject)
    for (const value of values){
        if (value == NaN || value == ""){
            alert('Something has gone wrong with your data input. Please ensure you have all fields filled out.')
            return
        }
    }
    var newUser = gun.get('id' + manualObject.intakeDayId).put({id: manualObject.intakeDayId});
    gun.get('users5').set(newUser);
    var newUser = gun.get('id' + manualObject.intakeDayId).get('intake').put({manualObject});
    gun.get('users5').set(newUser);
    alert('Your data has been saved, your recommended insulin dossage is: ' + manualObject.InsulinUnits)  
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
// Formule 1: Bereken hoeveel eenheden insuline je nodig hebt per gegeten koolhydraten.
function CarbohydrateCoverage( CHOMealGrams, UserTotalDailyInsulineDose)
{
    if (CHOMealGrams == 0 || UserTotalDailyInsulineDose == 0)
        return 0;//error

    //CHO = Carbohydrate
    var units = CHOMealGrams / CalculateCarbohydateRatio(UserTotalDailyInsulineDose);

    //returns the units of rapid acting insulin to cover the carbohydrate.
    return units;
}
// Formule 1b: Bereken wat je CHORatio is. 
function CalculateCarbohydateRatio(UserTotalDailyInsulineDose)
{
    //This can be calculated using the Rule of �500�: Carbohydrate Bolus Calculation

    if (UserTotalDailyInsulineDose == 0)
        return 0;//error
    var carbohydateCoverageRatio = Math.floor((500 / UserTotalDailyInsulineDose));     
    //returns the coverage ratio (1 unit insulin : carbohydateCoverageRatio)
    return carbohydateCoverageRatio;
}
// Formule 2: Hoge bloedsuiker correctie berekenen
function CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget)
{
    var bloodSugarDifference = CalculateTargetBloodSugarDifference(currentBloodSugar, bloodSugarTarget);

    // what is sugar correctionFactor? -Maurits
    // if (sugarCorrectionFactor == 0 || bloodSugarDifference == 0)
    if (bloodSugarDifference == 0)
        return 0;//error

    var correctionDose = bloodSugarDifference / CalculateHighBloodSugarCorrectionFactor(UserTotalDailyInsulineDose);

    //returns the units of rapid acting insulin
    return correctionDose;
}
// Formule 2b: Bloedsuiker verschill tussen doel en werkelijk berekenen.
function CalculateTargetBloodSugarDifference(currentBloodSugar , bloodSugarTarget)
{
    if (currentBloodSugar == 0 || bloodSugarTarget == 0)
        return 0;//error

    var bloodSugarDifference = currentBloodSugar - bloodSugarTarget;
    
    return bloodSugarDifference;
}

// Formule 2c: Correctie factor berekenen.
function CalculateHighBloodSugarCorrectionFactor(UserTotalDailyInsulineDose)
{
    //This can be calculated using the Rule of �1800�.

    if (UserTotalDailyInsulineDose == 0)
        return 0;//error

    var correctionFactor = 1800 / UserTotalDailyInsulineDose;

    //returns the correctionFactor that will reduce the blood sugar level
    return correctionFactor;
}

//Formule 3: Totale hoeveelheid insuline berekenen Door formule 1 en 2 te combineren.
function CalculateTotalMealtimeDose(CHOMealGrams, UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget)
{
    var totalMealDose = CarbohydrateCoverage(CHOMealGrams, UserTotalDailyInsulineDose) + CalculateHighBloodSugarCorrection(UserTotalDailyInsulineDose, currentBloodSugar, bloodSugarTarget);
    totalMealDose = Math.ceil(totalMealDose);
    console.log(totalMealDose);
    return totalMealDose;
}

// Formule 4: Bereken wat je TDI(totale dagelijkse insuline dosering). 
function  CalculateDailyInsulinDoseRequirement(UserTotalKilogramWeight, BasalBackgroundPercentage = 100)
{
    if (UserTotalKilogramWeight == 0 || BasalBackgroundPercentage == 0)
        return 0;//error

    var UserTotalDailyInsulineDose = ((0.55 * UserTotalKilogramWeight) * BasalBackgroundPercentage)/100;
    return UserTotalDailyInsulineDose;
}