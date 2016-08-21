'use strict';
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ListView,
  Navigator,
} from 'react-native';
import ModalPicker from './ModalPicker';
import CustomButton from './CustomButton';
import CustomTouchableElement from './CustomTouchableElement';
import CustomListView from './CustomListView';
import CustomRangeSlider from './CustomRangeSlider'
import CategorySelectModal from './CategorySelectModal';
import ApplicationStyle from './../assets/applicationStyle.json'
import Constants from './../assets/constants.json'
import { connect } from 'react-redux';
import { updateParams } from './../actions/paramsAction'
import MyStyleSheet from './../assets/MyStyleSheet'

const styles = MyStyleSheet.SearchScreen;
const CATEGORIES = Constants.categories;
const LUNCH_OR_DINNER = Constants.lunchOrDinner;
const DISTANCES = Constants.distances;
const PRICE_RANGES = Constants.priceRanges;

export default class SearchScreen extends Component{
  constructor(props) {
    super(props);
    this.state={
      visibleDistancePanel: false,
      visibleLunchOrDinnerPanel: false,
      visibleSelectCategoryModal: false,
      category: {
        label: this.getLabel(CATEGORIES,this.props.category.value),
        value: this.props.category.value,
      },
      lunchOrDinner: {
        label: this.getLabel(LUNCH_OR_DINNER,this.props.lunchOrDinner.value),
        value: this.props.lunchOrDinner.value,
      },
      distance: {
        label: this.getLabel(DISTANCES,this.props.distance.value),
        value: this.props.distance.value,
      },
      priceRanges: {
        label: this.getPriceRangesLabel(this.props.priceRanges.value),
        value: this.props.priceRanges.value,
      }
    }
  }

  renderRow(rowData){
    return(
      <CustomTouchableElement onPress={rowData.onPress}>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {rowData.title}
            </Text>
            <Text style={styles.rowText}>
            {rowData.value}
            </Text>
        </View>
        {rowData.node}
      </View>
    </CustomTouchableElement>
    );
  }

  pushCategorySelectSchene(){
    this.props.navigator.push({
      component: CategorySelectScene,
      sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
      title: "ジャンル",
      rightButtonText: "閉じる",
      onRightButtonPress: ()=>{
        this.props.onCancel()
      }
    })
  }

  toggleDistancePanel(){
    this.setState({
      visibleDistancePanel: !this.state.visibleDistancePanel
    })
  }
  toggleLunchOrDinnerPanel(){
    this.setState({
      visibleLunchOrDinnerPanel: !this.state.visibleLunchOrDinnerPanel
    })
  }

  toggleSelectCategoryModal(){
    this.setState({
      visibleSelectCategoryModal: !this.state.visibleSelectCategoryModal
    })
  }

  getItem(array, target_value){
    var matched = null;
    for(var i in array){
      let itm = array[i];
      if(itm.value == target_value){
        matched = itm;
        break;
      }
      if(itm.value && itm.value.constructor === Array){
        for(var j in itm.value){
          let _itm = itm.value[j]
          if(_itm.value == target_value){
            matched = _itm;
            break;
          }
        }
      }
      if(matched != null){break}
    }
    return matched;
  }

  getLabel(array,target_value){
    var target_item = this.getItem(array,target_value);
    if(target_item){
      return target_item.label;
    }
    else{
      return null;
    }
  }

  getPriceRangesLabel(value){
    let minPrice = PRICE_RANGES[0]
    let maxPrice = PRICE_RANGES[PRICE_RANGES.length - 1]

    if(value.length == PRICE_RANGES.length){
      return maxPrice.label
    }else{
      let minValue = value[0]
      let maxValue = value[value.length-1]

      let minLabel = ""
      if(minValue != minPrice.value){
        let min = this.getItem(PRICE_RANGES, minValue - 1)
        minLabel = min.label
      }
      let maxLabel = ""
      if(maxValue != maxPrice.value){
        let max = this.getItem(PRICE_RANGES, maxValue)
        maxLabel = max.label
      }
      return minLabel + "~" + maxLabel
    }
  }

