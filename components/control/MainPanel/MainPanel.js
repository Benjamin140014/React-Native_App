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
import {FlatList} from 'react-native';
const {width: WIDTH} = Dimensions.get('window');

export default class control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorAutoMan: false,
      colorStartStop: false,
    };
  }
  // get Api
  getApi = (namevariable) => {
    fetch(`http://192.168.1.100:3000/api/get/${namevariable}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => {
          if(namevariable === 'Auto-Man_System_PLC1'){
            this.setState({colorAutoMan: json.value}) ;
          }
           if(namevariable === 'Run_System_PLC1'){
            this.setState({colorStartStop: json.value}) ; 
           }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // get api color 
  componentDidMount(){
    //   setInterval(() => {
    //     this.getApi('Auto-Man_System_PLC1') ;
    //     this.getApi('Run_System_PLC1') ; 
    //   }, 1000);
  }
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
  pressAuto = () => {
    this.postApi('PLC1', 'Auto-Man_In_System_PLC1', true, 'Boolean');
    this.postApi('PLC2', 'Auto-Man_In_System_PLC2', true, 'Boolean');
  };
  pressMan = () => {
    this.postApi('PLC1', 'Auto-Man_In_System_PLC1', false, 'Boolean');
    this.postApi('PLC2', 'Auto-Man_In_System_PLC2', false, 'Boolean');
  };
  pressStart = () => {
    this.postApi('PLC1', 'Start-Stop_In_System_PLC1', true, 'Boolean');
    this.postApi('PLC2', 'Start-Stop_In_System_PLC2', true, 'Boolean');
  };
  pressStop = () => {
    this.postApi('PLC1', 'Start-Stop_In_System_PLC1', false, 'Boolean');
    this.postApi('PLC2', 'Start-Stop_In_System_PLC2', false, 'Boolean');
  };
  pressConfirm = () => {
    this.postApi('PLC1', 'Confirm_System_PLC1', true, 'Boolean');
    this.postApi('PLC2', 'Confirm_System_PLC2', true, 'Boolean');
    setTimeout(() => {
        this.postApi('PLC1', 'Confirm_System_PLC1', false, 'Boolean');
        this.postApi('PLC2', 'Confirm_System_PLC2', false, 'Boolean');
    },500);
  };
  render() {
    return (
      <View style={styles.containerTabControlPanel}>
        <Text style={styles.textHeadMain}> Main Panel </Text>
        <View style={styles.columnMain}>
          <TouchableOpacity
            style={[
              styles.button1,
              {backgroundColor: this.state.colorAutoMan ? 'blue':'steelblue'}
            ]}
            onPress={this.pressAuto}>
            <Text>Auto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button1,
              {backgroundColor: this.state.colorAutoMan ? 'steelblue' : 'blue'}
            ]} 
            onPress = {this.pressMan}
            >
            <Text>Man</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.columnMain}>
          <TouchableOpacity style={styles.button2}
          onPress = {this.pressConfirm}
          >
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.columnMain}>
          <TouchableOpacity
            style={[
              styles.button1,
              {backgroundColor:this.state.colorStartStop ? 'blue' : 'steelblue'}
            ]}
            onPress = {this.pressStart}
            >
            <Text>Start </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button1,
              {backgroundColor: this.state.colorStartStop ? 'steelblue' : 'blue'}
            ]}
            onPress = {this.pressStop}
            >
            <Text>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerTabControlPanel: {
    flex: 1,
    flexDirection: 'column',
    width: WIDTH - 150,
    height: 30,
    marginTop: 60,
    borderRadius: 10,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  textHeadMain: {
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  columnMain: {
    flex: 1,
    width: WIDTH - 200,
    height: 30,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 5,
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
});
