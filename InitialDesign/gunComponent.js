import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Gun from 'gun/gun.js' // or use the minified version 'gun/gun.min.js'
const gun = new Gun('https://diabetesappfontysgroep3.herokuapp.com/gun') // or use your own GUN server
//Component.prototype.$gun = gun

export default class CustomGun extends React.Component { 

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
        <TextInput 
          style={{ border: "1px solid black", padding: '5px' }}
        value={this.state.text}
          onChangeText={(text) => this.setState({text})} 
        />
        <Button title='Update' 
          onPress={()=>{
            this.$hello.put({name:this.state.text})
            this.setState({text:''})}}
        />
      </View>
    );
  }  
}
