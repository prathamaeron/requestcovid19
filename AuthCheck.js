import React, {useState, useEffect} from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {ActivityIndicator} from "react-native-paper"

import auth from "@react-native-firebase/auth"
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Login from "./screens/login"
import Request from "./screens/request"
import RequestVentilator from "./screens/requestVentilator"
import RequestBed from "./screens/requestBed"
import RequestPlasma from "./screens/requestPlasma"
import myRequests from "./screens/myRequests"
import Contact from "./screens/Contact"

const Loading = () => {
    return(
        <ActivityIndicator size="large"/>
    )
}



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



function RequestStack ({route}) {
    return(
      <Stack.Navigator headerMode = "none">
        <Stack.Screen name = "Request" component={Request} initialParams = {{user: route.params.user}}/>
        <Stack.Screen name = "Plasma" component={RequestPlasma} initialParams = {{user: route.params.user}}/>
        <Stack.Screen name = "Bed" component={RequestBed} initialParams = {{user: route.params.user}}/>
        <Stack.Screen name = "Oxygen" component={RequestVentilator} initialParams = {{user: route.params.user}}/>
        <Stack.Screen name = "Contact" component={Contact} initialParams = {{user: route.params.user}}/>
      </Stack.Navigator>
    )
  }

const AuthCheck = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing){
    return(
    <Loading />
    )
  };

  if (!user) {
    return (
        <>
    <StatusBar style="auto"/>
    <NavigationContainer>
    <Stack.Navigator headerMode = "none">
      <Stack.Screen name = "Login" component={Login}/>
    </Stack.Navigator>
  </NavigationContainer>
  </>
    )
  } else{
    return(
        <>
    <StatusBar style="auto"/>
    <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Request') {
            iconName = focused
              ? 'add-circle'
              : 'add-circle-outline';
          } else if (route.name === 'My Requests') {
            iconName = focused ? 'albums' : 'albums-outline';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1E287A',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Request" component={RequestStack} initialParams = {{user: user}}/>
        <Tab.Screen name="My Requests" component={myRequests} initialParams = {{user: user}}/>
        {/* <Tab.Screen name="Contact" component={Contact} initialParams = {{user: user}}/> */}
      </Tab.Navigator>
  </NavigationContainer>
  </>
    )
  }
}
export default AuthCheck;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});