import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Constants } from 'expo';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  state = {image:"",i:0,title:""}
  componentDidMount(){
      fetch(`https://www.reddit.com/r/aww.json`).then(res=>res.json()).then(data=>{
        this.setState({
        image:data.data.children[0].data.thumbnail,
        title:data.data.children[0].data.title
      })
    })
  }
  onPress = () => {
    if(this.state.i<15){
      this.setState({
        i:this.state.i + 1
      })
    }
    fetch(`https://www.reddit.com/r/aww.json`).then(res=>res.json()).then(data=>{
        this.setState({
        image:data.data.children[this.state.i].data.thumbnail,
        title:data.data.children[this.state.i].data.title
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Card>
        <TouchableOpacity style={styles.touch} onPress={this.onPress}>
        <Text>Image Number {this.state.i}</Text>
        </TouchableOpacity>
        <Image style={{width:330,height:300}} source={{uri:this.state.image}}/>
        <Text style={{padding:20}}>{this.state.title}</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },
  touch: {
    backgroundColor:"#ABEBC6",
    padding:20,
    textAlign:"center"
  }
});
