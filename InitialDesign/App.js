/// File and component importing
import React, { Component, useState } from 'react';
import { Button, View, Text, TextInput, Image, TouchableHighlight  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Insuline functions
import * as insulineFile from './InsulinFactory'
// import * as testFile from './insuline'
// Calendar functions
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import * as calendarFile from './calendar';
import CustomCalendarComponent from "./customCalendarComponent";
//import { Value } from 'react-native-reanimated';

///variables and constants

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
  const [text, setText] = useState('');
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
      <Text>Login Screen Input enzo</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) 
{
  const [weightVar, setWeightVar] = useState('');
  const [sugarVar, setSugarVar] = useState('');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
    <Text>Instellingen</Text>
    <br></br> 
    <br></br>
    <Text>Gewicht instellen</Text>
    <TextInput
      style={{height: 40}}
      placeholder={insulineFile.getWeight()}
      onChangeText={weightVar => setWeightVar(weightVar)}
      defaultValue={weightVar}
    />
    <br></br>

    <Text>Bloedsuikerspiegel doel</Text>
    <TextInput
      style={{height: 40}}
      placeholder={insulineFile.getSugar()}
      onChangeText={sugarVar => setSugarVar(sugarVar)}
      defaultValue={sugarVar}
    />
        <br></br>
    <Button
      title="Opslaan instellingen"
      onPress={() => { insulineFile.setWeight(weightVar); insulineFile.setSugar(sugarVar); navigation.navigate('Home') }} 
    />
    <Button
      title="Annuleren"
      onPress={() => navigation.navigate('Home')}
    />
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
// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
// import Constants from 'expo-constants';

// const DATA = [  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'JoJo', Author: 'Doctor' },
//                 { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Bier', Author: 'Patient'},
//                 { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item', Author: 'Doctor'},
//                 { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: '4de Item', Author: 'Doctor'},
//                 { id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Wat een lang bericht zeg, zo hé Item', Author: 'Doctor'}
// ];

// function Item({ title, Author, id}) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title + styles.Author}>{title}</Text>
//       <Text style={styles.Author}>{Author}</Text>
//       <Text style={styles.id}>{id}</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem = {
//           ({ item }) => <Item 
//                           title={item.title}
//                           Author={item.Author}
//                           id={item.id}
//                         /> 
//         }
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: Constants.statusBarHeight,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//     backgroundColor: 'black',
//   },
//   Author: {
//     fontSize: 14,
//   },
//   id: {
//     fontSize: 8,
//   },
// });