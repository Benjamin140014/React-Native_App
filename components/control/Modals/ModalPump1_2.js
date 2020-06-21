import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { color } from 'react-native-reanimated';
import { colors } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

var checkState = {run1_1: false , error1_1: false , 
  run1_2: false , error1_2: false ,
  overload_1: false ,
  run2_1: false , error2_1: false , 
  run2_2: false , error2_2: false ,
  overload_2: false} ;
var allVariableGet = [
  'pmp1_Auto-Man',
  'pmp1_Motor1_Run',
  'pmp1_Motor2_Run' , 
  'Pump1_1_Run' ,
  'Pump1_1_Err' ,
  'Pump1_1_RPM' ,
  'Pump1_2_Run' ,
  'Pump1_2_Err' ,
  'Pump1_2_RPM' ,
  'OverLoad_1' ,
   
  'pmp2_Auto-Man',
  'pmp2_Motor1_Run',
  'pmp2_Motor2_Run' , 
  'Pump2_1_Run' ,
  'Pump2_1_Err' ,
  'Pump2_1_RPM' ,
  'Pump2_2_Run' ,
  'Pump2_2_Err' ,
  'Pump2_2_RPM' ,
  'OverLoad_2' ,
] ; 
const {width: WIDTH} = Dimensions.get('window');
export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisiblePump1: false,
      isModalVisiblePump2: false , 
      // out modal
      imageStatusPump1_1: require('../../../image/Pump_047.png'),
      imageStatusPump1_2: require('../../../image/Pump_047.png'), 

      imageStatusPump2_1: require('../../../image/Pump_047.png'),
      imageStatusPump2_2: require('../../../image/Pump_047.png'),

      TextStatusPump1_1: 'status',
      TextStatusPump1_2: 'status', 

      TextStatusPump2_1: 'status',
      TextStatusPump2_2: 'status',

      // in modal 
      colorButtonManAutoPump1: false, 
      colorButtonManAutoPump2: false, 

      colorButtonStartStopPump1_1: false, 
      colorButtonStartStopPump1_2: false, 

      colorButtonStartStopPump2_1: false, 
      colorButtonStartStopPump2_2: false, 
       
      readRPM1_1: 0 , 
      readRPM1_2: 0 , 
      readRPM2_1: 0 , 
      readRPM2_2: 0 , 

      colorTextPump1_1: false ,
      colorTextPump1_2: false ,
      colorTextPump2_1: false ,
      colorTextPump2_2: false ,
      
      timeHourPump1_1 : 0 , 
      timeMinutePump1_1 : 0 , 
      timeHourPump1_2 : 0 , 
      timeMinutePump1_2 : 0 , 
      timeHourPump2_1 : 0 , 
      timeMinutePump2_1 : 0 , 
      timeHourPump2_2 : 0 , 
      timeMinutePump2_2 : 0 , 

      RPM1_1 : 100 , 
      RPM1_2 : 100 , 
      RPM2_1 : 100 , 
      RPM2_2 : 100 , 
    };
  }
  toggleModal1 = () => {
    this.setState({isModalVisiblePump1: !this.state.isModalVisiblePump1});
  };
  toggleModal2 = () => {
    this.setState({isModalVisiblePump2: !this.state.isModalVisiblePump2});
  };
   // get Api
   getApi = (namevariable) => {
    fetch(`http://192.168.1.100:3000/api/get/${namevariable}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => { 
          // color pump1 
          if(namevariable === 'pmp1_Auto-Man'){
            this.setState({colorButtonManAutoPump1: json.value}) ;
          }
           if(namevariable === 'pmp1_Motor1_Run'){
            this.setState({colorButtonStartStopPump1_1: json.value}) ; 
           }
           if(namevariable === 'pmp1_Motor2_Run'){
            this.setState({colorButtonStartStopPump1_2: json.value}) ; 
           }

           if(namevariable === 'pmp2_Auto-Man'){
            this.setState({colorButtonManAutoPump2: json.value}) ;
           }
           if(namevariable === 'pmp2_Motor1_Run'){
            this.setState({colorButtonStartStopPump2_1: json.value}) ; 
           }
           if(namevariable === 'pmp2_Motor2_Run'){
            this.setState({colorButtonStartStopPump2_2: json.value}) ; 
           }
           if(namevariable === 'Pump1_1_RPM'){
            this.setState({readRPM1_1: json.value});  
           }
           if(namevariable === 'Pump1_2_RPM'){
            this.setState({readRPM1_2: json.value});  
           }
           if(namevariable === 'Pump2_1_RPM'){
            this.setState({readRPM2_1: json.value});  
           }
           if(namevariable === 'Pump2_2_RPM'){
            this.setState({readRPM2_2: json.value});  
           }
           // pump1_1
           if(namevariable === 'Pump1_1_Run'){
             if(json.value === true){
              this.setState({TextStatusPump1_1 : 'RUN'}) ;
              this.setState({colorTextPump1_1: true}) ; 
              this.setState({imageStatusPump1_1 : require('../../../image/Pump_048.png')}) ;
              checkState.run1_1 = true ;
             }else{
               checkState.run1_1 = false ; 
             }
           }
           if(namevariable === 'Pump1_1_Err'){
            if(json.value === true){
              this.setState({TextStatusPump1_1 : 'ERROR'}) ;
              this.setState({colorTextPump1_1: false}) ; 
              this.setState({imageStatusPump1_1 : require('../../../image/Pump_049.png')}) ;
              checkState.error1_1 = true
             }else{
               checkState.error1_1 = false
             }
           }
           if(checkState.run1_1 === false && checkState.error1_1 === false && checkState.overload_1 ===false){
            this.setState({TextStatusPump1_1 : 'OFF'}) ;
            this.setState({colorTextPump1_1: false}) ; 
            this.setState({imageStatusPump1_1 : require('../../../image/Pump_047.png')}) ;
           }
           // pump1_2 
           if(namevariable === 'Pump1_2_Run'){
            if(json.value === true){
             this.setState({TextStatusPump1_2 : 'RUN'}) ;
             this.setState({colorTextPump1_2: true}) ; 
             this.setState({imageStatusPump1_2 : require('../../../image/Pump_048.png')}) ;
             checkState.run1_2 = true ;
            }else{
              checkState.run1_2 = false ; 
            }
          }
          if(namevariable === 'Pump1_2_Err'){
           if(json.value === true){
             this.setState({TextStatusPump1_2 : 'ERROR'}) ;
             this.setState({colorTextPump1_2: false}) ; 
             this.setState({imageStatusPump1_2 : require('../../../image/Pump_049.png')}) ;
             checkState.error1_2 = true
            }else{
              checkState.error1_2 = false
            }
          }
          if(checkState.run1_2 === false && checkState.error1_2 === false && checkState.overload_1 ===false){
           this.setState({TextStatusPump1_2 : 'OFF'}) ;
           this.setState({colorTextPump1_2: false}) ; 
           this.setState({imageStatusPump1_2 : require('../../../image/Pump_047.png')}) ;
          }
          // overload 1
          if(namevariable === 'OverLoad_1'){
            if(json.value === true){
              this.setState({TextStatusPump1_1 : 'Overload'}) ;
              this.setState({colorTextPump1_1: false}) ; 
              this.setState({imageStatusPump1_1 : require('../../../image/Pump_049.png')}) ;
              this.setState({TextStatusPump1_2 : 'Overload'}) ;
              this.setState({colorTextPump1_2: false}) ; 
              this.setState({imageStatusPump1_2 : require('../../../image/Pump_049.png')}) ;
              checkState.overload_1 = true ; 
             }else{
               checkState.overload_1 = false ; 
             }
           }
           //pump2_1
           if(namevariable === 'Pump2_1_Run'){
            if(json.value === true){
             this.setState({TextStatusPump2_1 : 'RUN'}) ;
             this.setState({colorTextPump2_1: true}) ; 
             this.setState({imageStatusPump2_1 : require('../../../image/Pump_048.png')}) ;
             checkState.run2_1 = true ;
            }else{
              checkState.run2_1 = false ; 
            }
          }
          if(namevariable === 'Pump2_1_Err'){
           if(json.value === true){
             this.setState({TextStatusPump2_1 : 'ERROR'}) ;
             this.setState({colorTextPump2_1: false}) ; 
             this.setState({imageStatusPump2_1 : require('../../../image/Pump_049.png')}) ;
             checkState.error2_1 = true
            }else{
              checkState.error2_1 = false
            }
          }
          if(checkState.run2_1 === false && checkState.error2_1 === false && checkState.overload_2 ===false){
           this.setState({TextStatusPump2_1 : 'OFF'}) ;
           this.setState({colorTextPump2_1: false}) ; 
           this.setState({imageStatusPump2_1 : require('../../../image/Pump_047.png')}) ;
          }
          // pump2_2
          if(namevariable === 'Pump2_2_Run'){
            if(json.value === true){
             this.setState({TextStatusPump2_2 : 'RUN'}) ;
             this.setState({colorTextPump2_2: true}) ; 
             this.setState({imageStatusPump2_2 : require('../../../image/Pump_048.png')}) ;
             checkState.run2_2 = true ;
            }else{
              checkState.run2_2 = false ; 
            }
          }
          if(namevariable === 'Pump2_2_Err'){
           if(json.value === true){
             this.setState({TextStatusPump2_2 : 'ERROR'}) ;
             this.setState({colorTextPump2_2: false}) ; 
             this.setState({imageStatusPump2_2 : require('../../../image/Pump_049.png')}) ;
             checkState.error2_2 = true
            }else{
              checkState.error2_2 = false
            }
          }
          if(checkState.run2_2 === false && checkState.error2_2 === false && checkState.overload_2 ===false){
           this.setState({TextStatusPump2_2 : 'OFF'}) ;
           this.setState({colorTextPump2_2: false}) ; 
           this.setState({imageStatusPump2_2 : require('../../../image/Pump_047.png')}) ;
          }
           // overload 2
           if(namevariable === 'OverLoad_2'){
            if(json.value === true){
              this.setState({TextStatusPump2_1 : 'Overload'}) ;
              this.setState({colorTextPump2_1: false}) ; 
              this.setState({imageStatusPump2_1 : require('../../../image/Pump_049.png')}) ;
              this.setState({TextStatusPump2_2 : 'Overload'}) ;
              this.setState({colorTextPump2_2: false}) ; 
              this.setState({imageStatusPump2_2 : require('../../../image/Pump_049.png')}) ;
              checkState.overload_2 = true ; 
             }else{
               checkState.overload_2 = false ; 
             }
           }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // post Api
  postApi = (nameDevice, nameVariable, value, dataType) => {
    fetch(`http://192.168.1.100:3000/api/post/${nameVariable}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device: nameDevice,
        nameVariable: nameVariable,
        dataType: dataType,
        value: value,
      }),
    })
      .then(responseJson => {
        console.log('Write okela !');
      })
      .catch(error => {
        console.error(error);
      });
  };
 //pump1 
  pressAutoPump1 = () =>{
    this.postApi('PLC1', 'pmp1_Auto-Man_In', true, 'Boolean');
  } ; 
  pressManPump1 = () =>{
    this.postApi('PLC1', 'pmp1_Auto-Man_In', false, 'Boolean');
  }; 
  ConfirmPump1 = () =>{
    this.postApi('PLC1', 'pmp1_Confirm1', true, 'Boolean');
    this.postApi('PLC1', 'pmp1_Confirm2', true, 'Boolean');
    setTimeout(() => {
      this.postApi('PLC1', 'pmp1_Confirm1', false, 'Boolean');
      this.postApi('PLC1', 'pmp1_Confirm2', false, 'Boolean');
    }, 500);
  }
  pressStartPump1_1 = ()=>{
    this.postApi('PLC1', 'pmp1_Start-Stop_Motor1', true, 'Boolean');
  } ; 
  pressStopPump1_1 = ()=>{
    this.postApi('PLC1', 'pmp1_Start-Stop_Motor1', false, 'Boolean');
  } ; 

  pressStartPump1_2 = () =>{
    this.postApi('PLC1', 'pmp1_Start-Stop_Motor2', true, 'Boolean');
  } ;
  pressStopPump1_2 = () =>{
    this.postApi('PLC1', 'pmp1_Start-Stop_Motor2', false, 'Boolean');
  }; 

  applyAllInputPump1 = ()=>{
    this.postApi('PLC1', 'pmp1_TimeSet1h', this.state.timeHourPump1_1, 'UInt16');
    this.postApi('PLC1', 'pmp1_TimeSet1m',  this.state.timeMinutePump1_1, 'UInt16');
    this.postApi('PLC1', 'pmp1_TimeSet2h',  this.state.timeHourPump1_2, 'UInt16');
    this.postApi('PLC1', 'pmp1_TimeSet2m',  this.state.timeMinutePump1_2, 'UInt16');
    this.postApi('PLC1', 'pmp1_W1',  this.state.RPM1_1, 'Int16');
    this.postApi('PLC1', 'pmp1_W2',  this.state.RPM1_2, 'Int16');
  } ; 

  // pump 2
  pressAutoPump2 = ()=>{
    this.postApi('PLC1', 'pmp2_Auto-Man_In', true, 'Boolean');
  } ; 
  pressManPump2 = () =>{
    this.postApi('PLC1', 'pmp2_Auto-Man_In', false, 'Boolean');
  } ; 
  ConfirmPump2 = () =>{
    this.postApi('PLC1', 'pmp2_Confirm1', true, 'Boolean');
    this.postApi('PLC1', 'pmp2_Confirm2', true, 'Boolean');
    setTimeout(() => {
      this.postApi('PLC1', 'pmp2_Confirm1', false, 'Boolean');
      this.postApi('PLC1', 'pmp2_Confirm2', false, 'Boolean');
    }, 500);
  }
  pressStartPump2_1 = () =>{
    this.postApi('PLC1', 'pmp2_Start-Stop_Motor1', true, 'Boolean');
  }; 
  pressStopPump2_1 = ()=>{
    this.postApi('PLC1', 'pmp2_Start-Stop_Motor1', false, 'Boolean');
  } ; 

  pressStartPump2_2 = ()=>{
    this.postApi('PLC1', 'pmp2_Start-Stop_Motor2', true, 'Boolean');
  } ; 
  pressStopPump2_2 = ()=>{
    this.postApi('PLC1', 'pmp2_Start-Stop_Motor2', false, 'Boolean');
  } ; 
  
  applyAllInputPump2 = ()=>{
    this.postApi('PLC1', 'pmp2_TimeSet1h', this.state.timeHourPump2_1, 'UInt16');
    this.postApi('PLC1', 'pmp2_TimeSet1m',  this.state.timeMinutePump2_1, 'UInt16');
    this.postApi('PLC1', 'pmp2_TimeSet2h',  this.state.timeHourPump2_2, 'UInt16');
    this.postApi('PLC1', 'pmp2_TimeSet2m',  this.state.timeMinutePump2_2, 'UInt16');
    this.postApi('PLC1', 'pmp2_W1',  this.state.RPM2_1, 'Int16');
    this.postApi('PLC1', 'pmp2_W2',  this.state.RPM2_2, 'Int16');
  }
  // get api color 
  componentDidMount(){
  //  setInterval(() => {
  //    for(let i=0 ; i < allVariableGet.length ; i++){
  //    this.getApi(allVariableGet[i])
  //    }  
  //  }, 2000);

  }
  render() {
    return (
      <View style={styles.pump12Panel}>

        <Modal isVisible={this.state.isModalVisiblePump1}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Button title="Close" onPress={this.toggleModal1} />
            <View style={styles.containerModal}>
              <View style={styles.columMainModal}>
                <View style={styles.pump1_1}>
                  <Image source={this.state.imageStatusPump1_1} style={styles.pump1_1} />
                </View>
                <View style={styles.pump1_2}>
                  <Image source={this.state.imageStatusPump1_2} style={styles.pump1_2} />
                </View>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump1 ? 'blue':'steelblue'}]}
                 onPress = {this.pressAutoPump1}
                  >
                  <Text>Auto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressManPump1}
                  >
        
                  <Text>Man</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity style={styles.button2} onPress = {this.ConfirmPump1} >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, ,  {backgroundColor: this.state.colorButtonStartStopPump1_1 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_1}
                  >
                  <Text>Start 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1,  {backgroundColor: this.state.colorButtonStartStopPump1_2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_2}
                  >
                  <Text>Start 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonStartStopPump1_1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_1}
                  >
                  <Text>Stop 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, ,  {backgroundColor: this.state.colorButtonStartStopPump1_2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_2}
                  >
                  <Text>Stop 2</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columTextModal}>
                <Text> Time Set Pump1_1</Text>
                <Text> Time Set Pump1_2</Text>
              </View>
              <View style={styles.columInputModal}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="hour"
                  placeholderTextColor="#60605e"  
                  keyboardType={'numeric'} 
                  onChangeText = {(val)=>{this.state.timeHourPump1_1 = val}}
                />
                <Text style={{margin: 2}}>H</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="minute"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{this.state.timeMinutePump1_1 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}> M</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="hour"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{this.state.timeHourPump1_2 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}>H</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="minute"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{this.state.timeMinutePump1_2 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}>M</Text>
              </View>

              <View style={styles.columInputModal}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                  placeholder="RPM_1"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{this.state.RPM1_1 = val}}
                  keyboardType={'numeric'}
                />
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="RPM_2"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{this.state.RPM1_2 = val}}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.columInputModal}>
                <TouchableOpacity style={styles.buttonApply} onPress = {this.applyAllInputPump1} >
                  <Text>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.pump1Panel}>
          <Text style={styles.headerTab}> Control Pump 1 </Text>
          <View style={styles.textPump}>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump1_1 ? 'green': 'red'} ]}> {this.state.TextStatusPump1_1} </Text>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump1_2 ? 'green': 'red'} ]}> {this.state.TextStatusPump1_2} </Text>
          </View>
          <View style={styles.imagePump}>
            <View style={styles.pump1_1}>
              <Image source={this.state.imageStatusPump1_1} style={styles.pump1_1} />
            </View>
            <View style={styles.pump1_2}>
              <Image source={this.state.imageStatusPump1_2} style={styles.pump1_2} />
            </View>
          </View>

          <View style={styles.textPump}>
            <Text style={styles.RPMPump}> {this.state.readRPM1_1} rpm </Text>
            <Text style={styles.RPMPump}> {this.state.readRPM1_2} rpm </Text>
          </View>

          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.textButtonShow} onPress={this.toggleModal1}>
              Show Pump 1
            </Text>
          </TouchableOpacity>
        </View>

        {/* pump1_2 modal and panel  */ }
        <Modal isVisible={this.state.isModalVisiblePump2}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Button title="Close" onPress={this.toggleModal2} />
            <View style={styles.containerModal}>
              <View style={styles.columMainModal}>
                <View style={styles.pump1_1}>
                  <Image source={this.state.imageStatusPump2_1} style={styles.pump1_1} />
                </View>
                <View style={styles.pump1_2}>
                  <Image source={this.state.imageStatusPump2_2} style={styles.pump1_2} />
                </View>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, ,{backgroundColor: this.state.colorButtonManAutoPump2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressAutoPump2}
                  >
                  <Text>Auto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, ,{backgroundColor: this.state.colorButtonManAutoPump2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressManPump2}
                  >
                  <Text>Man</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity style={styles.button2} onPress = {this.ConfirmPump2} >
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump2_1 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump2_1}
                  >
                  <Text>Start 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump2_2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump2_2}
                  >
                  <Text>Start 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump2_1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump2_1}
                  >
                  <Text>Stop 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump2_2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump2_2}
                  >
                  <Text>Stop 2</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columTextModal}>
                <Text> Time Set Pump2_1</Text>
                <Text> Time Set Pump2_2</Text>
              </View>

              <View style={styles.columInputModal}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="hour"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.timeHourPump2_1 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}>H</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="minute"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.timeMinutePump2_1 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}> M</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="hour"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.timeHourPump2_2 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}>H</Text>

                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 2,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="minute"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.timeMinutePump2_2 = val}}
                  keyboardType={'numeric'}
                />
                <Text style={{margin: 2}}>M</Text>
              </View>

              <View style={styles.columInputModal}>
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                    marginRight: 12,
                  }}
                  placeholder="RPM_1"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.RPM2_1 = val}}
                  keyboardType={'numeric'}
                />
                <TextInput
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#dde8c9',
                    borderRadius: 10,
                  }}
                  placeholder="RPM_2"
                  placeholderTextColor="#60605e"
                  onChangeText = {(val)=>{ this.state.RPM2_2 = val}}
                  keyboardType={'numeric'}
                />
              </View>
              <View style={styles.columInputModal}>
                <TouchableOpacity style={styles.buttonApply} onPress = {this.applyAllInputPump2} >
                  <Text>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

     
        <View style={styles.pump1Panel}>
          <Text style={styles.headerTab}> Control Pump 2 </Text>
          <View style={styles.textPump}>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump2_1 ? 'green': 'red'} ]}> {this.state.TextStatusPump2_1} </Text>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump2_2 ? 'green': 'red'} ]}> {this.state.TextStatusPump2_2} </Text>
          </View>
          <View style={styles.imagePump}>
            <View style={styles.pump1_1}>
              <Image source={this.state.imageStatusPump2_1} style={styles.pump1_1} />
            </View>
            <View style={styles.pump1_2}>
              <Image source={this.state.imageStatusPump2_2} style={styles.pump1_2} />
            </View>
          </View>
          <View style={styles.textPump}>
            <Text style={styles.RPMPump}> {this.state.readRPM2_1} rpm </Text>
            <Text style={styles.RPMPump}> {this.state.readRPM2_2} rpm</Text>
          </View>

          <TouchableOpacity style={styles.buttonShow} onPress = { this.toggleModal2}>
            <Text>Show Pump 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  buttonApply: {
    flex: 1,
    alignItems: 'center',
    width: 200,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
  button1: {
    flex: 1,
    width: 100,
    height: 30,
    borderRadius: 5,
    margin: 2,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  button2: {
    flex: 1,
    width: WIDTH - 100,
    height: 30,
    borderRadius: 10,
    margin: 2,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 5,
  },
  columMainModal: {
    flex: 2,
    width: WIDTH - 100,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columTextModal: {
    flex: 1,
    width: WIDTH - 100,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columInputModal: {
    flex: 3,
    width: WIDTH - 100,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pump12Panel: {
    flex: 1,
    flexDirection: 'row',
    width: WIDTH - 10,
    height: 30,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center' ,
    justifyContent: 'center'
  },
  pump1Panel: {
    flex: 1,
    width: 60,
    height: 130,
    flexDirection: 'column',
    backgroundColor: 'steelblue',
    borderRadius: 5,
    margin: 2 ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTab: {
    flex: 1,
    marginTop: 1 ,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 14
  },
  imagePump: {
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
  },
  pump1_1: {
    flex: 1,
    alignItems: 'center',
    width: 30,
    height: 30,
  },
  pump1_2: {
    flex: 1,
    alignItems: 'center',
    width: 30,
    height: 30,
    justifyContent: 'center' ,
    alignItems: 'center',
  },
  textPump: { 
    marginTop: 2 ,
    flex: 2,
    textAlign: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    
  },
  buttonShow: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
    height: 10,
    width: 100,
    marginBottom: 3,
    justifyContent: 'center',
  },
  statusPump1: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold' ,
    color: 'red'
  },
  RPMPump: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold' ,
  },
});
