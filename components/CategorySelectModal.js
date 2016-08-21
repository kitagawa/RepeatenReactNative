import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Modal,
  ListView,
  Image
} from 'react-native';
import CustomListView from './CustomListView';
import CustomTouchableElement from './CustomTouchableElement';
import ApplicationStyle from './../assets/applicationStyle.json'
import Accordion from 'react-native-accordion';
import Constants from './../assets/constants.json'
import CustomNavigationBar from './CustomNavigationBar';

const CATEGORIES = Constants.categories;

export default class CategorySelectModal  extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeRow: 0
    }
    this.rows = []
  }

  renderRow(rowData,rowStyle){
    return (
      <CustomTouchableElement onPress={()=>{this.props.onEnter(rowData)}}>
        <View style={[styles.row,rowStyle]}>
          <Text style={styles.text}>{rowData.label}</Text>
        </View>
      </CustomTouchableElement>
    );
  }

  renderAccordionRow(rowData,sec,i){
    var activeRowStyle = null;
    if(i == this.state.activeRow){
      var iconSrc = require("./../assets/images/ic_keyboard_arrow_up_black_18dp.png")
      activeRowStyle = styles.activeRow;
    }else{
      var iconSrc = require("./../assets/images/ic_keyboard_arrow_down_black_18dp.png")
    }
    var header = (
      <View style={[styles.row, activeRowStyle]}>
        <Image style={styles.icon} source={iconSrc}/>
        <Text style={styles.text}>{rowData.label}</Text>
      </View>
    );
    var content = (
        <CustomListView
          dataSource={rowData.value}
          renderRow={(_rowData)=>{return this.renderRow(_rowData, styles.innerRowText)}}
          rowStyle={styles.innerRow}
        />
    );
    return (
      <Accordion
        header={header}
        content={content}
        easing="easeOutCubic"
        underlayColor={ApplicationStyle.underlayColor}
        ref={(row) => {this.rows[i] = row}}
        onPress={(e)=>{
          this.setState({
            activeRow: this.state.activeRow == i ? 0 : i
          })
          this.rows.forEach((row,index)=>{
            if(i != index){
              row.close()
            }
          })
        }}
      />
    );
  }

  render() {
    return (
      <Modal
          animated={true}
          transparent={true}
          visible={this.props.visible}
          onShow={this.props.onShow}
          >
        <View style={styles.background}>
          <CustomNavigationBar
           title= "ジャンル"
           onClose={this.props.onCancel}>
          </CustomNavigationBar>
          <CustomListView
            dataSource={CATEGORIES}
            renderRow={(rowData,sec,i)=>{
              if(rowData.value){
                return this.renderAccordionRow(rowData,sec,i)
              }else{
                return this.renderRow(rowData)
              }
            }}
          />
        </View>
    </Modal>
    );
  }
};

var styles = StyleSheet.create({
  background:{
    backgroundColor: "white",
    flex: 1
  },
  row:{
    padding: 12,
    flexDirection: 'row',
  },
  activeRow:{
    backgroundColor: ApplicationStyle.underlayColor
  },
  icon:{
    width: 20,
    height: 20,
    marginRight: 5
  },
  innerRow:{
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  innerRowText:{
    paddingLeft: 30
  },
  text:{
    color: ApplicationStyle.textColor
  }
})
