//imports
import firebase from 'firebase';
import React, {Component} from 'react';
import Styles from './css/cssCliente';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, ImageBackground,KeyboardAvoidingView } from 'react-native';
import { Icon,Item, Input, Picker } from 'native-base';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Main from './main';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import { Cliente } from './actions';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: '',
                   endereco: '',
                   telefone: '',
                   documento: '' };
  }

  inserirCliente(nome,end,tel,doc){
    var Cliente = {
      nome: nome,
      endereco: end,
      telefone: tel,
      documento: doc,
      hash: 'OK'
    }
    this.props.Cliente(Cliente);
    Actions.main();
  }

  render(){
        return(
          <KeyboardAvoidingView enabled>
             <ScrollView>
            <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
         
              <View style={{flex:0.14, paddingBottom:15, flexDirection:'row'}}>
                <View style={{flex:0.05}}/>
                <View style={{flex:0.05, flexDirection:'column', justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => {Actions.pop();}}>
                    <Icon name="arrow-back" style={{color:'white'}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.88,borderColor:'white',flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{textAlign:'center' , fontSize: 25 , color:'white', fontWeight: 'bold'}}>Informações do Cliente</Text>
                </View>
              </View>
              <View style={{flex:0.70, flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:'85%',height:'100%',backgroundColor:'rgba(255,255,255,0.2)', borderRadius:20,flexDirection:'row', justifyContent:'center'}}>
                  <View style={{marginTop:10 ,width:'90%',height:'90%',flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Nome:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                    <Icon2 active name='user' style={{marginLeft:10, color:'black'}}/>
                    <Input placeholder='Nome' placeholderTextColor='black' style={{color:'black'}} 
                      onChangeText={(nome) => this.setState({nome})}/>
                  </Item>
                  <Text style={{marginTop:10,marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Endereço:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                      <Icon2 active name='home' style={{marginLeft:10, color:'black'}}/>
                      <Input placeholder='Endereço' placeholderTextColor='black' style={{color:'black'}} 
                      onChangeText={(endereco) => this.setState({endereco})}/>
                  </Item>
                  <Text style={{marginTop:10,marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Telefone:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                      <Icon2 active name='phone' style={{marginLeft:10, color:'black'}}/>
                      <Input placeholder='Telefone' placeholderTextColor='black' style={{color:'black'}} 
                          keyboardType='numeric' onChangeText={(telefone) => this.setState({telefone})}/>
                  </Item>
                  <Text style={{marginTop:10,marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Documento:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                      <Icon3 active name='idcard' style={{marginLeft:10, color:'black'}}/>
                      <Input placeholder='Documento' placeholderTextColor='black' style={{color:'black'}} 
                        onChangeText={(documento) => this.setState({documento})}/>
                  </Item>
                  </View>
                </View>
              </View>
              <View style={{flex:0.20,flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:'90%'}}>
                  <TouchableOpacity style={{marginTop:20, backgroundColor: '#023672', borderRadius:180}} onPress={() => {this.inserirCliente(this.state.nome,this.state.endereco,this.state.telefone,this.state.documento);}}>
                    <Text style={{paddingTop:6, paddingBottom:8, fontSize: 25,  color: 'white', fontWeight: 'bold', textAlign: 'center'}}> Prosseguir </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </ImageBackground>
            </ScrollView>
             </KeyboardAvoidingView>
         
        );
   }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { Cliente })(Client);
