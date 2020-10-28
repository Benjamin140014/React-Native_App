// components/signup.js

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import firebase from '../../database/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  registerUser = () => {
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          res.user.updateProfile({
            displayName: this.state.displayName,
          });
          console.log('User registered successfully!');
          this.setState({
            isLoading: false,
            displayName: '',
            email: '',
            password: '',
          });
          this.props.navigation.navigate('Login');
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.iconContainer}>
          <Ionicons name={'md-person-add'} size={70} />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-contact'} size={28} style={styles.Icon} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Name"
            value={this.state.displayName}
            onChangeText={val => this.updateInputVal(val, 'displayName')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-mail'} size={28} style={styles.Icon} />
          <TextInput
            style={styles.inputStyle}
            keyboardType="email-address"
            placeholder="Email"
            value={this.state.email}
            onChangeText={val => this.updateInputVal(val, 'email')}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name={'ios-lock'} size={28} style={styles.Icon} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={val => this.updateInputVal(val, 'password')}
            maxLength={15}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={() => this.registerUser()}>
          <Text style={styles.text}> Register </Text>
        </TouchableOpacity>

        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered ? Click here to Login
        </Text>
      </View>
    );
  }
}

const {width: WIDTH} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
  },
  Icon: {
    position: 'absolute',
    top: 6,
    left: 37,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputStyle: {
    width: WIDTH - 20,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginHorizontal: 25,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,
  },
  btnRegister: {
    width: WIDTH - 20,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#423577',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightslategrey',
  },
});
