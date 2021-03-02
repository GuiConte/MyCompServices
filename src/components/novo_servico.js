//imports
import firebase from 'firebase';
import React, {Component} from 'react';
import Styles from './css/cssNovoServ';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, ImageBackground,KeyboardAvoidingView } from 'react-native';
import { Icon,Item, Input, Picker } from 'native-base';
import Icon2 from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements';
import Main from './main';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

function cadastrarServiço(desc,preco,categ){
  if(categ !== '' && categ !== 'categoria' ){
    var serv = {
        desc: desc,
        preco: preco
    }

    var db = firebase.database();

    if(categ === 'computador')
      db.ref("servicos").child("computador").push().set(serv);
    if(categ === 'impressora')
      db.ref("servicos").child("impressora").push().set(serv);
    if(categ === 'rede')
      db.ref("servicos").child("rede").push().set(serv);
    if(categ === 'especifico')
      db.ref("servicos").child("especifico").push().set(serv);

    alert("Serviço cadastrado");
    Actions.pop();
  }
  else{
    alert('Selecione a Categoria do Serviço');
  }
}

class Novo_Servico extends Component {
  constructor(props) {
    super(props);
    this.state = { descricao: '',
                   preco:0,
                   categoria: 'categoria' };
  }

  onValueChange(value: string){
    this.setState({categoria:value})
  }

  render(){
        return(
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-150} enabled>
            <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
              <View style={{flex:0.14, paddingBottom:15, flexDirection:'row'}}>
                <View style={{flex:0.05}}/>
                <View style={{flex:0.05, flexDirection:'column', justifyContent:'center'}}>
                  <TouchableOpacity onPress={() => {Actions.pop();}}>
                    <Icon name="arrow-back" style={{color:'white'}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.88,borderColor:'white',flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{textAlign:'center' , fontSize: 25 , color:'white', fontWeight: 'bold'}}>Cadastrar Serviço</Text>
                </View>
              </View>
              <View style={{flex:0.70, flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:'85%',height:'90%',backgroundColor:'rgba(255,255,255,0.2)', borderRadius:20,flexDirection:'row', justifyContent:'center'}}>
                  <View style={{width:'90%',height:'90%',flexDirection:'column', justifyContent:'center'}}>
                  <Text style={{marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Informe a Descrição:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                    <Icon2 active name='price-tag' style={{marginLeft:10, color:'black'}}/>
                    <Input placeholder='Descrição' placeholderTextColor='black' style={{color:'black'}} 
                      onChangeText={(descricao) => this.setState({descricao})}/>
                  </Item>
                  <Text style={{marginTop:20,marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Informe o Preço:</Text>
                  <Item rounded style={{marginTop:5,backgroundColor:'white',borderColor:'transparent'}}>
                      <Icon2 active name='credit' style={{marginLeft:10, color:'black'}}/>
                      <Input placeholder='Preço' placeholderTextColor='black' style={{color:'black'}} 
                          keyboardType='numeric' onChangeText={(preco) => this.setState({preco})}/>
                  </Item>
                  <Text style={{marginTop:20,marginLeft:10,fontSize: 18, color: 'white', fontWeight: 'bold',}}>Selecione a Categoria:</Text>
                  <Item picker rounded style={{marginTop:5,backgroundColor:'white'}}>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Selecione a Categoria"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.categoria}
                      onValueChange={(itemValue, itemIndex) => this.setState({categoria: itemValue})}
                    >
                      <Picker.Item label="Selecione..." value="categoria" />
                      <Picker.Item label="Computador" value="computador" />
                      <Picker.Item label="Impressora" value="impressora" />
                      <Picker.Item label="Rede" value="rede" />
                      <Picker.Item label="Especifico" value="especifico" />
                    </Picker>
                  </Item>
                  </View>
                </View>
              </View>
              <View style={{flex:0.25,flexDirection:'row', justifyContent:'center'}}>
                <View style={{width:'90%'}}>
                  <TouchableOpacity style={{marginTop:20, backgroundColor: '#023672', borderRadius:180}} onPress={() => {cadastrarServiço(this.state.descricao,this.state.preco,this.state.categoria);}}>
                    <Text style={{paddingTop:6, paddingBottom:8, fontSize: 25,  color: 'white', fontWeight: 'bold', textAlign: 'center'}}> Cadastrar </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
             </KeyboardAvoidingView>
         
        );
   }
}



export default Novo_Servico;
