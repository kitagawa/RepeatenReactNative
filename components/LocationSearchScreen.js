import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  AsyncStorage
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import { connect } from 'react-redux';
import CustomNavigationBar from './CustomNavigationBar';
import {searchLocation, setLocation, setCurrentLocation, updateSuggestions, updateHistories} from './../actions/locationAction';
import CustomListView from './CustomListView';
import CustomTouchableElement from './CustomTouchableElement';
import { fetchVenues } from './../actions/venuesAction'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.LocationSearchScreen;
const STORE_KEY = "searchLog"

class LocationSearchScreen extends Component{
  constructor(props){
    super(props)
    this.state={text: ""}
    this.props.route.leftButtonNode =
    <View style={styles.locationBar}>
      <View style={styles.locationBarInputContainer}>
        <TextInput
          autoFocus={true}
          style={styles.locationBarInput}
          onChangeText={this.onChangeText.bind(this)}
          placeholder="地名で検索"
          placeholderTextColor="white"
          underlineColorAndroid="white"
        />
      </View>
    </View>
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
      this.props.dispatch(searchLocation(text))
    }else{
      this.initializeSuggestions()
    }
  }

  onCancel(){
    this.props.navigator.pop();
  }

  onPressRow(rowData){
    this.props.dispatch(setLocation(rowData))
    .then(()=>{
      this.saveHistory(rowData)
      this.props.navigator.pop();
      this.props.dispatch(fetchVenues(this.props.location, this.props.params))
    })
  }

  onPressCurrentPosRow(){
    this.props.dispatch(setCurrentLocation())
    .then(()=>{
      this.props.navigator.pop();
      this.props.dispatch(fetchVenues(this.props.location, this.props.params))
    })
    .catch((error)=>{
      //処理なし
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
          if (p.description==place.description) logs.splice(i,1);
      });
      logs.unshift(place)
      AsyncStorage.setItem(STORE_KEY, JSON.stringify(logs.slice(0,5)))
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
    var terms = rowData.terms;

    return <CustomTouchableElement
      style={styles.suggestionRow}
      onPress={this.onPressRow.bind(this,rowData)}>
      <Text style={styles.suggetionText}>
        {rowData.terms[0].value}
      </Text>
      <Text style={styles.suggetionDescription}>
        {rowData.description}
      </Text>
    </CustomTouchableElement>
  }

  render(){
    return (
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}>
        <CustomTouchableElement
        onPress={this.onPressCurrentPosRow.bind(this)}
          style={styles.currentPosRow}>
          <Text style={styles.suggetionText}>
            現在地
          </Text>
        </CustomTouchableElement>
        <CustomListView
          dataSource={this.state.text.length > 0 ?
            this.props.suggestions : this.props.histories}
          renderRow={this.renderRow.bind(this)}
        />
        <View style={styles.logoConatiner}>
          <Image style={styles.logo} source={require("./../assets/images/powered_by_google_on_white.png")}/>
        </View>
      </ScrollView>
    );
  }
}

function select(state){
  return {
    suggestions: state.location.suggestions,
    histories: state.location.histories,
    location: state.location,
    params: state.params
  }
}

export default connect(select)(LocationSearchScreen)
