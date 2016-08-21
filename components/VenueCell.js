'use strict';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import {getDistanceInTime} from './../helpers/location'
import CustomTouchableElement from './CustomTouchableElement';

export default class VenueCell extends Component{
  render() {
    let category_name = this.props.venue.category ? this.props.venue.category.name : null;
    let station_name = null;
    if(this.props.venue.metas){
      for(var kv of this.props.venue.metas){
        if(kv.name == "駅"){
          station_name = kv.value;
        }
      }
    }
    return (
      <View style={styles.row}>
        <CustomTouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <View style={styles.titleLeftContainer}>
                <Text style={styles.venueTitle} numberOfLines={2}>
                {this.props.venue.name}
                </Text>
                <Text style={styles.venueSubtitle} numberOfLines={1}>
                  <Text>
                    {station_name}{station_name && category_name ? "/" : ""}{category_name}
                  </Text>
                </Text>
              </View>
              <View style={styles.titleRightContainer}>
                <Image source={require("./../assets/images/ic_directions_walk_black_24dp.png")}/>
                <Text style={styles.venueMinutes}>
                  {getDistanceInTime(this.props.venue.location, this.props.location)}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{uri:this.props.venue.recent_photos[0]}}
                style={styles.cellImage}/>
              <Image
                source={{uri:this.props.venue.recent_photos[1]}}
                style={styles.cellImage}/>
              <Image
                source={{uri:this.props.venue.recent_photos[2]}}
                style={styles.cellImage}/>
            </View>
          </View>
        </CustomTouchableElement>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: ApplicationStyle.backgroundColor,
    borderWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
  titleContainer: {
    padding: 5,
    flexDirection: 'row',
  },
  titleLeftContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: ApplicationStyle.borderColor
  },
  titleRightContainer: {
    paddingLeft: 5,
  },
  venueTitle: {
    flex: 1,
    fontSize: ApplicationStyle.fontSizeLarge,
    fontWeight: 'bold',
    marginBottom: 2,
    color: ApplicationStyle.themeColor,
  },
  venueSubtitle: {
    color: ApplicationStyle.textColor,
    fontSize: ApplicationStyle.fontSizeSmall,
  },
  venueMinutes:{
    fontSize: ApplicationStyle.fontSizeSmall,
    color: ApplicationStyle.themeColor,
  },
  imageContainer:{
    flexDirection: 'row',
    marginLeft: -5,
    marginRight: -5,
    borderTopWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
  cellImage: {
    height: ApplicationStyle.imageThumbnailHeight,
    flex: 1,
  },
  card:{
    backgroundColor: ApplicationStyle.cardBackgroundColor,
  }
});
