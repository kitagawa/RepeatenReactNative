import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import { createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux';
import AppReducer from "./reducers/AppReducer"
import VenueListScreen from "./components/VenueListScreen"
import SearchScreen from "./components/SearchScreen"
import ApplicationStyle from './assets/applicationStyle.json'
import CustomNavigator from './components/CustomNavigator'

const store = createStore(AppReducer,
  applyMiddleware(
    thunkMiddleware,
  ));

class Repeaten extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <CustomNavigator initialRoute={{
          component: VenueListScreen,
          passProps: {navigator: this.props.navigator},
        }}/>
      </Provider>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 64
  },
});

AppRegistry.registerComponent('Repeaten', () => Repeaten);
