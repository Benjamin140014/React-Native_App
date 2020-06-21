import React from 'react' ;
import {Text , View } from 'react-native' ;
import Speedometer from 'react-native-speedometer-chart';


var count ; 
setInterval(() => {
    count = 150 - Math.random()*150
}, 1000);

export default class Gauge extends React.Component{
 constructor(props){
     super(props)
     this.state = {
         jsonData: 10
     }
 }
 componentDidMount(){
    setInterval(() => {
        fetch('http://192.168.1.100:3000/api/get/random', {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            jsonData: json.value,
          });
        })
        .catch(error => {
          console.log(error);
        });
      }, 1000);
 }
    render(){
        return(
            <Speedometer
            value={this.state.jsonData}
            totalValue={100}
            size={250}
            outerColor="#d3d3d3"
            internalColor="blue"
            showText
            text= "Gauge"
            textStyle={{ color: 'green' }}
            showLabels
            labelStyle={{ color: 'blue' }}
            labelFormatter={number => `${number}`}
            showPercent
            percentStyle={{ color: 'red' }}
          />
        )
    }
}
