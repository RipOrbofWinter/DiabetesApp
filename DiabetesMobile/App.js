import React, { Component } from 'react';
import Gun from 'gun/gun.js';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';

const gun = new Gun("https://diabetesappfontysgroep3.herokuapp.com/gun") // or use your own GUN server
Component.prototype.$gun = gun

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {
// export default class App extends Component<Props> {
  
  constructor(props){
    super(props)
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
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hello {this.state.name}
      </Text>
      <TextInput value={this.state.text}
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