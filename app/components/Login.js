
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
import JwtDecode from 'jwt-decode';


export  class Login extends Component {
    static navigationOption = {
        header:null 
    }

    constructor(props){
        super(props);
        this.state = {
            email :'',
            password :'',
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
}
         _loadInitialState = async() => {

        var value = await AsyncStorage.getItem('user');

        if(value!==null){
            this.props.navigation.navigate('Profile');
        }
    }
    
    render() {
    return (
        <ImageBackground source={require('../../img/e.jpg')}
       style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>
       
        
        <View style = {styles.container}>
        
           <Text style = {styles.header}>LOGIN</Text>

            <TextInput
            style = {styles.textInput} 
            keyboardType = 'email-address'
            placeholder = 'Enter your Username'
            placeholderTextColor = 'black'
            underlineColorAndroid = 'transparent'
            onChangeText={ (email ) => this.setState({email})
             }
                                
            />

           <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
              placeholder = 'Enter Your password'
              secureTextEntry = {true}
              placeholderTextColor = 'black'
              underlineColorAndroid = 'transparent' 
            onChangeText={ (password) => this.setState({password})
             }
                               
            />

            <TouchableOpacity  
                style = {styles.btn}
                onPress = {this.login}> 
                <Text style={styles.logText}> Log in </Text>
            </TouchableOpacity>
     
           
        </View>
       
        </KeyboardAvoidingView> 
        </ImageBackground>
     
    );
  }
  login = () => {
      
      fetch('https://clzmate.herokuapp.com/user/login',{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify({
              email : this.state.email ,
              password : this.state.password,
          })
      })

         .then((responce) => responce.json())
         .then((res) =>{
            if(res.state === true) {
                AsyncStorage.setItem('token', res.JWT_Token);
                var decoded = JwtDecode(res.JWT_Token);
                var userId = decoded.user._id;
                AsyncStorage.setItem('userId', userId);
                if(decoded.user.role == 'Card Marker'){
                    this.props.navigation.navigate('Profile');
                    alert('Succesfully Loged in');
                } else {
                    this.props.navigation.navigate('Login');
                    alert('Not Permission');
                }
            }
            else{
                alert('No Responce');
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
       backgroundColor: 'rgba(139,69,19,0.5)',
       alignItems: 'center',
       justifyContent: 'center',
       

    },

    btn:{
        alignSelf: 'stretch',
        backgroundColor: 'rgba(139,69,19,0.9)',
        padding: 20,
        alignItems: 'center',
        marginBottom: 60,
        },
    logText:{
        fontSize:16,
        fontWeight: "bold"
    

    },
    header :{
        fontSize:26,
        fontWeight: "bold",
        marginBottom:60,
        color:'black',

    

    },
});
export default Login;