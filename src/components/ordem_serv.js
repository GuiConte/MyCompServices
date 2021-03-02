import firebase from 'firebase';
import React, {Component} from 'react';
import Styles from './css/cssComputador'
import { Text, View, ScrollView, TouchableOpacity, Dimensions, ImageBackground ,FlatList } from 'react-native';
import { Icon } from 'native-base';
import Main from './main';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import { Cliente } from './actions';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

var os = new Array();

class Ordem_Serv extends Component {
    constructor(props){
    super(props);
    this.state={ordens:[]}
    }

    componentDidMount(){
     // const { currentUser } = firebase.auth();
     // var aux = currentUser.email;
     // var tecnico = aux.substring(0,aux.indexOf("@"));
      firebase.database().ref(`/ordens_abertas/${tecnico}`).on('value',(snap) =>{
		  os = new Array();
        snap.forEach((child) => {
          os.push({
            id: child.key,
            descricao: child.val().descricao,
            cliente: child.val().cliente,
            endereco: child.val().endereco,
            telefone: child.val().telefone,
            documento: child.val().documento,
            hash: child.val().hash
          });
        });
        this.setState({ordens: os});
      });
    }

    inserirCliente(nome,end,tel,doc,hash){
      var Cliente = {
        nome: nome,
        endereco: end,
        telefone: tel,
        documento: doc,
        hash: hash
      }
      this.props.Cliente(Cliente);
      Actions.main();
    }

    keyExtractor = (item) => item.id;

    renderItem = ({item}) =>        
                        <TouchableOpacity style={{marginBottom:5, borderBottomColor:'rgba(255,255,255,0.2)',backgroundColor:'rgba(255,255,255,0.2)' , borderBottomWidth:1}} onPress={() => { 
                          this.inserirCliente(item.cliente,item.endereco,item.telefone,item.documento,item.hash);
                         }}>
                          <View style={{flex:1, flexDirection:'row', margin:10}}>
                            <View style={{flex:0.02}}/>
                            <View style={{flex:0.9}}>
                              <Text style={{color: 'white',fontSize: 18 , fontWeight: 'bold'}}>{item.descricao}</Text>
                              <Text style={{color: 'white'}}>{item.cliente}</Text>
                              <Text style={{color: 'white'}}>{item.endereco}</Text>
                            </View>
                            <View style={{flex:0.1, flexDirection:'column', justifyContent:'center'}}>
                              <Icon name='arrow-forward' style={{color: 'white'}}/>
                            </View>
                          </View>
                        </TouchableOpacity>

    render(){
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
          <View style={{flex:0.14, paddingBottom:8, flexDirection:'row', borderBottomColor:'rgba(255,255,255,0.1)', borderBottomWidth:1}}>
            <View style={{flex:0.05}}/>
            <View style={{flex:0.05, flexDirection:'column', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => {Actions.pop();}}>
                <Icon name="arrow-back" style={{color:'white'}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex:0.88,borderColor:'white',flexDirection:'column', justifyContent:'center'}}>
              <Text style={{textAlign:'center' , fontSize: 25 , color:'white', fontWeight: 'bold'}}>Ordens Pendentes</Text>
            </View>
          </View>
          <ScrollView style={{flex:0.90,marginBottom:25}}>
            <FlatList
              data = {this.state.ordens} 
              keyExtractor = {this.keyExtractor}
              renderItem = {this.renderItem}
            />
          </ScrollView>
        </ImageBackground>
      </View>   
    );
  }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps,{ Cliente })(Ordem_Serv);
