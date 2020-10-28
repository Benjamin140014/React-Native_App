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

import Modal from 'react-native-modal';

const {width: WIDTH} = Dimensions.get('window');
import io from 'socket.io-client';

var arrayGet = ['HeighKK', 'HeighHK', 'HeighBL'];

export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisibleKK: false,
      isModalVisibleHK: false,
      isModalVisibleL: false,
      // out modal
      imageTank: require('../../../image/Tank_038.png'),
      // height tank
      heightKK: 0,
      heightHK: 0,
      heightL: 0,
      // time set
      timeHourKK: 0,
      timeMinuteKK: 0,
      timeHourHK: 0,
      timeMinuteHK: 0,
      timeHourL: 0,
      timeMinuteL: 0,
      timesecondKK: 0,
      timeSecondHK: 0,
      timeSecondL: 0,
      // time count display
      displayHoursKK: 0,
      displayMinuteKK: 0,
      displaySecondKK: 0,
      displayHoursHK: 0,
      displayMinuteHK: 0,
      displaySecondHK: 0,
      displayHoursL: 0,
      displayMinuteL: 0,
      displaySecondL: 0,
    };
  }
  // open modal
  toggleModal1 = () => {
    this.setState({isModalVisibleKK: !this.state.isModalVisibleKK});
  };
  toggleModal2 = () => {
    this.setState({isModalVisibleHK: !this.state.isModalVisibleHK});
  };
  toggleModal3 = () => {
    this.setState({isModalVisibleL: !this.state.isModalVisibleL});
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
  applyTimeKK = () => {
    this.postApi('PLC1', 'Time_Set_KK_h', this.state.timeHourKK, 'UInt16');
    this.postApi('PLC1', 'Time_Set_KK_m', this.state.timeMinuteKK, 'UInt16');
    this.postApi('PLC1', 'Time_Set_KK_s', this.state.timesecondKK, 'UInt16');
  };
  applyTimeHK = () => {
    this.postApi('PLC2', 'Time_Set_HK_h', this.state.timeHourHK, 'UInt16');
    this.postApi('PLC2', 'Time_Set_HK_m', this.state.timeMinuteHK, 'UInt16');
    this.postApi('PLC2', 'Time_Set_HK_s', this.state.timesecondHK, 'UInt16');
  };
  applyTimeL = () => {
    this.postApi('PLC2', 'Time_Set_BL_h', this.state.timeHourL, 'UInt16');
    this.postApi('PLC2', 'Time_Set_BL_m', this.state.timeMinuteL, 'UInt16');
    this.postApi('PLC2', 'Time_Set_BL_s', this.state.timesecondL, 'UInt16');
  };
  componentDidMount() {
      this.socket = io('http://180.214.236.174:4000');
      this.socket.on('loadDataControl', (data) => {
          this.setState({heightKK: Math.round(data[36].value  *100)/100 }) ; 
          this.setState({heightHK: Math.round(data[37].value  *100)/100 }) ; 
          this.setState({heightL:Math.round(data[38].value  *100)/100 }) ; 
      });
  }
  render() {
    return (
      <View style={styles.pump12Panel}>
        {/* Modal Ki khi */}
        <Modal isVisible={this.state.isModalVisibleKK}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: WIDTH - 20,
                height: 300,
              }}>
              <Button title="Close" onPress={this.toggleModal1} />
              <View style={styles.containerModal}>
                <View style={styles.Tank}>
                  <Image source={this.state.imageTank} style={styles.Tank} />
                </View>
                <Text> Time Set Kị Khí </Text>
                <View style={styles.columInputModal}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="hours"
                    placeholderTextColor="#60605e"
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      this.state.timeHourKK = val;
                    }}
                  />
                  <Text style={{margin: 2}}>H</Text>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="minutes"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timeMinuteKK = val;
                    }}
                    keyboardType={'numeric'}
                  />
                  <Text style={{margin: 2}}>M</Text>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="seconds"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timesecondKK = val;
                    }}
                    keyboardType={'numeric'}
                  />
                  <Text style={{margin: 2}}>S</Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonApply}
                  onPress={this.applyTimeKK}>
                  <Text>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.pump1Panel}>
          <Text style={styles.headerTab}> Bể Kị Khí </Text>
          <Text style={[styles.statusPump1]}> {this.state.heightKK} m </Text>
          <View style={styles.pump1_2}>
            <Image source={this.state.imageTank} style={styles.pump1_2} />
          </View>
          
          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.imagePump} onPress={this.toggleModal1}>
              Show
            </Text>
          </TouchableOpacity>
        </View>

        {/* tank Hk modal and panel  */}
        <Modal isVisible={this.state.isModalVisibleHK}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: WIDTH - 20,
                height: 300,
              }}>
              <Button title="Close" onPress={this.toggleModal2} />
              <View style={styles.containerModal}>
                <View style={styles.Tank}>
                  <Image source={this.state.imageTank} style={styles.Tank} />
                </View>
                <Text> Time Set Hiếu Khí </Text>
                <View style={styles.columInputModal}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="hours"
                    placeholderTextColor="#60605e"
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      this.state.timeHourHK = val;
                    }}
                  />
                  <Text style={{margin: 2}}>H</Text>

                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="minutes"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timeMinuteHK = val;
                    }}
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
                    placeholder="seconds"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timeSecondHK = val;
                    }}
                    keyboardType={'numeric'}
                  />
                  <Text style={{margin: 2}}>S</Text>
                </View>
                <View style={styles.columInputModal}>
                  <TouchableOpacity
                    style={styles.buttonApply}
                    onPress={this.applyTimeHK}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.pump1Panel}>
          <Text style={styles.headerTab}> Bể Hiếu Khí </Text>
          <Text style={[styles.statusPump1]}> {this.state.heightHK} m</Text>
          <View style={styles.pump1_2}>
            <Image source={this.state.imageTank} style={styles.pump1_2} />
          </View>
          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.textButtonShow} onPress={this.toggleModal2}>
              Show
            </Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={this.state.isModalVisibleL}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: WIDTH - 20,
                height: 300,
              }}>
              <Button title="Close" onPress={this.toggleModal3} />
              <View style={styles.containerModal}>
                <View style={styles.Tank}>
                  <Image source={this.state.imageTank} style={styles.Tank} />
                </View>
                <Text> Time Set Bể Lắng </Text>
                <View style={styles.columInputModal}>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="hours"
                    placeholderTextColor="#60605e"
                    keyboardType={'numeric'}
                    onChangeText={val => {
                      this.state.timeHourL = val;
                    }}
                  />
                  <Text style={{margin: 2}}>H</Text>
                  <TextInput
                    style={{
                      alignItems: 'center',
                      flex: 2,
                      backgroundColor: '#dde8c9',
                      borderRadius: 10,
                    }}
                    placeholder="minutes"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timeMinuteL = val;
                    }}
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
                    placeholder="seconds"
                    placeholderTextColor="#60605e"
                    onChangeText={val => {
                      this.state.timeSecondL = val;
                    }}
                    keyboardType={'numeric'}
                  />
                  <Text style={{margin: 2}}>S</Text>
                </View>
                <View style={styles.columInputModal}>
                  <TouchableOpacity
                    style={styles.buttonApply}
                    onPress={this.applyTimeL}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.pump1Panel}>
          <Text style={styles.headerTab}> Bể Lắng </Text>
          <Text style={[styles.statusPump1]}> {this.state.heightL} m </Text>
          <View style={styles.pump1_2}>
            <Image source={this.state.imageTank} style={styles.pump1_2} />
          </View>
          {/* <Text style={[styles.textPump]}>
            Time Count:{' '}
            {this.state.displayHoursL +
              '-' +
              this.state.displayMinuteL +
              '-' +
              this.state.displaySecondL}{' '}
          </Text> */}
          <TouchableOpacity style={styles.buttonShow}>
            <Text style={styles.textButtonShow} onPress={this.toggleModal3}>
              Show
            </Text>
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
  containerModal: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 5,
    height: 100,
  },
  columInputModal: {
    flex: 1,
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
    width: WIDTH - 6,
    height: 35,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  pump1Panel: {
    flex: 1,
    width: 60,
    height: 130,
    flexDirection: 'column',
    backgroundColor: 'royalblue',
    borderRadius: 5,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTab: {
    flex: 1,
    marginTop: 1,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 14,
  },

  Tank: {
    flex: 3,
    marginTop: 2,
    alignItems: 'center',
    width: 85,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pump1_2: {
    flex: 2,
    alignItems: 'center',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2
  },
  textPump: {
    marginTop: 2,
    flex: 1,
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
    fontWeight: 'bold',
    color: 'red',
  },
});
