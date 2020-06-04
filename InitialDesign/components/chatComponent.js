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
      message: getMessage()
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
            this.$message.put({message:this.state.textBoxMessage})
            this.setState({textBoxMessage:''})
          }}
        />
      </View>
    );
  }  
}

var message;

function setMessage(data)
{
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