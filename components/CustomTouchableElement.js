import React, {Component} from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  Platform
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'

export default class CustomTouchableElement  extends Component{
  render() {
    return (
        <TouchableHighlight
          onPress={this.props.onPress}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}
          underlayColor={this.props.underlayColor || ApplicationStyle.underlayColor}
          style={this.props.style}>
          <View>
            {this.props.children}
          </View>
        </TouchableHighlight>
    );
  }
};
