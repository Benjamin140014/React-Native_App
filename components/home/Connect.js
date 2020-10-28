import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import io from 'socket.io-client';
import Spinner from 'react-native-loading-spinner-overlay';
const {width: WIDTH} = Dimensions.get('window');
import logo from '../../image/nodeOPC.png';
export default class Connect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleSpinner: '',
      spinner: false,
      state: false,
      messageConnection: 'No Connection !',
      url: 'opc.tcp://180.214.236.174:4840',
      modeNone: false,
      modeSign: false,
      modeSignAndEncrypt: false,
      policyNone: false,
      policyBasic128Rsa15: false,
      policyBasic256: false,
      annonymous: false,
      user: false,
      username: '',
      password: '',
      statusModeNone: false , 
      statusModeSign: false , 
      statusModeSignAndEncrypt: false , 
      statusPolicyNone: false , 
      statusPolicyBasic128Rsa15: false , 
      statusPolicyBasic256: false
    };
  }
  Connect = () => {
    this.setState({titleSpinner: 'Connecting...'})
    var mode = 'None' ; 
    var policy = 'None';
    if(this.state.modeSign){
      mode = 'Sign'
    }
    if(this.state.modeSignAndEncrypt){
      mode = 'SignAndEncrypt'
    }
    if(this.state.policyBasic128Rsa15){
      policy = 'Basic128Rsa15'
    }
    if(this.state.policyBasic256){
      policy = 'Basic256'
    }
    this.socket = io('http://180.214.236.174:4000');
    this.socket.emit('configServer',{url:  this.state.url , mode: mode , policy: policy});
    this.setState({
      spinner: true
    });
    var timeoutClear =  setTimeout(() => {
      Alert.alert('No respond from Server !');
      this.setState({
        spinner: false
      });
    },5000);
    this.socket.on('message', (data) => {
      clearTimeout(timeoutClear)
      this.setState({
        spinner: false
      });
      Alert.alert(data);
      if (data === 'Client has been connected to Server !') {
        this.setState({messageConnection: 'Connected !'});
        this.setState({state: true});
      }
    });
  };
  Disconnect = () => {
    this.setState({titleSpinner: 'Disconnecting...'})
    this.socket = io('http://180.214.236.174:4000');
    this.socket.emit('disconnet', 'ok');
    this.setState({
      spinner: true
    });
    var timeoutClear =  setTimeout(() => {
      Alert.alert('No respond from Server !');
      this.setState({
        spinner: false
      });
    },5000);
    this.socket.on('messageDisconnect',(data) => {
      clearTimeout(timeoutClear)
      this.setState({
        spinner: false
      });
      Alert.alert(data);
      this.setState({messageConnection: 'No Connection !'});
      this.setState({state: false});
    });
  };
 componentDidMount(){
  this.socket = io('http://180.214.236.174:4000');
  this.socket.on('messageFailConnect',(data)=>{
    this.setState({messageConnection: 'No Connection !'});
    this.setState({state: false});
  })
  this.socket.emit('checkStatusServer','refresh') ; 
  this.socket.on('ackStatus', (data)=>{
    if(data){
      this.setState({messageConnection: 'Connected !'});
        this.setState({state: true});
    }else{
      this.setState({messageConnection: 'No Connection !'});
      this.setState({state: false});
    }
  })

 }
  render() {
    return (
      <View style={styles.container}>
       <Spinner
          visible={this.state.spinner}
          textContent={this.state.titleSpinner}
          textStyle={styles.spinnerTextStyle}
        />
        <Text style={styles.textNabar}> Connect To Server </Text>
        <Text
          style={[
            styles.circle,
            {backgroundColor: this.state.state ? 'green' : 'red'},
          ]}
        />
        <Text
          style={[
            styles.textMessage,
            {color: this.state.state ? 'green' : 'red'},
          ]}>
          {' '}
          {this.state.messageConnection}{' '}
        </Text>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textUrl}> URL </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder={'Url'}
            value={this.state.url}
            onChangeText={value => {
              this.setState({url: value});
            }}
          />
        </View>
        <View  style = {styles.options}>
        <View style = {styles.Modes}>

        <Text  style = {styles.textHeader}> Security Modes</Text>
        <View style = {styles.containerInput}>
         <CheckBox
          value = {this.state.modeNone}
          disabled = {this.state.statusModeNone}
          onValueChange={(value)=>{this.setState({modeNone: value})
          if(this.state.modeNone === false){
            this.setState({statusModeSign: true,
                          statusModeSignAndEncrypt: true})
          }else{
            this.setState({statusModeSign: false,
              statusModeSignAndEncrypt: false})
          }
          }}
          style={styles.checkbox}
         />
         <Text  style = {styles.text} >None</Text>
         <CheckBox
          value = {this.state.modeSign}
          disabled = {this.state.statusModeSign}
          onValueChange={(value)=>{this.setState({modeSign: value})
          if(this.state.modeSign === false){
            this.setState({statusModeNone: true,
                          statusModeSignAndEncrypt: true})
          }else{
            this.setState({statusModeNone: false,
              statusModeSignAndEncrypt: false})
          }
          }}
          style={styles.checkbox}
         />
         <Text  style = {styles.text} >Sign</Text>
         <CheckBox
          value = {this.state.modeSignAndEncrypt}
          disabled = {this.state.statusModeSignAndEncrypt}
          onValueChange={(value)=>{this.setState({modeSignAndEncrypt: value})
          if(this.state.modeSignAndEncrypt === false){
            this.setState({statusModeSign: true,
                          statusModeNone: true})
          }else{
            this.setState({statusModeSign: false,
              statusModeNone: false})
          }
          }}
          style={styles.checkbox}
         />
         <Text  style = {styles.text} >Sign&Encrypt</Text>
        </View>

        </View>
        <View style = {styles.Policies}>
        <Text style = {styles.textHeader}>Security Policies</Text>
        <View style = {styles.containerInput}>
         <CheckBox
          value = {this.state.policyNone}
          disabled = {this.state.statusPolicyNone}
          onValueChange={(value)=>{this.setState({policyNone: value})
          if(this.state.policyNone  === false){
            this.setState({statusPolicyBasic256: true,
                          statusPolicyBasic128Rsa15: true})
          }else{
            this.setState({statusPolicyBasic256: false,
              statusPolicyBasic128Rsa15: false})
          }  
          }}
          style={styles.checkbox}
         />
         <Text style = {styles.text}>None</Text>
         <CheckBox
          value = {this.state.policyBasic128Rsa15}
          disabled = {this.state.statusPolicyBasic128Rsa15}
          onValueChange={(value)=>{this.setState({policyBasic128Rsa15: value})
          if(this.state.policyBasic128Rsa15  === false){
            this.setState({statusPolicyNone: true,
                          statusPolicyBasic256: true})
          }else{
            this.setState({statusPolicyNone: false,
              statusPolicyBasic256: false})
          } 
          }}
          style={styles.checkbox}
         />
         <Text  style = {styles.text} >Basic128Rsa15</Text>
         <CheckBox
          value = {this.state.policyBasic256}
          disabled = {this.state.statusPolicyBasic256}
          onValueChange={(value)=>{this.setState({policyBasic256: value})
          if(this.state.policyBasic256  === false){
            this.setState({statusPolicyNone: true,
                          statusPolicyBasic128Rsa15: true})
          }else{
            this.setState({statusPolicyNone: false,
              statusPolicyBasic128Rsa15: false})
          } 
          }}
          style={styles.checkbox}
         />
         <Text  style = {styles.text} >Basic256</Text>
       </View> 

        </View>
        </View>
        <TouchableOpacity style={styles.btnConnect} onPress={this.Connect}>
          <Text style={styles.text}> Connect </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnConnect, {backgroundColor: 'crimson'}]}
          onPress={this.Disconnect}>
          <Text style={styles.text}> Disconnect </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textNabar: {
    backgroundColor: 'steelblue',
    fontSize: 20,
    width: WIDTH,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 15,
    fontWeight: 'bold',
  },
  circle: {
    position: 'absolute',
    top: 65,
    right: 123,
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  textMessage: {
    position: 'absolute',
    top: 63,
    right: 5,
    height: 30,
    fontSize: 15,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 50 , 
    alignItems: 'center',
    marginBottom: 10
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 12,
    width: WIDTH - 70,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginHorizontal: 10,
  },
  checkbox: {
    alignSelf: 'center',
  },
  btnConnect: {
    width: WIDTH - 20,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'royalblue',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
  },
  textHeader:{
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  textUrl: {
    flex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
});
