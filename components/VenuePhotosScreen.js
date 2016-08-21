import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ListView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import CustomIndicator from './CustomIndicator';
import CustomTouchableElement from './CustomTouchableElement';
import ApplicationStyle from './../assets/applicationStyle.json'
import {fetchVenuePhotos, readMoreVenuePhotos} from './../actions/venuePhotoAction'
import PhotoCell from './PhotoCell';

export default class VenuePhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  componentDidMount() {
    this.props.dispatch(fetchVenuePhotos(this.props.venue.venue_id))
  }

  onEndReached(){
    if (!this.props.nextUrl || this.props.isLoadingTail) {
      return;
    }
    this.props.dispatch(readMoreVenuePhotos(this.props.nextUrl));
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
    photo: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <PhotoCell
        key={photo.id}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        photo={photo}
      />
    );
  }

  render(){
    if (this.props.loaded) {
      var photoListView = <ListView
      ref="listview"
      dataSource={this.dataSource.cloneWithRows(this.props.photos)}
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
    }else{
      var photoListView =  <View style={[styles.noPhotos, styles.centerText]}>
      <CustomIndicator/>
      </View>
    }
    return(
      <View style={styles.container}>
        {photoListView}
      </View>
    );
  }
}

function select(state){
  return {
    isLoadingTail: state.venue.loading,
    loaded: state.venue.loaded,
    photos: state.venue.photos,
    nextUrl: state.venue.nextUrl,
  }
}

export default connect(select)(VenuePhotosScreen)

var styles = StyleSheet.create({
  centerText: {
    alignItems: 'center',
  },
  noPhotos: {
    marginTop: 80,
  },

  container: {
    flex: 1,
    backgroundColor: ApplicationStyle.backgroundColor,
  },

  text:{
    fontSize: ApplicationStyle.fontSize,
    color: ApplicationStyle.textColor
  },
  scrollSpinner: {
    paddingTop: 10,
    paddingBottom: 10,
  },
});
