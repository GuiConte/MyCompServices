import firebase from 'firebase';
import React, {Component} from 'react';
import Styles from './css/cssMain'
import { Text, View, TouchableOpacity, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { Form, Item, Label, Input, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import { initialState } from './actions';
import RNPrint from 'react-native-print';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

var Relatorio = '';
var date;
var data;
var dataBD
var time;

function atualizaData(){
  date = new Date();
  data = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
  dataBD =  date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  time = date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
}

function insereOrdemServ(id,cli,hash,total,comp,imp,red,esp){
  firebase.database().ref("ordem_serv").child(id).child('cliente').set(cli);
  firebase.database().ref("ordem_serv").child(id).child('data').set(dataBD);
  firebase.database().ref("ordem_serv").child(id).child('horario').set(time);
  firebase.database().ref("ordem_serv").child(id).child('total').set(total);
  firebase.database().ref("ordem_serv").child(id).child('computador').set(comp);
  firebase.database().ref("ordem_serv").child(id).child('impressora').set(imp);
  firebase.database().ref("ordem_serv").child(id).child('rede').set(red);
  firebase.database().ref("ordem_serv").child(id).child('especifico').set(esp);

  if(hash != 'OK'){
    let aux = firebase.auth().currentUser.email;
    let tecnico = aux.substring(0,aux.indexOf("@"));
    firebase.database().ref('/ordens_abertas/'+tecnico+'/'+hash).remove();
  }
  firebase.database().ref("idVisita").set(parseInt(id)+1);
}

async function printHTML(text,amount,cli) {
    await RNPrint.print({
      html: "<h1>MyComp Soluções em Informatica </h1>"+
            "<h2>Data: "+data+"  -  Horario: "+time+ "</h2>" + 
            "<h2>Cliente: "+cli.nome+"         <br/>CPF/CNPJ: "+cli.documento+
            "<br/>Endereço: "+cli.endereco+"              <br/> Telefone: "+cli.telefone+"</h2>" +
            text + 
            "<h1>TOTAL DO SERVIÇO: <font color='red'>R$ " + amount + "</font></h1>" +
            "<h2>Assinatura:________________________</h2>"
    })
  }

//Main
const Main = props => {
    return (
      <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
        <View style={{flex: 1,flexDirection:'column'}}>
        <View style={{flex: 1,flexDirection:'row'}}> 
            <View style={{flex:0.9, borderColor:'white',flexDirection:'column', justifyContent:'center',borderBottomColor:'rgba(255,255,255,0.1)', borderBottomWidth:1,paddingBottom:8}}>
              <Text style={{textAlign:'center' , fontSize: 25 , color:'white', fontWeight: 'bold'}}>Categorias de Serviço</Text>
            </View>
            <View style={{flex:0.1, borderColor:'white',flexDirection:'column', justifyContent:'center',borderBottomColor:'rgba(255,255,255,0.1)', borderBottomWidth:1,paddingBottom:8,paddingTop:'1%'}}>
              <TouchableOpacity onPress={() => {
                Alert.alert('Sair','Deseja abandonar a OS?',[
                    {text: 'Sim', onPress: () => { props.initialState();
                                                   Actions.popTo('capa');}},
                    {text: 'Não', onPress: () => { }},
                  ],
                  {cancelable:false}, 
                );
              }}>
                <Icon name="ios-close-circle-outline" style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
            </View>
          <View style={Styles.styleViewPrincipal}>
            <View>
              <TouchableOpacity style={Styles.buttonComp} onPress={() => { Actions.computador(); }}>
               <Image
                  style={{width: 140, height: 140}}
                  source={require('./imgs/iconpc.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.buttonRede} onPress={() => { Actions.rede(); }}>
               <Image
                  style={{width: 140, height: 140}}
                  source={require('./imgs/iconrede.png')}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={Styles.buttonImp} onPress={() => { Actions.impressora(); }}>
               <Image
                  style={{width: 140, height: 140}}
                  source={require('./imgs/iconimp.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.buttonOutros} onPress={() => { Actions.especifico(); }}>
               <Image
                  style={{width: 140, height: 140}}
                  source={require('./imgs/iconoutros.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
  
          <View style={{flex:1.5, flexDirection:'row', backgroundColor:'rgba(30,30,30,0.5)'}}>
            <View style={{flex:0.6,borderColor:'white',marginTop:'4.5%'}}>
              <Text style={{fontSize: 23 , color:'white', fontWeight: 'bold'}}>Total: R${props.amount}</Text>
            </View>
            <View style={{flex:0.4,marginTop:'2%'}}>
              <TouchableOpacity style={{backgroundColor: '#023672', borderRadius:180, width:'100%',height:'60%',flexDirection:'column',justifyContent:'center'}} 
              onPress={() => {if(props.id != ""){
                                var Cliente = {nome:props.nome,
                                endereco:props.endereco,
                                telefone:props.telefone,
                                documento:props.documento};
                                atualizaData();
                                insereOrdemServ(props.id,Cliente,props.hash,props.amount,props.computador,props.impressora,props.rede,props.especifico);
                                printHTML(props.services, props.amount, Cliente);
                                props.initialState();
                                Actions.popTo('capa');
                              }else{
                                alert('Voce precisa inserir\npelo menos um serviço')
                              }
               }}>
                <Text style={{color: 'white', fontSize:23, fontWeight: 'bold', textAlign: 'center'}}> Finalizar </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ImageBackground>
    );
}


const mapStateToProps = state => (
  {
    amount : state.main.amount,
    services : state.main.services,
    nome: state.main.nome,
    endereco: state.main.endereco,
    telefone: state.main.telefone,
    documento: state.main.documento,
    hash: state.main.hash,
    id: state.main.id,
    computador: state.main.computador,
    impressora: state.main.impressora,
    rede: state.main.rede,
    especifico: state.main.especifico
  }
)

export default connect(mapStateToProps, { initialState })(Main);