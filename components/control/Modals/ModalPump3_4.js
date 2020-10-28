import React, {Component} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import io from 'socket.io-client';

var checkState = {run3_1: false , error3_1: false , 
  run3_2: false , error3_2: false ,
  OverLoad_3: false ,
  run4_1: false , error4_1: false , 
  run4_2: false , error4_2: false ,
  OverLoad_4: false} ;
const {width: WIDTH} = Dimensions.get('window');
export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisiblePump3: false,
      isModalVisiblePump4: false , 
      // out modal
      imageStatusPump3_1: require('../../../image/Pump_047.png'),
      imageStatusPump3_2: require('../../../image/Pump_047.png'), 

      imageStatusPump4_1: require('../../../image/Pump_047.png'),
      imageStatusPump4_2: require('../../../image/Pump_047.png'),

      TextStatusPump3_1: 'status',
      TextStatusPump3_2: 'status', 

      TextStatusPump4_1: 'status',
      TextStatusPump4_2: 'status',

      // in modal 
      colorButtonManAutoPump3: false, 
      colorButtonManAutoPump4: false, 

      colorButtonStartStopPump3_1: false, 
      colorButtonStartStopPump3_2: false, 

      colorButtonStartStopPump4_1: false, 
      colorButtonStartStopPump4_2: false, 
       
      readRPM3_1: 0 , 
      readRPM3_2: 0 , 
      readRPM4_1: 0 , 
      readRPM4_2: 0 , 

      colorTextPump3_1: false ,
      colorTextPump3_2: false ,
      colorTextPump4_1: false ,
      colorTextPump4_2: false ,
      
      timeHourPump3_1 : 0 , 
      timeMinutePump3_1 : 0 , 
      timeHourPump3_2 : 0 , 
      timeMinutePump3_2 : 0 , 
      timeHourPump4_1 : 0 , 
      timeMinutePump4_1 : 0 , 
      timeHourPump4_2 : 0 , 
      timeMinutePump4_2 : 0 , 

      RPM3_1 : 100 , 
      RPM3_2 : 100 , 
      RPM4_1 : 100 , 
      RPM4_2 : 100 , 
    };
  }
  toggleModal1 = () => {
    this.setState({isModalVisiblePump3: !this.state.isModalVisiblePump3});
  };
  toggleModal2 = () => {
    this.setState({isModalVisiblePump4: !this.state.isModalVisiblePump4});
  };
  // post Api
  postApi = (nameDevice, nameVariable, value, dataType) => {
    fetch(`http://180.214.236.174:3000/api/post/${nameVariable}`, {
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
    this.postApi('PLC1', 'pmp3_Auto-Man_In', true, 'Boolean');
  } ; 
  pressManPump1 = () =>{
    this.postApi('PLC1', 'pmp3_Auto-Man_In', false, 'Boolean');
  }; 
  ConfirmPump1 = () =>{
    this.postApi('PLC1', 'pmp3_Confirm1', true, 'Boolean');
    this.postApi('PLC1', 'pmp3_Confirm2', true, 'Boolean');
    setTimeout(() => {
      this.postApi('PLC1', 'pmp3_Confirm1', false, 'Boolean');
      this.postApi('PLC1', 'pmp3_Confirm2', false, 'Boolean');
    }, 500);
  }
  pressStartPump1_1 = ()=>{
    this.postApi('PLC1', 'pmp3_Start-Stop_Motor1', true, 'Boolean');
  } ; 
  pressStopPump1_1 = ()=>{
    this.postApi('PLC1', 'pmp3_Start-Stop_Motor1', false, 'Boolean');
  } ; 

  pressStartPump1_2 = () =>{
    this.postApi('PLC1', 'pmp3_Start-Stop_Motor2', true, 'Boolean');
  } ;
  pressStopPump1_2 = () =>{
    this.postApi('PLC1', 'pmp3_Start-Stop_Motor2', false, 'Boolean');
  }; 

  applyAllInputPump1 = ()=>{
    this.postApi('PLC1', 'pmp3_TimeSet1h', this.state.timeHourPump3_1, 'UInt16');
    this.postApi('PLC1', 'pmp3_TimeSet1m',  this.state.timeMinutePump3_1, 'UInt16');
    this.postApi('PLC1', 'pmp3_TimeSet2h',  this.state.timeHourPump3_2, 'UInt16');
    this.postApi('PLC1', 'pmp3_TimeSet2m',  this.state.timeMinutePump1_2, 'UInt16');
    this.postApi('PLC1', 'pmp3_W1',  this.state.RPM3_1, 'Int16');
    this.postApi('PLC1', 'pmp3_W2',  this.state.RPM3_2, 'Int16');
  } ; 

  // pump 2
  pressAutoPump2 = ()=>{
    this.postApi('PLC2', 'pmp4_Auto-Man_In', true, 'Boolean');
  } ; 
  pressManPump2 = () =>{
    this.postApi('PLC2', 'pmp4_Auto-Man_In', false, 'Boolean');
  } ; 
  ConfirmPump2 = () =>{
    this.postApi('PLC2', 'pmp4_Confirm1', true, 'Boolean');
    this.postApi('PLC2', 'pmp4_Confirm2', true, 'Boolean');
    setTimeout(() => {
      this.postApi('PLC2', 'pmp4_Confirm1', false, 'Boolean');
      this.postApi('PLC2', 'pmp4_Confirm2', false, 'Boolean');
    }, 500);
  }
  pressStartPump2_1 = () =>{
    this.postApi('PLC2', 'pmp4_Start-Stop_Motor1', true, 'Boolean');
  }; 
  pressStopPump2_1 = ()=>{
    this.postApi('PLC2', 'pmp4_Start-Stop_Motor1', false, 'Boolean');
  } ; 

  pressStartPump2_2 = ()=>{
    this.postApi('PLC2', 'pmp4_Start-Stop_Motor2', true, 'Boolean');
  } ; 
  pressStopPump2_2 = ()=>{
    this.postApi('PLC2', 'pmp4_Start-Stop_Motor2', false, 'Boolean');
  } ; 
  
  applyAllInputPump2 = ()=>{
    this.postApi('PLC2', 'pmp4_TimeSet1h', this.state.timeHourPump4_1, 'UInt16');
    this.postApi('PLC2', 'pmp4_TimeSet1m',  this.state.timeMinutePump4_1, 'UInt16');
    this.postApi('PLC2', 'pmp4_TimeSet2h',  this.state.timeHourPump4_2, 'UInt16');
    this.postApi('PLC2', 'pmp4_TimeSet2m',  this.state.timeMinutePump4_2, 'UInt16');
    this.postApi('PLC2', 'pmp4_W1',  this.state.RPM4_1, 'Int16');
    this.postApi('PLC2', 'pmp4_W2',  this.state.RPM4_2, 'Int16');
  }
  // get api color 
  componentDidMount(){
    this.socket = io('http://180.214.236.174:4000');
      this.socket.on('loadDataControl', (data) => {
  
          this.setState({readRPM3_1: data[15].value});  
          // pump1_1
            if(data[16].value === true){
             this.setState({TextStatusPump3_1 : 'RUN'}) ;
             this.setState({colorTextPump3_1: true}) ; 
             this.setState({imageStatusPump3_1 : require('../../../image/Pump_048.png')}) ;
             checkState.run3_1 = true ;
            }else{
              checkState.run3_1 = false ; 
            }
          
           if(data[17].value=== true){
             this.setState({TextStatusPump3_1 : 'ERROR'}) ;
             this.setState({colorTextPump3_1: false}) ; 
             this.setState({imageStatusPump3_1 : require('../../../image/Pump_049.png')}) ;
             checkState.error3_1 = true
            }else{
              checkState.error3_1 = false
            }
          
          if(checkState.run3_1 === false && checkState.error3_1 === false && checkState.OverLoad_3 ===false){
           this.setState({TextStatusPump3_1 : 'OFF'}) ;
           this.setState({colorTextPump3_1: false}) ; 
           this.setState({imageStatusPump3_1 : require('../../../image/Pump_047.png')}) ;
          }
      
          this.setState({readRPM3_2: data[18].value});  
         
          // pump1_2 
        
            if(data[19].value === true){
             this.setState({TextStatusPump3_2 : 'RUN'}) ;
             this.setState({colorTextPump3_2: true}) ; 
             this.setState({imageStatusPump3_2 : require('../../../image/Pump_048.png')}) ;
             checkState.run3_2 = true ;
            }else{
              checkState.run3_2 = false ; 
            }
         
           if(data[20].value === true){
             this.setState({TextStatusPump3_2 : 'ERROR'}) ;
             this.setState({colorTextPump3_2: false}) ; 
             this.setState({imageStatusPump3_2 : require('../../../image/Pump_049.png')}) ;
             checkState.error3_2 = true
            }else{
              checkState.error3_2 = false
            }
          
          if(checkState.run3_2 === false && checkState.error3_2 === false && checkState.OverLoad_3 ===false){
           this.setState({TextStatusPump3_2 : 'OFF'}) ;
           this.setState({colorTextPump3_2: false}) ; 
           this.setState({imageStatusPump3_2 : require('../../../image/Pump_047.png')}) ;
          }
          // overload 1
         
            if(data[21].value === true){
              this.setState({TextStatusPump3_1 : 'Overload'}) ;
              this.setState({colorTextPump3_1: false}) ; 
              this.setState({imageStatusPump3_1 : require('../../../image/Pump_049.png')}) ;
              this.setState({TextStatusPump3_2 : 'Overload'}) ;
              this.setState({colorTextPump3_2: false}) ; 
              this.setState({imageStatusPump3_2 : require('../../../image/Pump_049.png')}) ;
              checkState.OverLoad_3 = true ; 
             }else{
               checkState.OverLoad_3 = false ; 
             }

          this.setState({readRPM4_1: data[22].value});  
         
         //pump4_1
         
          if(data[23].value === true){
           this.setState({TextStatusPump4_1 : 'RUN'}) ;
           this.setState({colorTextPump4_1: true}) ; 
           this.setState({imageStatusPump4_1 : require('../../../image/Pump_048.png')}) ;
           checkState.run4_1 = true ;
          }else{
            checkState.run4_1 = false ; 
          }
        
         if(data[24].value === true){
           this.setState({TextStatusPump4_1 : 'ERROR'}) ;
           this.setState({colorTextPump4_1: false}) ; 
           this.setState({imageStatusPump4_1 : require('../../../image/Pump_049.png')}) ;
           checkState.error4_1 = true
          }else{
            checkState.error4_1 = false
          }
        
        if(checkState.run4_1 === false && checkState.error4_1 === false && checkState.OverLoad_4 ===false){
         this.setState({TextStatusPump4_1 : 'OFF'}) ;
         this.setState({colorTextPump4_1: false}) ; 
         this.setState({imageStatusPump4_1 : require('../../../image/Pump_047.png')}) ;
        }
          this.setState({readRPM4_2: data[25].value});  
        // pump4_2
        
          if(data[26].value === true){
           this.setState({TextStatusPump4_2 : 'RUN'}) ;
           this.setState({colorTextPump4_2: true}) ; 
           this.setState({imageStatusPump4_2 : require('../../../image/Pump_048.png')}) ;
           checkState.run4_2 = true ;
          }else{
            checkState.run4_2 = false ; 
          }
         if(data[27].value === true){
           this.setState({TextStatusPump4_2 : 'ERROR'}) ;
           this.setState({colorTextPump4_2: false}) ; 
           this.setState({imageStatusPump4_2 : require('../../../image/Pump_049.png')}) ;
           checkState.error4_2 = true
          }else{
            checkState.error4_2 = false
          }
        if(checkState.run4_2 === false && checkState.error4_2 === false && checkState.OverLoad_4 ===false){
         this.setState({TextStatusPump4_2 : 'OFF'}) ;
         this.setState({colorTextPump4_2: false}) ; 
         this.setState({imageStatusPump4_2 : require('../../../image/Pump_047.png')}) ;
        }
         // overload 4
          if(data[28].value === true){
            this.setState({TextStatusPump4_1 : 'Overload'}) ;
            this.setState({colorTextPump4_1: false}) ; 
            this.setState({imageStatusPump4_1 : require('../../../image/Pump_049.png')}) ;
            this.setState({TextStatusPump4_2 : 'Overload'}) ;
            this.setState({colorTextPump4_2: false}) ; 
            this.setState({imageStatusPump4_2 : require('../../../image/Pump_049.png')}) ;
            checkState.OverLoad_4 = true ; 
           }else{
             checkState.OverLoad_4 = false ; 
           }
      })   
  }
  render() {
    return (
      <View style={styles.pump12Panel}>

        <Modal isVisible={this.state.isModalVisiblePump3}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Button title="Close" onPress={this.toggleModal1} />
            <View style={styles.containerModal}>
              <View style={styles.columMainModal}>
                <View style={styles.pump1_1}>
                  <Image source={this.state.imageStatusPump3_1} style={styles.pump1_1} />
                </View>
                <View style={styles.pump1_2}>
                  <Image source={this.state.imageStatusPump3_2} style={styles.pump1_2} />
                </View>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump3 ? 'blue':'steelblue'}]}
                 onPress = {this.pressAutoPump1}
                  >
                  <Text>Auto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump3 ? 'steelblue':'blue'}]}
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
                  style={[styles.button1, ,  {backgroundColor: this.state.colorButtonStartStopPump3_1 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_1}
                  >
                  <Text>Start 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1,  {backgroundColor: this.state.colorButtonStartStopPump3_2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_2}
                  >
                  <Text>Start 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonStartStopPump3_1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_1}
                  >
                  <Text>Stop 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, ,  {backgroundColor: this.state.colorButtonStartStopPump3_2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_2}
                  >
                  <Text>Stop 2</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columTextModal}>
                <Text> Time Set Pump3_1</Text>
                <Text> Time Set Pump3_2</Text>
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
                  onChangeText = {(val)=>{this.state.timeHourPump3_1 = val}}
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
                  onChangeText = {(val)=>{this.state.timeMinutePump3_1 = val}}
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
                  onChangeText = {(val)=>{this.state.timeHourPump3_2 = val}}
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
                  onChangeText = {(val)=>{this.state.timeMinutePump3_2 = val}}
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
                  onChangeText = {(val)=>{this.state.RPM3_1 = val}}
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
                  onChangeText = {(val)=>{this.state.RPM3_2 = val}}
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
          <Text style={styles.headerTab}> Control Pump 3 </Text>
          <View style={styles.textPump}>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump3_1 ? 'green': 'red'} ]}> {this.state.TextStatusPump3_1} </Text>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump3_2 ? 'green': 'red'} ]}> {this.state.TextStatusPump3_2} </Text>
          </View>
          <View style={styles.imagePump}>
            <View style={styles.pump1_1}>
              <Image source={this.state.imageStatusPump3_1} style={styles.pump1_1} />
            </View>
            <View style={styles.pump1_2}>
              <Image source={this.state.imageStatusPump3_2} style={styles.pump1_2} />
            </View>
          </View>

          <View style={styles.textPump}>
            <Text style={styles.RPMPump}> {this.state.readRPM3_1} rpm </Text>
            <Text style={styles.RPMPump}> {this.state.readRPM3_2} rpm </Text>
          </View>

          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.textButtonShow} onPress={this.toggleModal1}>
              Show Pump 3
            </Text>
          </TouchableOpacity>
        </View>

        {/* pump1_2 modal and panel  */ }
        <Modal isVisible={this.state.isModalVisiblePump4}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Button title="Close" onPress={this.toggleModal2} />
            <View style={styles.containerModal}>
              <View style={styles.columMainModal}>
                <View style={styles.pump1_1}>
                  <Image source={this.state.imageStatusPump4_1} style={styles.pump1_1} />
                </View>
                <View style={styles.pump1_2}>
                  <Image source={this.state.imageStatusPump4_2} style={styles.pump1_2} />
                </View>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, ,{backgroundColor: this.state.colorButtonManAutoPump4 ? 'blue':'steelblue'}]}
                  onPress = {this.pressAutoPump2}
                  >
                  <Text>Auto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, ,{backgroundColor: this.state.colorButtonManAutoPump4 ? 'steelblue':'blue'}]}
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
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump4_1 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump2_1}
                  >
                  <Text>Start 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump4_2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump2_2}
                  >
                  <Text>Start 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump4_1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump2_1}
                  >
                  <Text>Stop 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump4_2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump2_2}
                  >
                  <Text>Stop 2</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columTextModal}>
                <Text> Time Set Pump4_1</Text>
                <Text> Time Set Pump4_2</Text>
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
                  onChangeText = {(val)=>{ this.state.timeHourPump4_1 = val}}
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
                  onChangeText = {(val)=>{ this.state.timeMinutePump4_1 = val}}
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
                  onChangeText = {(val)=>{ this.state.timeHourPump4_2 = val}}
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
                  onChangeText = {(val)=>{ this.state.timeMinutePump4_2 = val}}
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
                  onChangeText = {(val)=>{ this.state.RPM4_1 = val}}
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
                  onChangeText = {(val)=>{ this.state.RPM4_2 = val}}
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
          <Text style={styles.headerTab}> Control Pump 4 </Text>
          <View style={styles.textPump}>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump4_1 ? 'green': 'red'} ]}> {this.state.TextStatusPump4_1} </Text>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump4_2 ? 'green': 'red'} ]}> {this.state.TextStatusPump4_2} </Text>
          </View>
          <View style={styles.imagePump}>
            <View style={styles.pump1_1}>
              <Image source={this.state.imageStatusPump4_1} style={styles.pump1_1} />
            </View>
            <View style={styles.pump1_2}>
              <Image source={this.state.imageStatusPump4_2} style={styles.pump1_2} />
            </View>
          </View>
          <View style={styles.textPump}>
            <Text style={styles.RPMPump}> {this.state.readRPM4_1} rpm </Text>
            <Text style={styles.RPMPump}> {this.state.readRPM4_2} rpm</Text>
          </View>

          <TouchableOpacity style={styles.buttonShow} onPress = { this.toggleModal2}>
            <Text>Show Pump 4</Text>
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
    width: WIDTH - 5,
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
    backgroundColor: 'darkslategrey',
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
