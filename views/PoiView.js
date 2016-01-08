"use strict"

var React = require("react-native");
var Utils = require("../utils/Utils");

var {
  Text,
  Image,
  TextInput,
  View,
  Component,
  StyleSheet,
  TouchableHighlight
} = React;

class PoiView extends Component{

   constructor(props){
      super(props);
      this.render = this.render.bind(this);

      this.state = {
         imageName: props.imageName,
         description: props.description
      }

   }

   componentDidMount(){
      console.log("URL: " + Utils.ServerUrl() + this.state.imageName);
   }

   render() {
      return (
         <View style={styles.container}>
            <Image style={styles.image} source={{uri: Utils.ServerUrl() + this.state.imageName}}>
               <Text style={styles.description}>{this.state.description}</Text>
            </Image>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   pic: {
      paddingTop: 50,
      justifyContent: 'center'
   },
   image: {
      alignSelf: 'center',
      alignItems: 'center',
      width: 378,
      height: 667
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
   },
   backText: {
      fontSize: 22,
      color: '#48bbec',
   },
   description: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#ababab'
   }
});

module.exports = PoiView;
