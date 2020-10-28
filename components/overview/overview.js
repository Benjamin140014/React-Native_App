import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView 
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import io from 'socket.io-client';
import person1 from '../../image/Ben.jpg';
import person2 from '../../image/mtp.jpg';
import descriptions1 from '../../image/SystemDescriptions.png' ; 
import descriptions2 from '../../image/PLCvsServer.png' ; 
import descriptions3 from '../../image/wincc.png' ; 

const {width: WIDTH , height: HEIGHT} = Dimensions.get('window');

class Overview extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          carouselItems: [
          {
              title:"System descriptions", 
              image: descriptions1
          },
          {
              title:"OPC UA Comunication",
              image: descriptions2
          },
          {
              title:"OPC UA PLC with Server",
              image: descriptions3
          }
      ]}
  }

  _renderItem({item,index}){
      return (
          <View style={{flex:1,justifyContent:'center',alignItems:'center' , borderRadius: 5 }}>    
              <Image source = {item.image} style = {styles.containerOverview} />   
              <Text style={{ fontWeight:'bold' , fontSize: 20}} >{item.title}</Text>
          </View>
      )
  }

  render() {
      return (
        <View style={styles.OverviewContainer}>
       <Text style={styles.textNabar}>System Overview</Text>
       <SafeAreaView style={styles.descripsionOverview}>
          <Carousel
                  data={this.state.carouselItems}
                  sliderWidth={WIDTH-30}
                  itemWidth={WIDTH-30}
                  renderItem={this._renderItem}
              />
       </SafeAreaView>
      </View>
      );
  }
}


function AboutUs({navigation}) {
  return (
    <View style={styles.AboutUsContainer}>
      <Text style={styles.textNabar}>About Us</Text>
      <ScrollView>
        <View style={styles.person1Container}>
          <Image source={person1} style={styles.person1Image} />
          <View style={styles.descripsionPerson1}>
            <Text> Name: Ho Trung Quan </Text>
            <Text> School: HCMUT </Text>
            <Text> Major: Automation and control </Text>
            <Text> Address:Tan Binh District , HCM City </Text>
          </View>
        </View>
        <View style={styles.person2Container}>
          <Image source={person2} style={styles.person1Image} />
          <View style={styles.descripsionPerson1}>
            <Text> Name: Mang Tan Phat </Text>
            <Text> School: HCMUT </Text>
            <Text> Major: Automation and control </Text>
            <Text> Address:10 District , HCM City </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      comment: '',
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  submit = () => {
    if (
      this.state.name === '' ||
      this.state.email === '' ||
      this.state.comment === ''
    ) {
      Alert.alert('Enter details to ask !');
    } else {
      this.socket = io('http://180.214.236.174:4000');
      this.socket.emit('request',{name: this.state.name , email: this.state.email , comment: this.state.comment})
      this.socket.on('alertEmail',(data)=>{
        Alert.alert(data);
      })
    }
  };
  render() {
    return (
      <View style={styles.ContactContainer}>
        <Text style={styles.textNabar}>Contact</Text>
        <ScrollView>
          <View style={styles.contactText}>
            <Text>Contact us and we'll get back to you within 24 hours.</Text>
            <Text>HCM,VN</Text>
            <Text>+84 376007188</Text>
            <Text> hotrungquan0167@gmail.com </Text>
          </View>
          <View style={styles.contactForm}>
            <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={val => this.updateInputVal(val, 'name')}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                margin: 10,
              }}
            />
            <TextInput
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={val => this.updateInputVal(val, 'email')}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                margin: 10,
              }}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Comment'}
              value={this.state.comment}
              onChangeText={val => this.updateInputVal(val, 'comment')}
              style={{
                height: 110,
                borderColor: 'gray',
                borderWidth: 1,
                margin: 10,
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.submit()}>
              <Text style={styles.textSubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Drawer = createDrawerNavigator();

export default function overviewSystem() {
  return (
    <Drawer.Navigator initialRouteName="Overview">
      <Drawer.Screen
        name="Overview"
        component={Overview}
        options={{drawerIcon: () => <Ionicon name={'ios-home'} size={24} />}}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{drawerIcon: () => <Ionicon name={'ios-person'} size={24} />}}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{drawerIcon: () => <Ionicon name={'ios-people'} size={24} />}}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  containerOverview:{
   flex: 1 , 
   alignItems: 'center' , 
   justifyContent: 'center', 
   borderRadius: 5
  },
  OverviewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
  },
  descripsionOverview: {
    flex: 1,
    width: WIDTH - 20,
    backgroundColor: 'cadetblue',
    marginTop: 57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  AboutUsContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
  },
  textNabar: {
    fontSize: 20,
    backgroundColor: 'steelblue',
    padding: 15,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    fontWeight: 'bold',
  },
  person1Container: {
    flex: 1,
    width: WIDTH - 50,
    height: 240,
    backgroundColor: 'cornflowerblue',
    marginTop: 80,
    alignItems: 'center',
    borderRadius: 10,
  },
  person2Container: {
    flex: 1,
    width: WIDTH - 50,
    height: 240,
    backgroundColor: 'cornflowerblue',
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 10,
  },
  person1Image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 25,
  },
  descripsionPerson1: {
    alignItems: 'center',
  },
  ContactContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightslategrey',
  },
  contactText: {
    width: WIDTH - 50,
    height: 150,
    marginTop: 100,
    paddingTop: 30,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 10,
    textAlign: 'center',
  },
  contactForm: {
    width: WIDTH - 50,
    height: 300,
    backgroundColor: 'lightgray',
    marginTop: 10,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'dimgray',
    padding: 5,
    margin: 5,
    borderRadius: 25,
  },
  textSubmit: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
