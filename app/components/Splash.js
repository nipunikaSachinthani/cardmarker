

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator, 
  Dimensions,
  Modal,
} from 'react-native';




export class Splash extends Component {
    static navigationOptions = {
       header : null 
   }
       componentWillMount(){
           setInterval(()=>{
               this.props.navigation.navigate('Login');
           },2000)
       }    
  
    render() {
    return (
       
        < ImageBackground source = {require('../../img/c.jpg')}
           style={styles.backgroundImage}>
        
        <View style = {styles.container}>
           
              <Text style = {styles.text1}>- Welcome -</Text>
        </View>
        
        </ ImageBackground>
     
    );
  }
} 

const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
    
   },
   backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    
},
text1:{
    fontSize:30,
    fontWeight: "bold",
    marginBottom:60,
    color:'black',
    alignItems:'center',
},

});
export default Splash;