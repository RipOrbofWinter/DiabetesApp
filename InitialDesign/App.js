import * as React from 'react';
import { Button, View, Text, TextInput  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import * as insulineFile from './insuline'
import * as insulineFile from './InsulinFactory'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import * as calendarFile from './calendar';

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
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text id="testImportFunction">{ insulineFile.CalculateDailyInsulinDoseRequirement(80) }</Text>
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="External JS"
        // onPress={() => insulineFile.AlertBox("test")}
      />

    </View>
  );
}

function CalendarScreen({ navigation }) 
{
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markedDates={calendarFile.ReturnValue()}
        onDayPress={(day) => {CalendarDaySelectHandler(day) + console.log(calendarFile.ReturnValue)}}
      />
      <View>
        <Text>Geselecteerde datum</Text>
        <Text>Inname 1</Text>
        <Text>Inname 2</Text>
        <Text>Inname 3</Text>
      </View>
    </View>
  );
}

function CalendarDaySelectHandler(day)
{

  console.log('selected day', day)
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

const HomeStack = createStackNavigator(); //Home Stack

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />             
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegisterScreen} />
    </HomeStack.Navigator>
  );
}

const InsulineStack = createStackNavigator(); //Insuline Stack

function InsulineStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Insuline" component={InsulineScreen} />
    </HomeStack.Navigator>
  );
}

const CalendarStack = createStackNavigator(); //Calendar Stack

function CalendarStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Calendar" component={CalendarScreen} />             
    </HomeStack.Navigator>
  );
}

const ChatStack = createStackNavigator(); //Chat Stack

function ChatStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Chat" component={ChatScreen} />             
      <HomeStack.Screen name="Login" component={LoginScreen} />
    </HomeStack.Navigator>
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