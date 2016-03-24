"use strict"

var React = require("react-native");
var Utils = require("../utils/Utils");

var {
  Text,
  View,
  Component,
  StyleSheet,
  Image,
  TouchableOpacity
} = React;

class MarkerView extends Component{

   constructor(props){
      super(props);
   }

   onCalloutPress(key) {
      this.props.cb(key);
   }

   render() {
      return(
         <View style={styles.view}>
            <TouchableOpacity
               onPress={()=>this.onCalloutPress(this.props.poi)} >
               <Text style={styles.title}>{this.props.poi.title}</Text>
               <Image style={styles.image} source={{uri: Utils.ServerUrl() + this.props.poi.id}}/>
               <Text style={styles.description}>{this.props.poi.subtitle}</Text>
            </TouchableOpacity>
         </View>
      );
   }
}

var styles = StyleSheet.create({
   image: {
      width: 100,
      height: 100,
      marginTop: 5,
      marginBottom: 5
   },
   description: {
      fontWeight: "300",
      color: '#898989',
      alignSelf: 'center'
   },
   view: {
      alignSelf: 'stretch',
      marginTop: 1,
      marginBottom: 1,
      justifyContent: 'center',
   },
   title: {
      color: '#2E98FB',
      fontWeight: "600",
      alignSelf: 'center'
   }
});

module.exports = MarkerView;
