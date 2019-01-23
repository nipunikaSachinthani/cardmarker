

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Profile from './app/components/Profile'; 
import QRScane from './app/components/QRScane';





const Application = createStackNavigator({
  Splash : { screen: Splash},
  Login  : { screen: Login},
  Profile : { screen: Profile},
  QRScane: { screen: QRScane},
  
},{
 mode:'model',
 headerMode:'none'
  
});
//props.navigation.navigate('QRScane');

// export  class App extends Component {
//   render() {
//     return ( 
//      <Application />
//     );
//   }
// }

export default  createAppContainer(Application);


