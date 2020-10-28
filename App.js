// App.js

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './components/home/login';
import Signup from './components/home/signup';

import HomeGuide from './components/home/homeGuide'; // gioi thieu app

import Control from './components/control/control'; // panel control chinh

import Dashboard from './components/dashboard/dashboard'; // Dashboard

import Supervisor from './components/supervisor/Tank';

import Overview from './components/overview/overview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

HomeTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'md-home';
          } else if (route.name === 'Control') {
            iconName = 'ios-color-palette';
          } else if (route.name === 'Overview') {
            iconName = focused ? 'ios-alert' : 'md-alert';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'ios-trending-up' : 'md-trending-up';
          } else if (route.name === 'Supervisor Tank') {
            iconName = focused ? 'ios-paper' : 'md-paper';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      }}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeGuide} />
      <Tab.Screen name="Control" component={Control} />
      <Tab.Screen name="Supervisor Tank" component={Supervisor} />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Overview" component={Overview} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'steelblue',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: 'Sign up'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={({title: 'Login'}, {headerLeft: null})}
        />
        <Stack.Screen
          name="Dashboard"
          component={HomeTab}
          options={
            ({title: 'Dashboard'}, {headerLeft: null}, {headerShown: false})
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
