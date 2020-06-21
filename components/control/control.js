import React, { Component } from 'react'
import { View, Button, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Dimensions, Image, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ModalPump1 from './Modals/ModalPump1_2' ; 
import MainPanel from './MainPanel/MainPanel' ; 
import ModalPump2 from './Modals/ModalPump3_4' ; 
import ModalPump5 from './Modals/ModalPump5' ;

export default class control extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardNabar} > Control Panel </Text>
        < MainPanel/>
        < ModalPump1 />
        < ModalPump2 />
        < ModalPump5 />
      </View>

    )
  }
}
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    alignItems: 'center'
  },
  dashboardNabar: {
    position: 'absolute',
    left: 0, right: 0,
    backgroundColor: 'lightslategrey',
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  }
})
