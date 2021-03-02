import firebase from 'firebase';
import React, {Component} from 'react';
import { BackHandler } from 'react-native'
import Styles from './css/cssCapa'
import { Text, View, TouchableOpacity, Dimensions, ImageBackground,Image, Alert } from 'react-native';
import { Container, Item, DeckSwiper, Card, CardItem, Icon  } from 'native-base';
import { Actions } from 'react-native-router-flux'; 
import { connect } from 'react-redux';
import { OrdemServ } from './actions';
import RNPrint from 'react-native-print';

const screenWidth = Math.round(Dimensions.get('window').width);  
const screenHeight = Math.round(Dimensions.get('window').height);  

type Props = {};

const cards = [
  { 
    text: 'Verificar Ordens',
    image: require('./imgs/img1.png'),
    scene: 1
  },
  { 
    image: require('./imgs/img2.png'),
    scene: 2
  },
  { 
    image: require('./imgs/img3.png'),
    scene: 3
  }
];

class Capa extends Component<Props> {
    constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  handleBackButtonClick(){
    return true;
  }

  scene(option){
    if(option == 1)
      Actions.ordem_serv();
    else if(option == 2)
      Actions.cliente();
    else if(option == 3)
      Actions.novo_servico();
  }

  logout(){
    firebase.auth().signOut().then(function() {
      Actions.pop();
    })
  }

  render(){
    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('./imgs/main.jpg')} style={{width:screenWidth,height:screenHeight}}>
          <View style={{flex:0.20, flexDirection:'row'}}>
            <View style={{flex:0.85, flexDirection:'column', paddingTop:'2%'}}>
              <Image style={{marginTop:10}} source={require('./imgs/logo2.png')} />
            </View>
            <View style={{flex:0.15, flexDirection:'column', paddingTop:'8%'}}>
              <TouchableOpacity onPress={() => {
                Alert.alert('Sair','Deseja sair ?',[
                    {text: 'Sim', onPress: () => { this.logout(); }},
                    {text: 'Não', onPress: () => { }},
                  ],
                  {cancelable:false}, 
                );
              }}>
                <Icon active name="ios-log-out" style={{color:'white',fontSize:30}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:0.65}}>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <View style={{alignItems:'center'}}>
                <Card style={{ elevation: 0,backgroundColor: 'rgba(255,255,255,0)',borderColor:'transparent',height: 300,width:300}}>
                  <TouchableOpacity onPress={() => {this.scene(item.scene)}}>
                    <CardItem cardBody style={{backgroundColor: 'rgba(255,255,255,0)'}}>
                      <Image style={{ height: 300,width:300 }} source={item.image} />
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              </View>
            }
          />
          </View>
          <View style={{ flex:0.20, backgroundColor: 'rgba(30,30,30,0.5)'}}>
            <Text style={{paddingTop: 10, textAlign:'center' , fontSize: 20 , color:'white'}}>Arraste para os lados</Text>
            <Text style={{textAlign:'center' , fontSize: 20 , color:'white'}}>para navegar entre as opções</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { OrdemServ })(Capa);