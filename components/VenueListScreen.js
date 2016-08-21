import React, {Component} from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Platform,
  Navigator,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import VenueCell from './VenueCell';
import VenueScreen from './VenueScreen';
import LocationBar from './LocationBar';
import SearchBar from './SearchBar';
import CustomIndicator from './CustomIndicator';
import ApplicationStyle from './../assets/applicationStyle.json'
import { fetchVenues, readMoreVenues, setVenue } from './../actions/venuesAction'
import CustomTouchableElement from './CustomTouchableElement'
import VenueSearchScreen from './VenueSearchScreen'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.VenueListScreen;

export default class VenueListScreen extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.props.route.rightButtonNode =
    <TouchableOpacity onPress={this.onPressSearchVenueButton.bind(this)}>
      <View style={styles.searchVenueButtonNode}>
        <Image style={styles.searchVenueButtonIcom} source={require("./../assets/images/ic_search_white_18dp.png")}/>
        <Text style={styles.searchVenueButtonText}>店舗検索</Text>
      </View>
    </TouchableOpacity>
  }

  onPressSearchVenueButton(){
    this.props.navigator.push({
      component: VenueSearchScreen,
    })
  }

  onEndReached(){
    if (!this.props.nextUrl || this.props.isLoadingTail) {
      return;
    }
    this.props.dispatch(readMoreVenues(this.props.nextUrl));
  }

  onLocationBarLoaded(){
    if(!this.props.locationUnavailable){
      this.props.dispatch(fetchVenues(this.props.location, this.props.params))
    }
  }

  selectVenue(venue: Object) {
    this.props.dispatch(setVenue(venue));

    this.props.navigator.push({
      component: VenueScreen,
      title: venue.name,
      leftButtonText: "戻る",
      leftButtonIcon: require("./../assets/images/ic_keyboard_arrow_left_white_18dp.png"),
      onLeftButtonPress: ()=>{
        this.props.navigator.pop();
      }
    });
  }

  renderFooter() {
    if (!this.props.isLoadingTail) {
      return <View style={styles.scrollSpinner} />;
    }
    else{
      return <CustomIndicator/>
    }
  }

  renderRow(
    venue: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <VenueCell
        key={venue.id}
        onSelect={() => this.selectVenue(venue)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        venue={venue}
        location={this.props.location}
      />
    );
  }

  render(){
    var venueListView = null;
    if(this.props.locationUnavailable){
      venueListView =
        <View style={[styles.centerText,styles.errorMessageContainer]}>
          <Text style={styles.errorMessage}>位置情報をONにしてください</Text>
          <Text style={styles.errorMessage}>近くのリピ店をご案内します</Text>
          <Text style={styles.errorDiscription}>{"「設定」>「プライバシー」>「位置情報サービス」から「リピ店グルメランキング」をONにしてください"}</Text>
        </View>
    }else if (this.props.loaded) {
      venueListView =
        <ListView
          ref="listview"
          dataSource={this.dataSource.cloneWithRows(this.props.venues)}
          renderFooter={this.renderFooter.bind(this)}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          style={styles.listView}
          enableEmptySections={true}
        />
    }
    else{

      venueListView =
        <View style={[styles.noVenues, styles.centerText]}>
          <CustomIndicator/>
        </View>
    }

    return (
      <View style={styles.container}>
        <LocationBar
          navigator={this.props.navigator}
          onLoaded={this.onLocationBarLoaded.bind(this)}
          />
        <SearchBar
          navigator={this.props.navigator}
          callback={()=>{
            this.props.dispatch(fetchVenues(this.props.location, this.props.params));
          }}
        />
        {venueListView}
      </View>
    );
  }

}

function select(state){
  return {
    loaded: state.venueList.loaded,
    isLoadingTail: state.venueList.loading,
    venues: state.venueList.venues,
    nextUrl: state.venueList.nextUrl,
    location: state.location,
    params: state.params,
    locationUnavailable: state.location.unavailable
  }
}

export default connect(select)(VenueListScreen)
