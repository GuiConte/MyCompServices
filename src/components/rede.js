import firebase from 'firebase';
import React, {Component} from 'react';
import { CheckBox } from 'react-native-elements';
import Styles from './css/cssRede'
import { Text, View, ScrollView, TouchableOpacity, Dimensions, ImageBackground ,FlatList } from 'react-native';
import { Icon } from 'native-base';
import Main from './main';
import Prompt from 'react-native-prompt';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import { Services, OrdemServ} from './actions';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

var Service = {
  equip: '',
  itens: '',
  price: 0
}

var id;
var countCheck = 0;

var items = new Array();
var check = new Array();


class Rede extends Component {
    constructor(props){
    super(props);
    this.state={
      todos:[],
      checked:[],
      promptVisible:false
      }
    }

    buttonVoltar(){
      Service.itens = '';
      items = [];
      check=[];
      countCheck=0;
      this.setState({todos: [],checked:[]});
      Actions.pop();
    }

    listarServ(){
      firebase.database().ref(`/servicos/rede`).on('value',(snap) =>{
        var contador = 0;
        snap.forEach((child) => {
          items.push({
            id: child.key,
            desc: child.val().desc,
            preco: child.val().preco,
            posic: contador
          });
          check[contador] = false;
          contador++;
        });
        this.setState({todos: items,checked: check});
      });
    }

    keyExtractor = (item) => item.id;

    renderItem = ({item}) =>        
                        <View style={{marginBottom:5, borderBottomColor:'rgba(255,255,255,0.2)',backgroundColor:'rgba(255,255,255,0.2)' , borderBottomWidth:1}}>
                            <CheckBox
                              title={item.desc}
                              checked={this.state.checked[item.posic]}
                              containerStyle={{backgroundColor:'transparent',borderColor:'transparent' }}
                              textStyle={{marginLeft:20,fontSize: 18,color: 'white',fontWeight: 'bold',}}
                              uncheckedColor='white'
                              checkedColor='white'
                              onPress={() => {this.pressCheck(item.posic)}}
                            />
                        </View>

        buttonOK(equip){
      for(let i=0;i < check.length; i++){
        if(check[i]==true){
          Service.itens += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - '+items[i].desc+'<br/>';
          firebase.database().ref("ordem_serv").child(id).child('servicos').child(equip).child(items[i].desc).set(items[i].preco);
        }
      }
    }

    pressCheck = (data) => {
      if(!check[data]){
          countCheck++;
          Service.price += parseInt(items[data].preco);
      }
      else{
          countCheck--;
          Service.price -= parseInt(items[data].preco);
      }
      check[data] = !check[data];
      this.setState({checked: check})
    }

    componentDidMount(){
      Service.itens = '\n';
      Service.price = 0;
      this.listarServ();
      firebase.database().ref('/idVisita').once('value').then(function(snapshot) {
        id = snapshot.val();
      });
    }

    render(){
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
          <View style={{flex:0.14, paddingBottom:8, flexDirection:'row', borderBottomColor:'rgba(255,255,255,0.1)', borderBottomWidth:1}}>
            <View style={{flex:0.05}}/>
            <View style={{flex:0.05, flexDirection:'column', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => {this.buttonVoltar();}}>
                <Icon name="arrow-back" style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:0.88,borderColor:'white',flexDirection:'column', justifyContent:'center'}}>
              <Text style={{textAlign:'center' , fontSize: 25 , color:'white', fontWeight: 'bold'}}>Rede</Text>
            </View>
          </View>
          <ScrollView style={{flex:0.70}}>
            <FlatList
              data = {this.state.todos} 
              keyExtractor = {this.keyExtractor}
              renderItem = {this.renderItem}
              extraData={this.state}
            />
          </ScrollView>
          <View style={{flex:0.20, backgroundColor: 'rgba(30,30,30,0.5)',flexDirection:'row', justifyContent:'center'}}>
          <View style={{marginTop:8,width:'90%',borderColor:'white'}}>
            <TouchableOpacity style={{backgroundColor: '#023672', borderRadius:180}} onPress={() => {if(countCheck > 0){
                                                                                                                this.setState({promptVisible: true});
                                                                                                            }
                                                                                                            else{
                                                                                                              alert('Não foi marcado nenhum item !'); 
                                                                                                            }}}>
              <Text style={{paddingTop:6, paddingBottom:8, fontSize: 25, color: 'white', fontWeight: 'bold',  textAlign: 'center'}}> Selecionar </Text>
            </TouchableOpacity>
            </View>
            <Prompt
                title="Informe o tipo do equipamento:"
                placeholder="Roteador, modem, switch ..."
                visible={this.state.promptVisible}
                onCancel={() => {this.setState({promptVisible: false});}}
                onSubmit={(value) => {this.setState({promptVisible: false});
                  Service.equip = value+'<br/>';
                  this.buttonOK(value);
                  this.props.Services(Service,0,0,1,0);
                  this.props.OrdemServ(id);
                  items = [];
                  check=[];
                  countCheck=0;
                  this.setState({todos: [],checked:[]});
                  Actions.pop();
                  }}/>
          </View>
        </ImageBackground>
      </View>   
    );
  }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { Services, OrdemServ })(Rede);