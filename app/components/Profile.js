
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage, 
  ImageBackground,
  ActivityIndicator, 
  Dimensions,
  Modal,
} from 'react-native';




export  class Profile extends Component {
    static navigationOption = {
        header:null 
    }

    constructor(props){

        super(props);
        this.state = {
            date : '',
            clz : '',
            cardMarker : '',
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
}
         _loadInitialState = async() => {

        var value = await AsyncStorage.getItem('attendance');

        if(value!==null){
            this.props.navigation.navigate('QRScane');
        }
    }
    
    render() {
    return (
        <ImageBackground source={require('../../img/h.jpg')}
       style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>
       
        
        <View style = {styles.container}>
        
           <Text style = {styles.header}>Select Class</Text>

            <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
            placeholder = 'Enter Date'
            placeholderTextColor = 'black'
            underlineColorAndroid = 'transparent'
            onChangeText={ (date ) => this.setState({date})
             }
                                
            />

           <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
              placeholder = 'Enter Class ID'
             // secureTextEntry = {true}
              placeholderTextColor = 'black'
              underlineColorAndroid = 'transparent' 
            onChangeText={ (clz) => this.setState({clz})
             }
                               
            />

            <TouchableOpacity  
                style = {styles.btn}
                onPress = {this.Submit}> 
                <Text style={styles.subText}> Submit </Text>
            </TouchableOpacity>
     
           
        </View>
       
        </KeyboardAvoidingView> 
        </ImageBackground>
     
    );
  }

  
  Submit = () => {
      
     fetch('https://clzmate.herokuapp.com/attendance/newWeekAttendance/',{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify({
              date : this.state.date ,
              clz : this.state.clz,
              cardMarker : AsyncStorage.getItem('userId')
          })
      })

         .then((responce) => responce.json())
         .then((res) =>{
            if(res.state === true) {
                alert('Submit succeed');
                this.props.navigation.navigate('QRScane');
            }
            else{
                console.log("else part")
                alert('No class');
            }
            
        }) 
        .done();
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        
    },
   

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
   
    

    textInput:{
       alignSelf: 'stretch',
       borderRadius: 4,
       padding: 20,
       marginBottom: 30,
       backgroundColor: 'rgba(128,128,128,0.7)',
       alignItems: 'center',
       justifyContent: 'center',
       

    },

    btn:{
        alignSelf: 'stretch',
        backgroundColor: 'rgba(128,128,128,1)',
        padding: 20,
        alignItems: 'center',
        marginBottom: 60,
        },
    subText:{
        fontSize:16,
        fontWeight: "bold"
    

    },
    header :{
        fontSize:26,
        fontWeight: "bold",
        marginBottom:60,
        color:'rgb(255,255,255)',

    

    },
});
export default Profile;