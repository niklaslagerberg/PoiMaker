"use strict";

var React = require("react-native");
var Utils = require("../utils/Utils");
var PoiView = require("./PoiView");

var {
  Text,
  View,
  Component,
  ListView,
  ActivityIndicatorIOS,
  MapView,
  StyleSheet
} = React;

class PoiMapView extends Component{
   constructor(props){
      super(props);

      this.fetchPois = this.fetchPois.bind(this);
      this.onAnnotationPress = this.onAnnotationPress.bind(this);
      this.onDetailsViewClose = this.onDetailsViewClose.bind(this);

      this.state = {
         position: props.position,
         showProgress: true
      };
   }

   componentDidMount(){
      this.fetchPois();
   }

   componentWillReceiveProps(){
      if(this.props.reload) {
         this.fetchPois();
      }
   }
   componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
   }

   getPosition() {
      navigator.geolocation.getCurrentPosition((initialPosition) => {
         this.setState({position: initialPosition});
      },(error) => alert(error.message),
      {  enableHighAccuracy: true,
         timeout: 20000,
         maximumAge: 0
      });
      this.watchID = navigator.geolocation.watchPosition((position) => {
         this.setState({position: initialPosition});
      });
   }

   fetchPois(){
      var url = Utils.ServerUrl() + "poi/" + this.state.position.coords.latitude + "/" + this.state.position.coords.longitude + "/500";
      console.log("url: " + url);
      fetch(url)
      .then((response)=> {
         if(response.status >= 200 && response.status < 300){
            return response;
         }
      })
      .then((response) => response.json())
      .then((responseData) => {
         this.createMarkers(responseData.nearby);
      })
      .catch((error) => {
         this.setState({
            error: 'something went wrong ' + error,
            showProgress: false
         });
      });
   }

   createMarkers(pos_list) {
      var markers = [];

      for (var i = 0; i < pos_list.length; i++) {
         var marker = {
            latitude: pos_list[i].latitude,
            longitude: pos_list[i].longitude,
            title: pos_list[i].key.substring(pos_list[i].key.lastIndexOf('|')+1),
            id: pos_list[i].key.substring(0, pos_list[i].key.lastIndexOf('|')),
            subtitle: 'distance: ' + pos_list[i].distance,
            tintColor: '#fff'
           }

           markers.push(marker);
      }

      this.setState({
         showProgress: false,
         pois: markers
      });
   }
   onAnnotationPress(poi){
      console.log(poi);
      this.props.navigator.push({
         title: poi.title,
         component: PoiView,
         passProps: {
            imageName: poi.id,
            description: poi.title,
            onClose: this.onDetailsViewClose
         }
      });
   }

   onDetailsViewClose(){
      this.setState({
         showPoi: false
      })
   }

   render() {
      if(this.state.showProgress) {
         return(
            <View style={{
               flex: 1,
               justifyContent: 'center'
            }}>
               <ActivityIndicatorIOS
               size="large"
               animating={true} />
            </View>
         )
      } else if(this.state.error) {
         return(
            <View style={{
               flex: 1,
               justifyContent: 'flex-start',
               paddingTop: 30
            }}>
               <Text>{this.state.error}</Text>
            </View>
         )
      }

      return(
         <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            paddingTop: 0
         }}>
            <MapView
               style={styles.map}
               annotations={this.state.pois}
               showsUserLocation={true}
               onAnnotationPress={this.onAnnotationPress}
               showsCompass={true}
               region={{
                 latitude: this.state.position.coords.latitude,
                 longitude: this.state.position.coords.longitude,
                 latitudeDelta: 0.02,
                 longitudeDelta: 0.02,
               }}
               />
         </View>
      );
   }
}

var styles = StyleSheet.create({
   map: {
      flex: 1,
      height: 680,
      width: 412,
      margin: 0,
      borderWidth: 0,
      borderColor: '#000000'
   }
});





module.exports = PoiMapView;
