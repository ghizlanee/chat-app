/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
console.disableYellowBox=true;
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import Login from './Login.js';
import Register from './Register.js';
import Users from './Users.js';
import Chat from './Chat.js';
import Forget from './Forget.js';
import Profile from './Profile.js';
import File from './File.js';




export default App = StackNavigator({
  login:  {screen : Login },
  register : {screen : Register},
  users : {screen : Users,navigationOptions: { header: null }},
  chat : {screen : Chat},
  forget : {screen : Forget},
  file  : {screen  : File},



  //profile:{screen:Profile}

},{
  initialRouteName:'login'
})
