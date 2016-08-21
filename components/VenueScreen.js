import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import CustomTouchableElement from './CustomTouchableElement';
import VenueMapScreen from './VenueMapScreen';
import VenuePhotosScreen from './VenuePhotosScreen';
import ApplicationStyle from './../assets/applicationStyle.json'
import { fetchVenuePhotos} from './../actions/venuePhotoAction';

export default class VenueScreen extends Component {
  onPressMap(){
    this.props.navigator.push({
      component: VenueMapScreen,
      passProps: {venue: this.props.venue},
      title: this.props.venue.name,
      leftButtonText: "戻る",
      leftButtonIcon: require("./../assets/images/ic_keyboard_arrow_left_white_18dp.png"),
      onLeftButtonPress: ()=>{
        this.props.navigator.pop();
      }
    });
  }

  onPressMorePhotos(){
    this.props.navigator.push({
      component: VenuePhotosScreen,
      passProps: {venue: this.props.venue},
      title: this.props.venue.name,
      leftButtonText: "戻る",
      leftButtonIcon: require("./../assets/images/ic_keyboard_arrow_left_white_18dp.png"),
      onLeftButtonPress: ()=>{
        this.props.navigator.pop();
      }
    });
  }

  render(){
    let category_name = this.props.venue.category ? this.props.venue.category.name : null;
    let address = null;
    if(this.props.venue.metas){
      for(var kv of this.props.venue.metas){
        if(kv.name == "住所"){
          address = kv.value;
        }
      }
    }
    let descriptions = [];
    let i=0;
    if(this.props.venue.metas){
      for(var kv of this.props.venue.metas){
        descriptions.push(
          <View key={i} style={styles.descriptionRow}>
          <Text style={styles.text}>{kv.name}</Text>
          <Text style={styles.text}>{kv.value}</Text>
          </View>
        );
        i++;
      }
    }

    var photos = []
    if (!this.props.loaded) {
      photos = this.props.photos.map((photo)=>{photo.url})
    }

    return(
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.row}>
            <View style={styles.iconText}>
              <Image source={require("./../assets/images/ic_restaurant_black_18dp.png")}/>
              <Text style={styles.text}>{category_name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.iconText}>
              <Image source={require("./../assets/images/ic_place_black_18dp.png")}/>
              <Text style={styles.text}>{address}</Text>
            </View>
            <CustomTouchableElement onPress={this.onPressMap.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {"地図"}
                </Text>
              </View>
            </CustomTouchableElement>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri:this.props.photos[0] ? this.props.photos[0].url : null}}
              style={styles.cellImage}/>
            <Image
              source={{uri:this.props.photos[1] ? this.props.photos[1].url : null}}
              style={styles.cellImage}/>
            <Image
              source={{uri:this.props.photos[2] ? this.props.photos[2].url : null}}
              style={styles.cellImage}/>
          </View>
          <View style={styles.buttonRow}>
            <CustomTouchableElement onPress={this.onPressMorePhotos.bind(this)}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {"もっと見る"}
                </Text>
              </View>
            </CustomTouchableElement>
          </View>
          <View>
            {descriptions}
          </View>
        </ScrollView>
    );
  }
}

function select(state){
  return {
    loaded: state.venue.loaded,
    venue: state.venue.data,
    photos: state.venue.photos
  }
}

export default connect(select)(VenueScreen)

var styles = StyleSheet.create({
  text:{
    fontSize: ApplicationStyle.fontSize,
    color: ApplicationStyle.textColor
  },
  contentContainer: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 5,
    paddingBottom: 5,
  },
  iconText:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imageContainer:{
    flexDirection: 'row',
    marginLeft: -10,
    marginRight: -10,
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
  cellImage: {
    backgroundColor: ApplicationStyle.cardBackgroundColor,
    height: ApplicationStyle.imageThumbnailHeight,
    flex: 1,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ApplicationStyle.borderColor,
    paddingTop: 10,
    paddingBottom: 5,
  },
  button: {
    borderColor: ApplicationStyle.themeColor,
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText:{
    fontSize: ApplicationStyle.fontSize,
    color: ApplicationStyle.themeColor,
  }
});
