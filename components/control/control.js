import React, { Component } from 'react'
import { View, Button, Text, StyleSheet, TouchableOpacity, ActivityIndicator  , TextInput, ScrollView, Alert, Dimensions, Image, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ModalPump1 from './Modals/ModalPump1_2' ; 
import MainPanel from './MainPanel/MainPanel' ; 
import ModalPump2 from './Modals/ModalPump3_4' ; 
import ModalPump5 from './Modals/ModalPump5' ;
import PanelTank from './panelTank/panelTank' ;
import io from 'socket.io-client';
import Spinner from 'react-native-loading-spinner-overlay';
const {width: WIDTH , height: HEIGHT} = Dimensions.get('window');
export default class control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusRun: false ,
      statusStop: false,
      statusError: false ,
      spinner: false
    }
  }
  Refresh = () =>{
    this.socket = io('http://180.214.236.174:4000');
    this.socket.emit('loadData', 'refresh') ; 
    this.setState({
      spinner: true
    });
  }
  componentDidMount(){
    this.socket = io('http://180.214.236.174:4000');
    this.socket.on('loadDataControl',(data)=>{
      if(data[52].value){
        this.setState({statusRun: true}); 
        this.setState({statusStop: false}); 
        this.setState({statusError: false}); 
      }
      if(data[53].value){
        this.setState({statusRun: false}); 
        this.setState({statusStop: true}); 
        this.setState({statusError: false}); 
      }
      if(data[54].value){
        this.setState({statusRun: false}); 
        this.setState({statusStop: false}); 
        this.setState({statusError: true}); 
      }
    }) ; 
    this.socket.on('hasBeenLoad',(data)=>{
      this.setState({
        spinner: false
      });
    });
    this.socket.on('noConnection',(data)=>{
      Alert.alert(data) ;
      this.setState({
        spinner: false
      });
    })
  }
  render() {
    return (
      <View style={styles.dashboardContainer}>
         <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <ScrollView>
          <Text style={styles.dashboardNabar} > Control Panel </Text>
          <Text style= {[styles.statusSystemRun , {backgroundColor: this.state.statusRun ? 'green':'lavender'}]} ></Text> 
          <Text style= {[styles.statusSystemStop , {backgroundColor: this.state.statusStop ? 'red':'lavender'}]} ></Text> 
          <Text style= {[styles.statusSystemError , {backgroundColor: this.state.statusError ? 'yellow':'lavender'}]} ></Text>
          <TouchableOpacity style = {styles.reload} onPress = {this.Refresh}>
          <Ionicons name="md-refresh-circle" size={46} style = {{color: 'green'}} ></Ionicons>
          </TouchableOpacity>
        <View style = {styles.containerMain}>
        < MainPanel/>
        < ModalPump1 />
        < ModalPump2 />
        < ModalPump5 />
        < PanelTank />
        </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  isloading:{
    position: 'absolute',
    left: WIDTH - WIDTH/2 -18, top: HEIGHT - HEIGHT/2 -75
  },
  dashboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkgray'
  },
  dashboardNabar: {
    position: 'absolute',
    left: 0, right: 0,
    backgroundColor: 'steelblue',
    padding: 10,
    textAlign: 'center',
    fontSize: 20 ,
    fontWeight: 'bold' ,
  },
  containerMain:{
    flex: 1,
    width: WIDTH,
    marginTop: 30,
    height: HEIGHT ,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    
  },
  statusSystemRun:{
    position: 'absolute',
    left: WIDTH-100, top: 15,
    backgroundColor: 'green',
    width: 20,
   height: 20,
   borderRadius: 44/2
  },
  statusSystemStop:{
    position: 'absolute',
    left: WIDTH-70, top: 15,
    backgroundColor: 'red',
    width: 20,
   height: 20,
   borderRadius: 44/2
  },
  statusSystemError:{
    position: 'absolute',
    left: WIDTH-40, top: 15,
    backgroundColor: 'blue',
    width: 20,
   height: 20,
   borderRadius: 44/2
  } , 
  reload:{
    position: 'absolute',
    left: 17, top: 50
  } ,
  spinnerTextStyle: {
    color: '#FFF'
  }
})
