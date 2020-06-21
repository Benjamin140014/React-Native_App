// components/dashboard.js

import React, {Component} from 'react';
import {StyleSheet, View, Text, Button , Dimensions , ScrollView , TouchableOpacity} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from '../../database/firebase';
import Ionicons from 'react-native-vector-icons/Ionicons' ; 
const {width:WIDTH} = Dimensions.get('window') ; 

function Guide(){
  return(
    <View style = {styles.guideContainer}>
      
    <ScrollView>
      <Text style={styles.textNabar}> Guide use Application </Text>
      <View style= {styles.containerTabDashboard}>  
      <Text style= {styles.headerTab}> Tab Dashboard </Text>
      <View style= {styles.bodyTab}>
      <Text> 1. Control system </Text>
      <Text> 2. Supervisor system </Text>
      <Text> 3. react live with System </Text>
      </View>
      </View>
      <View style= {styles.containerTabOther}>  
      <Text style= {styles.headerTab}> Tab History </Text>
      <View style= {styles.bodyTab}>
      <Text> 1. Find and Filter Data </Text>
      <Text> 2. Supervisor Data </Text>
      </View>
      </View>
      <View style= {styles.containerTabOther}>  
      <Text style= {styles.headerTab}> Tab Trend </Text>
      <View style= {styles.bodyTab}>
      <Text> 1. Observe Trend of sensor </Text>
      <Text> 2. Add Trend you want supervisor</Text>
      <Text> 3. Delete trend </Text>
      </View>
      </View> 
      <View style= {styles.containerTabOther}>  
      <Text style= {styles.headerTab}> Tab Overview </Text>
      <View style= {styles.bodyTab}>
      <Text> 1. Overview System </Text>
      <Text> 2. Contact us </Text>
      <Text> 3. About us</Text>
      </View>
      </View>
    </ScrollView>
    </View>
  )
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
      .then((res) => {
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
         <Ionicons name={'ios-person'} size={80}  style={styles.Icon} />
        <Text style={styles.textStyle}> Welcome {this.state.displayName} ! </Text>
         <TouchableOpacity style={styles.touchSubmit}  onPress={()=>this.signOut()}>
           <Text  style= {styles.text}> Log Out </Text>
         </TouchableOpacity>
      </View>
    );
  }
}

const Drawer = createDrawerNavigator();
export default function homeGuide(){
  return (
    <Drawer.Navigator initialRouteName="Guide" >
     <Drawer.Screen name="Guide" component={Guide}  options={({drawerIcon: () => <Ionicons name= {'ios-home'} size={24} /> })} />
     <Drawer.Screen name="Log out" component={Logout} options={({drawerIcon: () => <Ionicons name= {'ios-log-out'} size={24} /> })} />
    </Drawer.Navigator>
);
}

const styles = StyleSheet.create({
  guideContainer:{
    flex:1 ,
    alignItems: 'center',
  },
  textNabar:{
  backgroundColor: 'steelblue',
  fontSize: 20 ,
  textAlign: 'center' ,
  position: 'absolute',
  left: 0 , right: 0 ,
  padding: 15 
  },
  containerTabDashboard:{
    flex: 1 ,
    width: WIDTH - 40 ,
    height: 150 ,
   marginTop: 80 ,
   backgroundColor: 'lightgray',
   borderRadius: 10 
  },
  containerTabOther:{
    flex: 1 ,
    width: WIDTH - 40,
    height: 150 ,
   marginTop: 10 ,
   backgroundColor: 'lightgray',
   borderRadius: 10 
  },
  headerTab:{
   flex: 1 ,
   textAlign: 'center',
   backgroundColor: 'darkgrey',
   padding: 5,
   borderRadius: 10
  },
  bodyTab:{
  flex: 5 ,
  textAlign: 'left'
  },
  containerLogout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  Icon: {
    borderRadius: 25 , 
    marginTop: 20 
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
  },
  touchSubmit:{
    width: WIDTH - 55,
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
  
});
