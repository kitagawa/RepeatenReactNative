import React, {Component} from 'react';
import {
  View,
  Text,
  MapView,
  Alert,
  Linking,
  ActionSheetIOS,
  StyleSheet,
} from 'react-native';
import CustomTouchableElement from './CustomTouchableElement';
import ApplicationStyle from './../assets/applicationStyle.json'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.VenueMapScreen;

export default class VenueMapScreen extends Component {
  onPressShare(){
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: this.props.venue.page_url,
      message: 'お店情報がシェアされました。'+this.props.venue.name,
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    },
    (error) => alert(error),
    (success, method) => {
    });
  }

  onPressOpenMapApp(){
    Alert.alert(
      "リピ店",
      "Google Mapsで開きます",
      [
        {text: 'キャンセル', onPress: ()=>{}},
        {text: '開く', onPress: ()=>{
          var url = "comgooglemaps://?q=" +
            this.props.venue.name+"&center=" +
            this.props.venue.location.latitude + "," +
            this.props.venue.location.longitude;
          Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              return Linking.openURL("itms-apps://itunes.apple.com/app/id585027354");
            } else {
              return Linking.openURL(url);
            }
          }).catch(err =>
            console.error('An error occurred', err)
          );
        }}
      ]
    )
  }
  render(){
    let address = null;
    if(this.props.venue.metas){
      for(var kv of this.props.venue.metas){
        if(kv.name == "住所"){
          address = kv.value;
        }
      }
    }
    var region = {

    }
    return(
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{address}</Text>
        </View>
        <View style={styles.buttons}>
          <CustomTouchableElement style={{flex: 1}} onPress={this.onPressShare.bind(this)}>
            <View style={styles.button}>
              <Text style={[styles.text,styles.buttonText]}>シェアする</Text>
            </View>
          </CustomTouchableElement>
          <View style={styles.separator}/>
          <CustomTouchableElement style={{flex: 1}} onPress={this.onPressOpenMapApp.bind(this)}>
            <View style={styles.button}>
              <Text style={[styles.text,styles.buttonText]}>地図アプリを開く</Text>
            </View>
          </CustomTouchableElement>
        </View>
        <MapView
          region= {{
            latitude: this.props.venue.location.latitude,
            longitude: this.props.venue.location.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          }}
          annotations={[{
            latitude: this.props.venue.location.latitude,
            longitude: this.props.venue.location.longitude,
          }]}
          showsUserLocation={true}
          style={styles.mapView}
        />
      </View>
    );
  }
}
