import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";
import Gun from 'gun/gun.js' 
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') 

export default class ChatComponent extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      text: 'What is your name?',
      name: ''
    }
    this.$hello = this.$gun.get('hello')
    let _this = this
    this.$hello.on(function(data, key) {
      let name=data.name
      _this.setState({name:name})
    })
  }

  render() { 
    return (
       
      <View>
        <Text>
          Hello {this.state.name}
        </Text>
        <Text>
          Message {getMessage()}
        </Text>
        <TextInput 
          style={{ border: "1px solid black", padding: '5px' }}
        value={this.state.text}
          onChangeText={(text) => this.setState({text})} 
        />
        <Button title='Update' 
          onPress={()=>{
            this.$hello.put({name:this.state.text})
            this.setState({text:''})
            setMessage(this.state.text);
          
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