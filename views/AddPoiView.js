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

var AddPoiViewSave = require('./AddPoiViewSave');

class AddPoiView extends Component{

   constructor(props){
      super(props);
      this.switchCamera = this.switchCamera.bind(this);
      this.takePicture = this.takePicture.bind(this);
      this.render = this.render.bind(this);

      this.state = {
         cameraType: Camera.constants.Type.back,
         position: props.position,
         onAdd: props.onAdd
      }
      console.log(this.state);
   }

   render() {
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

         self.props.navigator.push({
            title: "",
            component: AddPoiViewSave,
            passProps: {
               pic: data,
               position: self.state.position,
               onAdd: self.state.onAdd
            }
         });
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