  onEnter(){
    this.props.dispatch(updateParams(this.state))
    this.props.navigator.pop();
    this.props.route.callback();
  }

  renderPriceRanges(){
    let firstValue = this.props.priceRanges.value[0]
    let lastValue = this.props.priceRanges.value[this.props.priceRanges.value.length-1]

    return (<View style={styles.slider}>
      <CustomRangeSlider
        minValue={firstValue - 1}
        maxValue={lastValue}
        min={PRICE_RANGES[0].value - 1}
        max={PRICE_RANGES[PRICE_RANGES.length -1 ].value}
        thumbRadius={10}
        lowerTrackColor={ApplicationStyle.themeColor}
        onChange={(range)=>{
          let values = []
          for(var i=Math.floor(range.min) + 1; i <= range.max; i++){
            values.push(i)
          }
          if(this.state.priceRanges.value.length !== values.length){
            // 金額を指定する場合はランチ/ディナーを指定する必要があるので強制的に変更
            var _lunchOrDinner = values.length != PRICE_RANGES.length &&
              this.state.lunchOrDinner.value == null ? LUNCH_OR_DINNER[0] : this.state.lunchOrDinner
            this.setState({
              priceRanges: {
                label: this.getPriceRangesLabel(values),
                value: values
              },
              lunchOrDinner : _lunchOrDinner
            })
          }
        }}
        />
    </View>);
  }

  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
      <View style={styles.container}>
        <CustomListView
          dataSource={[
            {
              title: "予算",
              value: this.state.priceRanges.label,
              node: this.renderPriceRanges()
            },
            {
              title: "ジャンル",
              value: this.state.category.label,
              onPress: this.toggleSelectCategoryModal.bind(this)
            },
            {
              title: "距離",
              value: this.state.distance.label,
              onPress: this.toggleDistancePanel.bind(this)
            },
            {
              title: "ランチ/ディナー",
              value: this.state.lunchOrDinner.label,
              onPress: this.toggleLunchOrDinnerPanel.bind(this)
            },
          ]}
          renderRow={this.renderRow}
          onSelect={(rowData)=> {
            if(rowData.onPress){
              rowData.onPress()
            }
          }}
        />
      <CustomButton
        onPress={this.onEnter.bind(this)}
        style={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}>
        この条件で絞り込む</CustomButton>
      <ModalPicker
       visible={this.state.visibleDistancePanel}
       onEnter={(selected)=>{
         this.toggleDistancePanel();
         this.setState({
           distance: this.getItem(DISTANCES, selected)
         });
        }
       }
       onCancel={this.toggleDistancePanel.bind(this)}
       buttonTextStyle={styles.modalButtonTextStyle}
       pickerItems={DISTANCES}
       selectedValue={this.state.distance.value}/>
      <ModalPicker
        visible={this.state.visibleLunchOrDinnerPanel}
        onEnter={(selected)=>{
          this.toggleLunchOrDinnerPanel();
          this.setState({
            lunchOrDinner: this.getItem(LUNCH_OR_DINNER, selected)
          });
         }
        }
        onCancel={this.toggleLunchOrDinnerPanel.bind(this)}
        buttonTextStyle={styles.modalButtonTextStyle}
        pickerItems={LUNCH_OR_DINNER}
        selectedValue={this.state.lunchOrDinner.value}/>
      <CategorySelectModal
        visible={this.state.visibleSelectCategoryModal}
        onCancel={this.toggleSelectCategoryModal.bind(this)}
        onEnter={(selected)=>{
          this.toggleSelectCategoryModal();
          this.setState({
            category: selected
          })
        }}
      />
    </View>
    );
  }
}

function select(state){
  return {
    category: state.params.category,
    lunchOrDinner: state.params.lunchOrDinner,
    distance: state.params.distance,
    priceRanges: state.params.priceRanges,
  }
}


export default connect(select)(SearchScreen)
