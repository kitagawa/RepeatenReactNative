import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';
import SearchScreen from './SearchScreen';
import { connect } from 'react-redux';
import Constants from './../assets/constants.json'
import MyStyleSheet from './../assets/MyStyleSheet'
import CustomTouchableElement from './CustomTouchableElement';

const styles = MyStyleSheet.SearchBar;
const PRICE_RANGES = Constants.priceRanges;
const DISTANCE = Constants.distance;

export default class SearchBar extends Component{
  onPress(){
    this.props.navigator.push({
      component: SearchScreen,
      callback: ()=>{
        this.props.callback();
      },
      title: "リピ店絞り込み条件",
      leftButtonText: "戻る",
      leftButtonIcon: require("./../assets/images/ic_keyboard_arrow_left_white_18dp.png"),
      onLeftButtonPress: ()=>{
        this.props.navigator.pop();
      },
    });
  }
  render() {
    search_title = []
    if(this.props.category.value){search_title.push(this.props.category.label)}
    if(this.props.lunch_or_dinner.value){search_title.push(this.props.lunch_or_dinner.label)}
    if(this.props.distance.value){search_title.push(this.props.distance.label)}
    if(this.props.price_ranges.value.length != PRICE_RANGES.length){search_title.push(this.props.price_ranges.label)}
    if(search_title.length == 0){
      var search_name = "リピ店を絞り込む(ジャンル・距離・予算)";
    }else{
      var search_name = search_title.join("・");
    }

    return (
      <CustomTouchableElement
        onPress={this.onPress.bind(this)}
      >
        <View style={styles.bar}>
          <Text style={styles.text}>
          {search_name}
          </Text>
          <Image style={styles.icon} source={require("./../assets/images/ic_keyboard_arrow_right_black_18dp.png")}/>
        </View>
      </CustomTouchableElement>
    );
  }
};

function select(state){
  return {
    category: state.params.category,
    lunch_or_dinner: state.params.lunchOrDinner,
    distance: state.params.distance,
    price_ranges: state.params.priceRanges,
  }
}

export default connect(select)(SearchBar)
