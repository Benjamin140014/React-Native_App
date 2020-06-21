import React from 'react';
import {View, Text ,Alert , TextInput} from 'react-native';
import { Slider, Input } from 'react-native-elements';
import { parse } from 'react-native-svg';

export default class slider extends React.Component {
    constructor(props){
        super(props) ;
        this.state = { data: 0  , nameVariable: ''}
    }
   
  
  UpdateValue = (text)=>{
   this.setState({data: parseInt(text)})
    fetch('http://169.254.89.32:5000/api/post/', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: this.state.data
      }),
     })
    .then((responseJson) => {
      console.log('Write okela')
    })
    .catch((error) => {
     console.error(error)
    })
  }
  handlerChange = (e) =>{
      this.setState({data: e})
      console.log('ok')
      fetch('http://192.168.1.100:3000/api/post', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: this.state.data , nameVariable : this.state.nameVariable , dataType : 'Float'
          , device: 'PLC1'
        }),
       })
      .then((responseJson) => {
        console.log('Write okela')
      })
      .catch((error) => {
       console.error(error)
      }) ; 
  }
    
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center' , height: 50 , width: 200}}>
         <Slider
         maximumValue = {10}
         minimumValue= {0}
         step= {1}
         value={this.state.data}
         onValueChange={this.UpdateValue}
        />
        <Text>Value: {this.state.data}</Text> 
      </View>
    );
  }
}
