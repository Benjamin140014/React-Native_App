// components/dashboard.js

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView ,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import firebase from '../../database/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Connect from './Connect'
const {width: WIDTH} = Dimensions.get('window');

function Guide() {
  return (
    <View style={styles.scrollViews}>
      <ScrollView>
        <Text style={styles.textNabar}> Guide use Application </Text>
        <View style={styles.containerTabDashboard}>
          <Text style={styles.headerTab}> Tab Control </Text>
          <View style={styles.bodyTab}>
            <Text style = {styles.textBody}> 1. Điều khiển Main panel </Text>
            <Text style = {styles.textBody}> 2. Điều khiển 5 cụm bơm chính </Text>
            <Text style = {styles.textBody}> 3. Set thời gian cho các bể Hiếu khí , Kị Khí , Bể Lắng </Text>
          </View>
        </View>
        <View style={styles.containerTabOther}>
          <Text style={styles.headerTab}> Tab Supervisor Tank </Text>
          <View style={styles.bodyTab}>
            <Text style = {styles.textBody}> 1. Theo dõi mực nước của các bể bao gồm Bể Chứa , Bể Cân Bằng , Bể Hiếu Khí , Bể Kị Khí, 
              Bể Tạm , Bể NAOH , Bể HCL , Bể Lắng </Text>
          </View>
        </View>
        <View style={styles.containerTabOther}>
          <Text style={styles.headerTab}> Tab Dashboard </Text>
          <View style={styles.bodyTab}>
            <Text style = {styles.textBody}> 1. Theo dõi nhiệt độ của 3 cảm biến là T1 , T2 , T3 </Text>
            <Text style = {styles.textBody}> 2. Theo dõi chỉ số PH và nồng độ oxi DO</Text>
            <Text style = {styles.textBody}> 3. Theo dõi Flow 1 và Flow 2 </Text>
          </View>
        </View>
        <View style={styles.containerTabOther}>
          <Text style={styles.headerTab}> Tab Overview </Text>
          <View style={styles.bodyTab}>
            <Text style = {styles.textBody}> 1. Overview System </Text>
            <Text style = {styles.textBody}> 2. Contact us </Text>
            <Text style = {styles.textBody}> 3. About us</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
    };
  }
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(res => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
    return (
      <View style={styles.containerLogout}>
        <Ionicons name={'ios-person'} size={80} style={styles.Icon} />
        <Text style={styles.textStyle}>
          {' '}
          Welcome {this.state.displayName} !{' '}
        </Text>
        <TouchableOpacity
          style={styles.touchSubmit}
          onPress={() => this.signOut()}>
          <Text style={styles.text}> Log Out </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const Drawer = createDrawerNavigator();
export default function homeGuide() {
  return (
    <Drawer.Navigator initialRouteName="Connect">
      <Drawer.Screen
        name="Connect"
        component={Connect}
        options={{drawerIcon: () => <Ionicons name={'md-wifi'} size={24} />}}
      />
      <Drawer.Screen
        name="Guide"
        component={Guide}
        options={{drawerIcon: () => <Ionicons name={'ios-book'} size={24} />}}
      />
      <Drawer.Screen
        name="Log out"
        component={Logout}
        options={{
          drawerIcon: () => <Ionicons name={'ios-log-out'} size={24} />,
        }}
      />

    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  scrollViews: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNabar: {
    backgroundColor: 'steelblue',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 15,
    fontWeight: 'bold'
  },
  containerTabDashboard: {
    flex: 1,
    width: WIDTH,
    height: 150,
    marginTop: 65,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  containerTabOther: {
    flex: 1,
    width: WIDTH,
    height: 150,
    marginTop: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  headerTab: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'steelblue',
    padding: 5,
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  bodyTab: {
    flex: 5,
    textAlign: 'left',
    marginLeft: 10 ,
    fontSize: 14
  },
  containerLogout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  Icon: {
    borderRadius: 25,
    marginTop: 20,
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
  },
  touchSubmit: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#423577',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontSize: 25,
  },
  textBody:{
    fontSize: 16 , 
    padding: 4
  } 
});
