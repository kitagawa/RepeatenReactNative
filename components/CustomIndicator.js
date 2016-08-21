import React, {Component} from 'react';
import {
  Platform,
  ActivityIndicatorIOS,
  ProgressBarAndroid,
  View,
  StyleSheet
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'

export default class CustomIndicator  extends Component{
  render() {
    if (Platform.OS === 'ios') {
      return <ActivityIndicatorIOS style={styles.spinner} />;
    } else {
      return (
        <View>
          <ProgressBarAndroid styleAttr="Large"/>
        </View>
      );
    }
  }
};

var styles = StyleSheet.create({
  spinner:{
    paddingTop: 10,
    paddingBottom: 10,
  }
})
