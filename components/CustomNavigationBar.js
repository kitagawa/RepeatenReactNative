import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import CustomTouchableElement from './CustomTouchableElement';
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.CustomNavigationBar;

export default class CustomNavigationBar extends Component{
  render(){
    return(
      <View style={styles.navigationBar}>
        <View style={[styles.child, styles.childLeft]}>
          {this.props.children}
        </View>
        <View style={styles.child}>
          <Text style={styles.barText}>
            {this.props.title}
          </Text>
        </View>
        <View style={[styles.child, styles.childRight]}>
          <CustomTouchableElement
            underlayColor={ApplicationStyle.themeColor}
            onPress={this.props.onClose.bind(this)}
            >
            <Text style={styles.barText}>
              閉じる
            </Text>
          </CustomTouchableElement>
        </View>
    </View>);

  }
}
