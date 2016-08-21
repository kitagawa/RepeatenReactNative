import { combineReducers } from 'redux'
import venueList from './VenueListReducer.js'
import venue from './VenueReducer.js'
import location from './LocationReducer.js'
import params from './parameterReducer.js'

const AppReducer = combineReducers({
  venueList,
  venue,
  location,
  params
})

export default AppReducer
