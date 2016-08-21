import React, {Component} from 'react';
import {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { connect } from 'react-redux';
import CustomTouchableElement from './CustomTouchableElement';
import {requestGetCurrentLocation, setCurrentLocation} from './../actions/locationAction'
import LocationSearchScreen from './LocationSearchScreen'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.LocationBar;

export default class LocationBar extends Component{
  componentDidMount() {
    this.props.dispatch(requestGetCurrentLocation())
    this.props.dispatch(setCurrentLocation())
    .then(()=>{
      this.props.onLoaded()
    })
    .catch((error)=>{
      //処理なし
    })
  }

  onPress(){
    dismissKeyboard();
    this.props.navigator.push({
      component: LocationSearchScreen,
      rightButtonText: "閉じる",
      onRightButtonPress: ()=>{this.props.navigator.pop()},
      callback: ()=>{
        this.props.callback();
      }
    })
  }

  render() {
    let indicator = null;
    if(this.props.loading){
      indicator = <ActivityIndicatorIOS
      animating={this.props.isLoading}
      style={styles.spinner}
      />
    }
    return (
        <View style={styles.LocationBar}>
          <CustomTouchableElement onPress={this.onPress.bind(this)} style={styles.LocationBarButton}>
            <Text style={styles.locationBarText}>
              {this.props.name ? this.props.name : "取得中..."}
            </Text>
          {indicator}
          </CustomTouchableElement>
        </View>
    );
  }
};

function select(state){
  return {
    name: state.location.name,
    loading: state.location.loading,
  }
}

export default connect(select)(LocationBar)
