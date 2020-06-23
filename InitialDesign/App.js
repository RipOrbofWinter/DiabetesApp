/// File and component importing
import React, { Component, useState } from 'react';
import { Button, View, ScrollView, Text, TextInput, Image, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Insuline functions
import NewInsulinComponent from "./components/insulinNewComponenet";
// import * as insulineFile from './components/insulinComponent'
import SettingsComponent from './components/settingsComponent'
// Calendar functions
import CustomCalendarComponent from "./components/customCalendarComponent";
import ChatComponent from "./components/chatComponent";
// Gun Import
 import Gun from 'gun/gun.js' // or use the minified version 'gun/gun.min.js'

///variables and constants
// var gun = new Gun('http://gunjs.herokuapp.com/gun')

//Gun Code
 const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun')
 Component.prototype.$gun = gun

/// Pages
function HomeScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <Text>Home Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
      <TouchableHighlight 
        onPress={() => navigation.navigate('Settings')}>
        <Image 
          source={ require('./assets/settings_icon.png')}
          style={{ height:50, width:50}} />
      </TouchableHighlight>
      {/* <Text>{ insulineFile.ReturnValue("Test value!") }</Text> */}
    </View>
  );
}

function RegisterScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}


function LoginScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen Input enzo</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button
        title="Login"
      />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Further into the Matrix"
        onPress={() => navigation.push('Login')}
        style={{ top: 20}}
      />
    </View>
  );
}

function InsulineScreen({ navigation }) 
{
  return (
  <View>
    <NewInsulinComponent navigation={navigation}/>
  </View>
  );
}

function CalendarScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <CustomCalendarComponent navigation={navigation}/>
    </View>
  );
}

function InsulinListScreen({ route, navigation }) 
{
  const { currentDay } = route.params;
  const { currentMonth } = route.params;
  const { currentYear } = route.params;
  const { currentDoses } = route.params;

  var InsulinList = [];

  for(var i=0; i < currentDoses; i++)
  {
    var title = "inname " + (i + 1);
    InsulinList[i] = <Button title={title} onPress= {() => navigation.navigate("Insuline", i)}/>;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Date: {currentDay}-{currentMonth}-{currentYear}</Text>
      {InsulinList}
    </View>
  );
}
function ChatScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ChatComponent />
    </View>
  );
}

function SettingsScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SettingsComponent navigation={navigation}/>
    </View>
  );
}



/// Navigation/ route file
const HomeStack = createStackNavigator(); //Home Stack

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}
        // options={{
        //   headerRight: () =>
        //   (
        //     <Button
        //       onPress={() => alert('This is a button!')}
        //       title="Info"
        //       color="#fff"
        //    /> 
        //   ),
        // }}
        />            
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegisterScreen} />
      <HomeStack.Screen name="Settings" component={SettingsScreen} />
    </HomeStack.Navigator>
  );
}

const InsulineStack = createStackNavigator(); //Insuline Stack

function InsulineStackScreen() {
  return (
    <InsulineStack.Navigator>
      <InsulineStack.Screen name="Insuline" component={InsulineScreen} />
    </InsulineStack.Navigator>
  );
}

const CalendarStack = createStackNavigator(); //Calendar Stack

function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="Calendar" component={CalendarScreen} /> 
      <ChatStack.Screen name="InsulinList" component={InsulinListScreen} />            
    </CalendarStack.Navigator>
  );
}

const ChatStack = createStackNavigator(); //Chat Stack

function ChatStackScreen() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={ChatScreen} />             
      <ChatStack.Screen name="Login" component={LoginScreen} />
    </ChatStack.Navigator>
  );
}

//Bottom Navigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Insuline" component={InsulineStackScreen} />
      <Tab.Screen name="Calendar" component={CalendarStackScreen} />
      <Tab.Screen name="Chat" component={ChatStackScreen} />
    </Tab.Navigator>
  );
}

//
function App({ navigation }) 
{

  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

export default App;