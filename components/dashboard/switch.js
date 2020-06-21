import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

export default class ButtonSwitch extends React.Component{
  constructor(props){
      super(props) 
      this.state = {
          isEnabled: false 
      }
  }
  toggleSwitch = ()=>{
     this.setState({isEnabled: !this.state.isEnabled })
  }
  render(){
    return(
        <View style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={this.toggleSwitch}
          value={this.state.isEnabled}
        />
      </View> 
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
