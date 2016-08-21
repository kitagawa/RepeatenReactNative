import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.CustomNavigator;

export default class CustomNavigator extends Component{
  LeftButton(route, navigator, index, nextState) {
    return (
      route.leftButtonNode ? route.leftButtonNode :
      <TouchableOpacity style={styles.button}
          onPress={route.onLeftButtonPress}>
        <Image source={route.leftButtonIcon} style={styles.icon}/>
        <Text style={styles.titleText}>
          {route.leftButtonText}
        </Text>
      </TouchableOpacity>
    );
  }

  RightButton(route, navigator, index, nextState) {
    return (
      route.rightButtonNode ? route.rightButtonNode :
      <TouchableOpacity style={styles.button}
          onPress={route.onRightButtonPress}>
          <Image src={route.rightButtonIcon}/>
          <Text style={styles.titleText}>
            {route.rightButtonText}
          </Text>
      </TouchableOpacity>
    );
  }

  Title(route, navigator, index, nextState) {
    return (
      route.titleNode ? route.titleNode :
      <View style={styles.button}>
        <Text style={styles.titleText}>
          {route.title}
        </Text>
      </View>
    );
  }

  render(){
    return(
      <Navigator
       initialRoute={this.props.initialRoute}
       navigationBar={
         <Navigator.NavigationBar style={styles.bar}
           routeMapper={{
             LeftButton:this.LeftButton.bind(this),
             RightButton:this.RightButton.bind(this),
             Title:this.Title.bind(this)
           }} />
        }
       renderScene={(route,navigator)=>{
         props = Object.assign({},route.passProps,{
           route: route,
           navigator: navigator,
         })
         return React.createElement(route.component,props);
        }
       }
       sceneStyle={styles.container}
       configureScene={(route) => {
         if(route.sceneConfig){
           return route.sceneConfig;
         }else{
           return {
             ...Navigator.SceneConfigs.HorizontalSwipeJump,
             gestures: false};
         }
       }}
      />

    );
  }
}
