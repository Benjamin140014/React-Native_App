import React , { Component , useState } from 'react';
import { View  , Text , TouchableOpacity , Image , StyleSheet , Dimensions , ScrollView , TextInput, Alert  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import person1 from '../../image/person1.jpg' ; 
import person2 from '../../image/logo.png' ;

const { width: WIDTH } = Dimensions.get('window');

function Overview({ navigation }) {
  return (
    <View style = {styles.OverviewContainer}>
      <Text style = {styles.textNabar} >system overview</Text>
    <ScrollView>
      <View style = {styles.descripsionOverview}>
     <Text> Image about system </Text>
      </View>
    </ScrollView>
    </View>
  );
}

function AboutUs({ navigation }) {
  return (
    <View style = {styles.AboutUsContainer} >
       <Text style = {styles.textNabar} >About Us</Text>
       <ScrollView>
      <View style = {styles.person1Container}>
        <Image source= {person1} style = {styles.person1Image} />
        <View  style= {styles.descripsionPerson1} >
        <Text  > Name: Ho Trung Quan  </Text>
        <Text  > School: HCMUT  </Text>
        <Text  > Major: Automation and control </Text>
        <Text > Address:Go Vap District , HCM City </Text>
        </View>
      </View>
      <View style = {styles.person2Container}>
      <Image source= {person2} style = {styles.person2Image} />
        <View  style= {styles.descripsionPerson1} >
        <Text  > Name: Ho Trung Quan  </Text>
        <Text  > School: HCMUT  </Text>
        <Text  > Major: Automation and control </Text>
        <Text > Address:Go Vap District , HCM City </Text>
        </View>
        
      </View>
      </ScrollView>
    </View>
  );
}

class  Contact extends  Component{
  constructor(props){
    super(props) 
    this.state= {
      name: '',
      email:'',
      comment: ''
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  submit= ()=>{
    console.log(this.state) ;
    if (this.state.name === '' || this.state.email === '' || this.state.comment) {
      Alert.alert('Enter details to ask !')
    }else(
      Alert.alert('The comment has been sent ')
    )
  }
  render(){
    return(
      <View style = {styles.ContactContainer}>
      <Text style = {styles.textNabar} >Contact</Text>
      <ScrollView>
        <View style = {styles.contactText}>
       <Text>Contact us and we'll get back to you within 24 hours.</Text>
       <Text>HCM, VN</Text>
       <Text>+84 376007188</Text>
       <Text> hotrungquan0167@gmail.com </Text>
       </View>
       <View style={styles.contactForm}>
          <TextInput placeholder={'Name'} value={this.state.name}
            onChangeText={(val) => this.updateInputVal(val, 'name')}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 10 }} />
          <TextInput placeholder={'Email'} value={this.state.email}
            onChangeText={(val) => this.updateInputVal(val, 'email')}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , margin: 10 }} />
          <TextInput multiline={true} numberOfLines={4} placeholder={'Comment'} 
           value={this.state.comment}
           onChangeText={(val) => this.updateInputVal(val, 'comment')}
           style={{ height: 90, borderColor: 'gray', borderWidth: 1 , margin: 10 }} />
      <TouchableOpacity style={styles.button} onPress={()=> this.submit() } > 
        <Text>Submit</Text>
      </TouchableOpacity>
      </View>
      
      </ScrollView>
      </View>
    )
  }
}

const Drawer = createDrawerNavigator();

export default function overviewSystem() {
  return (
      <Drawer.Navigator initialRouteName="Overview" >
       <Drawer.Screen name="Overview" component={Overview}  options={({drawerIcon: () => <Ionicon name= {'ios-home'} size={24} /> })} />
       <Drawer.Screen name="About Us" component={AboutUs} options={({drawerIcon: () => <Ionicon name= {'ios-person'} size={24} /> })} />
       <Drawer.Screen name = "Contact" component={Contact} options={({drawerIcon: () => <Ionicon name= {'ios-people'} size={24} /> })} />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  OverviewContainer:{
   flex: 1 ,
   alignItems: 'center',
  },
  descripsionOverview:{
    flex: 1,
    width: WIDTH - 30, 
    height: 510 ,
    backgroundColor: 'lightgray' ,
    marginTop: 80 , 
    alignItems: 'center' , 
    justifyContent: 'center' ,
    borderRadius: 10
  },

  AboutUsContainer:{
    flex: 1 ,
    alignItems: 'center'
  },
  textNabar:{
    fontSize: 28 ,
    backgroundColor: 'steelblue',
    padding: 15 ,
    textAlign: 'center' ,
    position: 'absolute' , 
    left: 0 , 
    right: 0 
  },
  person1Container:{
   flex: 1,
   width: WIDTH -50, 
   height: 240 ,
   backgroundColor: 'lightgray' ,
   marginTop: 80 , 
   alignItems: 'center' , 
   borderRadius: 10
  },
  person1Image:{
    width: 110 ,
    height: 110 ,
    borderRadius: 50, 
    marginTop: 5
  },
  person2Image:{
    width: 110 ,
    height: 110 , 
    marginTop: 5
  },
  descripsionPerson1:{
     alignItems: 'center', 
    
  },
  descripsionPerson2:{
    alignItems: 'center', 
  },
  person2Container:{
   width: WIDTH -50,
   height: 240 , 
   backgroundColor:'lightgray',
   marginTop: 10 ,
   alignItems: 'center',
   borderRadius: 10
  },

  ContactContainer:{
    flex: 1 ,
    alignItems: 'center',

  },
  contactText: {
   width: WIDTH -50,
   height: 150 , 
   marginTop: 100 ,
   paddingTop: 30,
   backgroundColor: 'lightgray',
   alignItems: 'center',
   borderRadius: 10
  } ,
  contactForm:{
    width: WIDTH -50,
    height: 300 , 
    backgroundColor:'lightgray',
    marginTop: 10 ,
    borderRadius: 10
  } ,
  button: {
      alignItems: "center",
      backgroundColor: "dimgray",
      padding: 15 ,
      margin: 10 ,
      borderRadius: 25
    }
})