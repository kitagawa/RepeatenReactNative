'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';

import ApplicationStyle from './../assets/applicationStyle.json'
import { connect } from 'react-redux';
import VenueScreen from './VenueScreen';
import {updateSuggestions, updateHistories, searchVenue, setVenue} from './../actions/venuesAction';
import {fetchVenuePhotos } from './../actions/venuePhotoAction';
import CustomTouchableElement from './CustomTouchableElement'
import CustomIndicator from './CustomIndicator'
import CustomListView from './CustomListView';
import {getDistanceInDisplay} from './../helpers/location';
import dismissKeyboard from 'dismissKeyboard';
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.VenueSearchScreen;
const STORE_KEY = "searchVenueLog"

class VenueSearchScreen extends Component{
  constructor(props){
    super(props);
    this.setNavbar();
    this.state={text: ""}
  }

 setNavbar(){
   this.props.route.leftButtonNode =
   <View style={styles.searchBar}>
    <View style={styles.searchBarInputContainer}>
     <TextInput
       autoFocus={true}
       style={styles.searchBarInput}
       onChangeText={this.onChangeText.bind(this)}
       placeholder="店名を入力"
       placeholderTextColor="white"
       underlineColorAndroid="white"
       />
    </View>
   </View>
   this.props.route.rightButtonText = "閉じる";
   this.props.route.onRightButtonPress = ()=>this.props.navigator.pop();
 }

 componentWillMount(){
   this.initializeSuggestions()
 }

 initializeSuggestions(){
   this.props.dispatch(updateSuggestions([]))
   this.loadHistories()
 }

 onChangeText(text){
   this.setState({text: text})

   if(text.length > 0){
     this.props.dispatch(
       searchVenue(text,
         {
           latitude: this.props.location.latitude,
           longitude: this.props.location.longitude
         }))
   }else{
     this.initializeSuggestions()
   }
 }

 onCancel(){
   this.props.navigator.pop();
 }

 onPressRow(rowData){
   if(this.props.loading){
     return
   }
   dismissKeyboard();
   this.props.dispatch(setVenue(rowData))
   this.props.dispatch(fetchVenuePhotos(rowData.venue_id, {limit: 3}))
   .then(()=>{
     this.saveHistory(rowData)
     this.props.navigator.push({
       component: VenueScreen,
       title: rowData.name,
       leftButtonText: "戻る",
       leftButtonIcon: require("./../assets/images/ic_keyboard_arrow_left_white_18dp.png"),
       onLeftButtonPress: ()=>{
         this.props.navigator.pop();
       }
     });
   })
 }

 saveHistory(place){
   AsyncStorage.getItem(STORE_KEY,(error,result)=>{
     var logs = []
     if(result){
       logs = JSON.parse(result)
     }
     // 重複を省く
     logs.some(function(p, i){
         if (p.name==place.name) logs.splice(i,1);
     });
     logs.unshift(place)
     AsyncStorage.setItem(STORE_KEY, JSON.stringify(logs))
   })
 }

 loadHistories(){
   AsyncStorage.getItem(STORE_KEY,(error,result)=>{
     if(result){
       var histories = JSON.parse(result)
       this.props.dispatch(updateHistories(histories))
     }
   })
 }

 renderRow(rowData,sec, id){
   return <CustomTouchableElement
     style={styles.suggestionRow}
     onPress={this.onPressRow.bind(this,rowData)}>
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Text style={styles.suggetionText}>
          {rowData.name}
        </Text>
        <Text style={styles.suggetionDescription}>
          {rowData.location.address}
        </Text>
      </View>
      <View style={styles.containerRight}>
        <View style={styles.counts}>
          <Image style={styles.icon} source={require("./../assets/images/ic_filter_black_18dp.png")}/>
          <Text>
          {rowData.photos}
          </Text>
        </View>
        <Text style={styles.suggetionDescription}>
          {getDistanceInDisplay(rowData.location, this.props.location)}
        </Text>
      </View>
    </View>
   </CustomTouchableElement>
 }

 render(){
   return (
     <ScrollView
       keyboardDismissMode="on-drag"
       keyboardShouldPersistTaps={true}>
       <CustomListView
         dataSource={(this.state.text.length > 0) ?
           this.props.suggestions : this.props.histories}
         renderRow={this.renderRow.bind(this)}
       />
       {this.props.loading? <View style={styles.indicator}>
          <View style={styles.indicatorFrame}>
            <CustomIndicator/>
          </View>
       </View> : null}
     </ScrollView>
   );
 }
}

function select(state){
 return {
   suggestions: state.venue.suggestions,
   histories: state.venue.histories,
   location: state.location,
   loading: state.venue.loading
 }
}

export default connect(select)(VenueSearchScreen)
