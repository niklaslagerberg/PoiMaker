"use strict";

var React = require("react-native");

var {
  Text,
  View,
  Component,
  StyleSheet,
  TabBarIOS,
  ActivityIndicatorIOS,
  NavigatorIOS
} = React;

var PoiMapView = require("./views/PoiMapView");
var AddPoi = require("./views/AddPoiView");

const CAM_TAB = 'cam_tab';
const MAP_TAB = 'map_tab';

class AppContainer extends Component{
   constructor(props){
      super(props);

      this.onAdd = this.onAdd.bind(this);

      this.state = {
         selectedTab: MAP_TAB,
         showProgress: true,
         reload: true
      }

      this.getPosition();
   }

   getPosition() {
      navigator.geolocation.getCurrentPosition(
         (initialPosition) => {
            this.setState({
               position: initialPosition,
               showProgress: false});
            console.log(this.state.position);
         },
         (error) => alert(error.message),
         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
   }

   onAdd() {
      console.log("onAdd");
      this.setState({
         selectedTab: MAP_TAB,
         reload: true
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
      } else {
         // <PoiMapView reload={this.state.reload} position={this.state.position}/>
         return(
            <TabBarIOS style={styles.container}>
               <TabBarIOS.Item
                  title="Poi's"
                  selected={this.state.selectedTab === MAP_TAB}
                  icon={require('image!map_30_30')}
                  onPress={()=> this.setState({selectedTab: MAP_TAB})}
               >
               <NavigatorIOS
                  style={{flex: 1
                  }}
                  initialRoute={{
                     component: PoiMapView,
                     title: 'Points of Interest',
                     passProps: {
                        reload:this.state.reload,
                        position: this.state.position
                     }
                  }}>
                  </NavigatorIOS>
               </TabBarIOS.Item>
               <TabBarIOS.Item
                  title="Add..."
                  selected={this.state.selectedTab === CAM_TAB}
                  icon={require('image!camera_30_30')}
                  onPress={()=> this.setState({selectedTab: CAM_TAB})}
               >
               <NavigatorIOS
                  style={{flex: 1
                  }}
                  initialRoute={{
                     component: AddPoi,
                     title: 'Add new',
                     passProps: {
                        onAdd:this.onAdd,
                        position:this.state.position
                     }
                  }}>
                  </NavigatorIOS>
               </TabBarIOS.Item>
            </TabBarIOS>

         );
      }
   }
}

var styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
   },
   welcome: {
      fontSize: 40,
      textAlign: 'center',
      marginTop: 30
   }
});




module.exports = AppContainer;
