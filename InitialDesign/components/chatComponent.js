import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 

export default class ChatComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      text: 'What is your name?',
      textBoxMessage: 'Typ jouw bericht hier',
      name: '',
      message: getMessage(),
      messagesObject: getMessages()
    }

    this.$hello = this.$gun.get('hello')
    let _this = this
    this.$hello.on(function(data, key) {
      let name = data.name
      _this.setState({name:name})
    })

    this.$message = this.$gun.get('user').get('chat').get('message')
    this.$message.on(function(data, key) {
      let message = data.message
      _this.setState({message:message})
      _this.setState({messagesObject:getMessages()})
    })
  }

  render() { 
    return (
       
      <View>
        <Text>
          Hello {this.state.name}
        </Text>
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
          onChangeText={(text) => this.setState({text})} 
        />
        <Button title='Update' 
          onPress={()=>{
            this.$hello.put({name:this.state.text})
            this.setState({text:''})
          }}
        />
        
        <Text>
          Message {this.state.message}
        </Text>
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
        <Button title='Update' 
          onPress={()=>{
            //this.$message.put({message:this.state.textBoxMessage})
            setMessage(this.state.textBoxMessage);
            this.setState({textBoxMessage:''})
          }}
        />

        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title + "  -  " + item.id} />}
          keyExtractor={item => item.id}
        />
      </View>
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

var DATA = [
  {
    id: 'test',
    title: 'First Item',
  }
];

var message;

function setMessage(data)
{
  console.log(data);

    if(data){
        //sugarSetting.set(data);
        gun.get('user').get('chat').get('message').set(data);
    }
}

function getMessage()
{
    gun.get('user').get('chat').get('message').on(function(item, id){
        message = item[Object.keys(item)[Object.keys(item).length - 1]]
    })
    return message
}

function getMessages()
{
  DATA = [];
  gun.get('user').get('chat').get('message').map().on(function(item, id){
    

    var messageObject  = {
      id: id,
      title: item,
    }
      
      DATA.push(messageObject);
  })
  //console.log(gun.get('user').get('chat').get('message'));
  //console.log(DATA);
  return DATA
}