import firebase from 'firebase';
import React, {Component} from 'react';
import Styles from './css/cssLogin'
import { Text, ScrollView, View, TouchableOpacity, Image, TextInput, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Form, Item, Label, Input, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

 async function login(email,password){
    const usuario = firebase.auth();
    var control = false;

    await firebase.database().ref('/usuarios').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(email == val.email && password == val.senha){
            control = true;
        }
      });
    }
  }).then(() =>{
    if(control == true){
      usuario.signInWithEmailAndPassword(email, '$My)]lC!Z0F[1%9#P*').catch(function(error) {
        // Handle Errors here.
        alert(error.message)
      });
    
      usuario.onAuthStateChanged(function(user) {
        if (user) {
          Actions.capa();
        } 
      });
    }else{
      alert('Usuario e/ou senha invalidos !');
    }
  });

}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: '',
                   pass:'' };
  }

  render(){
    return ( 
      
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-50} enabled>
        <View>
        <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
          <View>
            <Image
            source={require('./imgs/logo.png')}
            style={Styles.ViewLogo}
            />
          </View>
          <View style={Styles.ViewForm}>
      			<Item rounded style={{backgroundColor:'rgba(255,255,255,0.2)',borderColor:'transparent'}}>
      				<Icon active name='mail' style={{marginLeft:10, color:'white'}}/>
      				<Input placeholder='Email' placeholderTextColor='white' style={{color:'white'}} 
      				keyboardType='email-address' autoCapitalize={'none'}
      				onChangeText={(user) => this.setState({user})}/>
      			</Item>
      			<Item rounded style={{marginTop:20,backgroundColor:'rgba(255,255,255,0.2)',borderColor:'transparent'}}>
      				<Icon active name='lock' style={{marginLeft:10, color:'white'}}/>
      				<Input placeholder='Senha' placeholderTextColor='white' style={{color:'white'}} 
      				secureTextEntry autoCapitalize={'none'} onChangeText={(pass) => this.setState({pass})}/>
      			</Item>
            <TouchableOpacity style={Styles.buttonLogin} onPress={() => { login(this.state.user,this.state.pass);}}>
              <Text style={Styles.buttonText}> Login </Text>
            </TouchableOpacity>
          </View>
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default (Login);