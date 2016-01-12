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

var FileUpload = require('NativeModules').FileUpload;

class AddPoiViewSave extends Component{

   constructor(props){
      super(props);

      // need to bind this
      this.render = this.render.bind(this);
      this.onSave = this.onSave.bind(this);

      this.state = {
         pic: props.pic,
         position: props.position
      };
   }

   render() {

         return (
            <View style={styles.pic}>
            <Text style={styles.instructions}>Add a Point of Intrest</Text>
            <Image style={styles.image} source={{uri: this.state.pic}}>
            </Image>
            <TextInput
               onChangeText={(text)=> this.setState({name: text})}
               style={styles.input}
               placeholder="Add a description..." />
            <TouchableHighlight style={styles.button}
               onPress={this.onSave.bind(this)}>
               <Text style={styles.buttonText}>Save...</Text>
            </TouchableHighlight>
            </View>
         )

   }

   onSave(data) {
      var obj = {
        uploadUrl: Utils.ServerUrl() + "poi/upload/",
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
            'Accept': 'application/json',
         },
         fields: {
            'latitude': this.state.position.coords.latitude,
            'longitude': this.state.position.coords.longitude,
            'name': this.state.name,
            'description': "Add a description here",
            'rating': 3.47
         },
         files: [{
            name: 'image', // optional, if none then `filename` is used instead
            filename: this.state.pic.substring(this.state.pic.lastIndexOf('/')+1), // require, file name
            filepath: this.state.pic, // require, file absoluete path
            filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
         }]
      };

      var self = this;
      FileUpload.upload(obj, function(err, result) {
         if(result.status >= 200 || result.status < 300) {
            self.state.pic = undefined;
            self.props.onAdd();
         }
         else if(err) {
            throw err;
         }
      })
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
      height: 378
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 100,
      flexDirection: 'row',
      alignItems: 'flex-end',
      backgroundColor: 'transparent',
   },
   back: {


   },
   backText: {
      fontSize: 22,
      color: '#48bbec',
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#ababab'
   },
   input: {
      height: 50,
      marginTop: 10,
      padding: 4,
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#48bbec'
   },
   buttonText: {
      fontSize: 22,
      color: '#FFF',
      alignSelf: 'center'
   },
   button: {
      height: 50,
      backgroundColor: '#48bbec',
      alignSelf: 'stretch',
      marginTop: 10,
      justifyContent: 'center',
   },
});





module.exports = AddPoiViewSave;
