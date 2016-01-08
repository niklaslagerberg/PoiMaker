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


var Camera = require('react-native-camera');

class AddPoiView extends Component{

   constructor(props){
      super(props);
      this.switchCamera = this.switchCamera.bind(this);
      this.onBarCodeRead = this.onBarCodeRead.bind(this);
      this.takePicture = this.takePicture.bind(this);
      this.render = this.render.bind(this);
      this.onSave = this.onSave.bind(this);

      this.state = {
         cameraType: Camera.constants.Type.back,
         position: props.position
      }
      console.log(this.state);
   }

   componentDidMount(){
      console.log("compoment Did mount");
   }

   render() {
      if(this.state.pic) {
         return (
            <View style={styles.pic}>
            <TouchableHighlight style={styles.back}
               onPress={this.back.bind(this)}>
               <Text style={styles.backText}>Back</Text>
            </TouchableHighlight>
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
      } else {
         return  (
            <Camera
              ref="cam"
              style={styles.container}
              onBarCodeRead={this.onBarCodeRead}
              type={this.state.cameraType}
              captureTarget={Camera.constants.CaptureTarget.disk}
            >

              <TouchableHighlight onPress={this.takePicture}>
                 <Image
                source={require('image!capture_inverted_76')}
                style={{
                   height: 76,
                   width: 76,
                }}
             />
              </TouchableHighlight>
            </Camera>
         );
      }
   }
   onBarCodeRead(e) {
      console.log(e);
   }
   back() {

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
            'name': this.state.name
        },
        files: [
          {
            name: 'image', // optional, if none then `filename` is used instead
            filename: this.state.pic.substring(this.state.pic.lastIndexOf('/')+1), // require, file name
            filepath: this.state.pic, // require, file absoluete path
            filetype: 'image/jpeg', // options, if none, will get mimetype from `filepath` extension
          },
        ]
    };
    var self = this;
    FileUpload.upload(obj, function(err, result) {
      console.log(result);
      if(result.status >= 200 || result.status < 300) {
         self.state.pic = undefined;
         self.props.onAdd();
      }
      else if(err) {
         throw err;
      }
    })
   }

   switchCamera() {
      var state = this.state;
      console.log(state);
      state.cameraType = state.cameraType === Camera.constants.Type.back
         ? Camera.constants.Type.front : Camera.constants.Type.back;
      this.setState(state);
   }

   takePicture() {
      var self = this;
      this.refs.cam.capture(function(err, data) {
         console.log(data);
         self.setState({pic: data});
      });
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





module.exports = AddPoiView;
