// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import firebase from '../../database/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import logo from '../../image/logo.png';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      errorMessage: 'User not exit !',
      showPass: true,
      press: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to sign in!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res)
          console.log('User logged-in successfully!')
          this.setState({
            isLoading: false,
            email: '',
            password: ''
          })
          this.props.navigation.navigate('Dashboard')

        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
          Alert.alert(this.state.errorMessage);
          this.setState({ isLoading: false })
        })
    }
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-person'} size={28}
            style={styles.Icon} />
          <TextInput
            style={styles.inputStyle}
            placeholder={'Email'}
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
            onSubmitEditing={() => { this.password.focus() }}
          />
        </View>

        <View style={styles.inputContainer} >
          <Ionicons name={'ios-lock'} size={28}
            style={styles.Icon} />
          <TextInput
            style={styles.inputStyle}
            placeholder={"Password"}
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={this.state.showPass}
            ref={(input) => { this.password = input }}
          />
          <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)} >
            <Ionicons name={this.state.press ? 'ios-eye' : 'ios-eye-off'} size={28} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={() => this.userLogin()} >
          <Text style={styles.text}> Login </Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account ? Sign up
        </Text>

      </View>
    );
  }
}

const { width: WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  inputStyle: {
    width: WIDTH - 20,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginHorizontal: 25
  },
  Icon: {
    position: 'absolute',
    top: 6,
    left: 37
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 20,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#423577',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontSize: 25
  },
  inputContainer: {
    marginTop: 10
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }

});