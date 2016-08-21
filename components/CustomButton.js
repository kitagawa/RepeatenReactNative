import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'

export default class CustomButton  extends Component{
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress.bind(this)}
        style={[styles.button, this.props.style]}
        underlayColor={ApplicationStyle.underlayColor}>
          <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
};

var styles = StyleSheet.create({
  button: {
      overflow: 'hidden',
    },
    buttonText: {
      fontSize: ApplicationStyle.fontSizeSmall,
      margin: 5,
      textAlign: 'center',
    }
  })
