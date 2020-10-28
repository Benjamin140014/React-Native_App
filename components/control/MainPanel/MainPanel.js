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
import io from "socket.io-client";
const {width: WIDTH} = Dimensions.get('window');

const socket = io('http://180.214.236.174:4000');

export default class control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorAutoMan: false,
      colorStartStop: false,
    };
  }
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
        socket.emit(`setVariableMainPanel`, 'ok' )
    },500);
  };

  componentDidMount(){
    socket.on('finishSetVariable',(data)=>{
        this.setState({colorAutoMan: data.value55})
        this.setState({colorStartStop: data.value56})
    })
  }

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
    marginTop: 25,
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
