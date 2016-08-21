import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView,
} from 'react-native';
import ApplicationStyle from './../assets/applicationStyle.json'

export default class CustomListView  extends Component{
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  renderRow(rowData,sec,id) {
    return (
      <View style={[styles.row,this.props.rowStyle]}>
        {this.props.renderRow(rowData,sec,id)}
      </View>
    );
  }

  render() {
    return(
      <ListView
      enableEmptySections={true}
      dataSource={this.dataSource.cloneWithRows(this.props.dataSource)}
      renderRow={this.renderRow.bind(this)}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps={true}
      showsVerticalScrollIndicator={true}
      />
    );
  }
};

var styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
});
