import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'
import CustomButton from './CustomButton';

export default class ModalMenu extends Component{
  render(){
    return(
      <Modal
          animated={true}
          transparent={true}
          visible={this.props.visible}
          onShow={this.props.onShow}
          >
         <TouchableHighlight
           onPress={this.props.onCancel}
           style={styles.modalBackground}
           underlayColor={null}>
           <View/>
         </TouchableHighlight>
         <View style={[styles.modalContainer]}>
           <View style={[styles.modalInnerConteiner]}>
             {this.props.children}
             <CustomButton
             onPress={this.props.onEnter.bind(this)}
             textStyle={this.props.buttonTextStyle}>
             確定</CustomButton>
           </View>
         </View>
        </Modal>
    );
  }
}

var styles = StyleSheet.create({
  modalBackground:{
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContainer:{
    justifyContent: 'flex-end',
  },
  modalInnerConteiner:{
    backgroundColor: 'white'
  }
})
