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
import { FlatList } from 'react-native-gesture-handler';

var checkState = {run5_1: false , error5_1: false , 
  run5_2: false , error5_2: false ,
  OverLoad_5: false 
 } ;
var allVariableGet = [
  'pmp5_Auto-Man',
  'pmp5_Motor1_Run',
  'pmp5_Motor2_Run' , 
  'Pump5_1_Run' ,
  'Pump5_1_Err' ,
  'Pump5_1_RPM' ,
  'Pump5_2_Run' ,
  'Pump5_2_Err' ,
  'Pump5_2_RPM' ,
  'OverLoad_5'
] ; 
const {width: WIDTH} = Dimensions.get('window');
export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisiblePump5: false, 
      // out modal
      imageStatusPump5_1: require('../../../image/Pump_047.png'),
      imageStatusPump5_2: require('../../../image/Pump_047.png'), 

      TextStatusPump5_1: 'status',
      TextStatusPump5_2: 'status', 

      // in modal 
      colorButtonManAutoPump5: false, 

      colorButtonStartStopPump5_1: false, 
      colorButtonStartStopPump5_2: false, 
       
      readRPM5_1: 0 , 
      readRPM5_2: 0 , 

      colorTextPump5_1: false ,
      colorTextPump5_2: false ,
      
      timeHourPump5_1 : 0 , 
      timeMinutePump5_1 : 0 , 
      timeHourPump5_2 : 0 , 
      timeMinutePump5_2 : 0 ,

      RPM5_1 : 100 , 
      RPM5_2 : 100 ,  
    };
  }
  toggleModal1 = () => {
    this.setState({isModalVisiblePump5: !this.state.isModalVisiblePump5});
  };
   // get Api
   getApi = (namevariable) => {
    fetch(`http://192.168.1.100:3000/api/get/${namevariable}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => { 
          // color pump5 
          if(namevariable === 'pmp5_Auto-Man'){
            this.setState({colorButtonManAutoPump5: json.value}) ;
          }
           if(namevariable === 'pmp5_Motor1_Run'){
            this.setState({colorButtonStartStopPump5_1: json.value}) ; 
           }
           if(namevariable === 'pmp5_Motor2_Run'){
            this.setState({colorButtonStartStopPump5_2: json.value}) ; 
           }

           if(namevariable === 'Pump5_1_RPM'){
            this.setState({readRPM5_1: json.value});  
           }
           if(namevariable === 'Pump5_2_RPM'){
            this.setState({readRPM5_2: json.value});  
           }
           // pump5_1
           if(namevariable === 'Pump5_1_Run'){
             if(json.value === true){
              this.setState({TextStatusPump5_1 : 'RUN'}) ;
              this.setState({colorTextPump5_1: true}) ; 
              this.setState({imageStatusPump5_1 : require('../../../image/Pump_048.png')}) ;
              checkState.run5_1 = true ;
             }else{
               checkState.run5_1 = false ; 
             }
           }
           if(namevariable === 'Pump5_1_Err'){
            if(json.value === true){
              this.setState({TextStatusPump5_1 : 'ERROR'}) ;
              this.setState({colorTextPump5_1: false}) ; 
              this.setState({imageStatusPump5_1 : require('../../../image/Pump_049.png')}) ;
              checkState.error5_1 = true
             }else{
               checkState.error5_1 = false
             }
           }
           if(checkState.run5_1 === false && checkState.error5_1 === false && checkState.OverLoad_5 ===false){
            this.setState({TextStatusPump5_1 : 'OFF'}) ;
            this.setState({colorTextPump5_1: false}) ; 
            this.setState({imageStatusPump5_1 : require('../../../image/Pump_047.png')}) ;
           }
           // pump5_2 
           if(namevariable === 'Pump5_2_Run'){
            if(json.value === true){
             this.setState({TextStatusPump5_2 : 'RUN'}) ;
             this.setState({colorTextPump5_2: true}) ; 
             this.setState({imageStatusPump5_2 : require('../../../image/Pump_048.png')}) ;
             checkState.run5_2 = true ;
            }else{
              checkState.run5_2 = false ; 
            }
          }
          if(namevariable === 'Pump5_2_Err'){
           if(json.value === true){
             this.setState({TextStatusPump5_2 : 'ERROR'}) ;
             this.setState({colorTextPump5_2: false}) ; 
             this.setState({imageStatusPump5_2 : require('../../../image/Pump_049.png')}) ;
             checkState.error5_2 = true
            }else{
              checkState.error5_2 = false
            }
          }
          if(checkState.run5_2 === false && checkState.error5_2 === false && checkState.OverLoad_5 ===false){
           this.setState({TextStatusPump5_2 : 'OFF'}) ;
           this.setState({colorTextPump5_2: false}) ; 
           this.setState({imageStatusPump5_2 : require('../../../image/Pump_047.png')}) ;
          }
          // overload 5
          if(namevariable === 'OverLoad_5'){
            if(json.value === true){
              this.setState({TextStatusPump5_1 : 'Overload'}) ;
              this.setState({colorTextPump5_1: false}) ; 
              this.setState({imageStatusPump5_1 : require('../../../image/Pump_049.png')}) ;
              this.setState({TextStatusPump5_2 : 'Overload'}) ;
              this.setState({colorTextPump5_2: false}) ; 
              this.setState({imageStatusPump5_2 : require('../../../image/Pump_049.png')}) ;
              checkState.OverLoad_5 = true ; 
             }else{
               checkState.OverLoad_5 = false ; 
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
    this.postApi('PLC2', 'pmp5_Auto-Man_In', true, 'Boolean');
  } ; 
  pressManPump1 = () =>{
    this.postApi('PLC2', 'pmp5_Auto-Man_In', false, 'Boolean');
  }; 
  ConfirmPump1 = () =>{
    this.postApi('PLC2', 'pmp5_Confirm1', true, 'Boolean');
    this.postApi('PLC2', 'pmp5_Confirm2', true, 'Boolean');
    setTimeout(() => {
      this.postApi('PLC2', 'pmp5_Confirm1', false, 'Boolean');
      this.postApi('PLC2', 'pmp5_Confirm2', false, 'Boolean');
    }, 500);
  }
  pressStartPump1_1 = ()=>{
    this.postApi('PLC2', 'pmp5_Start-Stop_Motor1', true, 'Boolean');
  } ; 
  pressStopPump1_1 = ()=>{
    this.postApi('PLC2', 'pmp5_Start-Stop_Motor1', false, 'Boolean');
  } ; 

  pressStartPump1_2 = () =>{
    this.postApi('PLC2', 'pmp5_Start-Stop_Motor2', true, 'Boolean');
  } ;
  pressStopPump1_2 = () =>{
    this.postApi('PLC2', 'pmp5_Start-Stop_Motor2', false, 'Boolean');
  }; 

  applyAllInputPump1 = ()=>{
    this.postApi('PLC2', 'pmp5_TimeSet1h', this.state.timeHourPump5_1, 'UInt16');
    this.postApi('PLC2', 'pmp5_TimeSet1m',  this.state.timeMinutePump5_1, 'UInt16');
    this.postApi('PLC2', 'pmp5_TimeSet2h',  this.state.timeHourPump5_2, 'UInt16');
    this.postApi('PLC2', 'pmp5_TimeSet2m',  this.state.timeMinutePump5_2, 'UInt16');
    this.postApi('PLC2', 'pmp5_W1',  this.state.RPM5_1, 'Int16');
    this.postApi('PLC2', 'pmp5_W2',  this.state.RPM5_2, 'Int16');
  } ; 
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
      <View style={styles.pump5Panel}>

        <Modal isVisible={this.state.isModalVisiblePump5}>
          <View style={{flex: 1, borderRadius: 10}}>
            <Button title="Close" onPress={this.toggleModal1} />
            <View style={styles.containerModal}>
              <View style={styles.columMainModal}>
                <View style={styles.pump1_1}>
                  <Image source={this.state.imageStatusPump5_1} style={styles.pump1_1} />
                </View>
                <View style={styles.pump1_2}>
                  <Image source={this.state.imageStatusPump5_2} style={styles.pump1_2} />
                </View>
              </View>

              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump5 ? 'blue':'steelblue'}]}
                 onPress = {this.pressAutoPump1}
                  >
                  <Text>Auto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, , {backgroundColor: this.state.colorButtonManAutoPump5 ? 'steelblue':'blue'}]}
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
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump5_1 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_1}
                  >
                  <Text>Start 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump5_2 ? 'blue':'steelblue'}]}
                  onPress = {this.pressStartPump1_2}
                  >
                  <Text>Start 2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.columMainModal}>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump5_1 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_1}
                  >
                  <Text>Stop 1 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: this.state.colorButtonStartStopPump5_2 ? 'steelblue':'blue'}]}
                  onPress = {this.pressStopPump1_2}
                  >
                  <Text>Stop 2</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.columTextModal}>
                <Text> Time Set Pump5_1</Text>
                <Text> Time Set Pump5_2</Text>
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
                  onChangeText = {(val)=>{this.state.timeHourPump5_1 = val}}
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
                  onChangeText = {(val)=>{this.state.timeMinutePump5_1 = val}}
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
                  onChangeText = {(val)=>{this.state.timeHourPump5_2 = val}}
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
                  onChangeText = {(val)=>{this.state.timeMinutePump5_2 = val}}
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
                  onChangeText = {(val)=>{this.state.RPM5_1 = val}}
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
                  onChangeText = {(val)=>{this.state.RPM5_2 = val}}
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

          <Text style={styles.headerTab}> Control Pump 5 </Text>
          <View style={styles.textPump}>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump5_1 ? 'green': 'red'} ]}> {this.state.TextStatusPump5_1} </Text>
            <Text style={[styles.statusPump1 ,{ color: this.state.colorTextPump5_2 ? 'green': 'red'} ]}> {this.state.TextStatusPump5_2} </Text>
          </View>
          <View style={styles.imagePump}>
            <View style={styles.pump1_1}>
              <Image source={this.state.imageStatusPump5_1} style={styles.pump1_1} />
            </View>
            <View style={styles.pump1_2}>
              <Image source={this.state.imageStatusPump5_2} style={styles.pump1_2} />
            </View>
          </View>
          <View style={styles.textPump}>
            <Text style={styles.RPMPump}> {this.state.readRPM5_1} rpm </Text>
            <Text style={styles.RPMPump}> {this.state.readRPM5_2} rpm </Text>
          </View>
          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.textButtonShow} onPress={this.toggleModal1}>
              Show Pump 5
            </Text>
          </TouchableOpacity>
        
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
  pump5Panel: {
    flex: 1,
    width: WIDTH - 200,
    height: 30,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    marginBottom: 5 , 
    alignItems: 'center' ,
    margin: 3
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
