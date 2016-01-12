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
               <View style={styles.imageContainer}>
                  <Text style={styles.description}>{this.state.description + "  "}
                     <Image style={styles.rating} source={require('image!rating')}/>
                  </Text>
               </View>
            </Image>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   image: {
      paddingTop: 80,
      alignSelf: 'center',
      width: 378,
      height: 667,
   },
   container: {
      flex: 1,
      alignItems: 'center'
   },
   imageContainer: {
      alignSelf: 'center',
      height: 120,
      width: 320,
      backgroundColor: 'rgba(0,0,0,0)',
   },
   rating: {
      height: 10
   },
   description: {
      alignSelf: 'center',
      fontSize: 22,
      fontWeight: "700",
      color: 'white'
   }
});

module.exports = PoiView;
