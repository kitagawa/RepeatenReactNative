import React, {Component} from 'react';
import {
  Picker,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import ModalMenu from './ModalMenu';

export default class ModalPicker extends Component{
  constructor(props) {
    super(props);
    this.state={
      selectedValue: this.props.selectedValue,
      lastValue: null
    }
  }

  onEnter(){
    this.setState({lastValue: this.state.selectedValue});
    this.props.onEnter(this.state.selectedValue)
  }

  onCancel(){
    this.setState({selectedValue: this.state.lastValue});
    this.props.onCancel();
  }

  render(){
    var pickerItems = []
    for(var i=0; i<this.props.pickerItems.length; i++){
      pickerItems.push(<Picker.Item key={i} label={this.props.pickerItems[i].label} value={this.props.pickerItems[i].value} />)
    }

    return(
      <ModalMenu
       visible={this.props.visible}
       onEnter={this.onEnter.bind(this)}
       onCancel={this.onCancel.bind(this)}
       buttonTextStyle={this.props.buttonTextStyle}>
        <Picker
          selectedValue={this.state.selectedValue}
          onValueChange={(value) => this.setState({selectedValue: value})}>
          {pickerItems}
        </Picker>
      </ModalMenu>
    );
  }
}
