import {
  REQUEST_GET_CURRENT_LOCATION,
  SET_LOCATION,
  FAILED_GET_LOCATION,
  UPDATE_SUGGESTIONS,
  UPDATE_LOCATION_SUGGESTIONS
} from './../actions/locationAction'

const initialState = {
  latitude: null,
  longitude: null,
  name: null,
  unavailable: false,
  loading: false,
  suggestions: [],
  histories: []
}

export default function location(state = initialState, action){
  switch(action.type){
    case REQUEST_GET_CURRENT_LOCATION:
      return Object.assign({},state,{
        name: null,
        unavailable: false,
        loading: true
      })
    case SET_LOCATION:
      return Object.assign({},state,{
        latitude: action.location.latitude,
        longitude: action.location.longitude,
        name: action.name,
        unavailable: false,
        loading: false
      })
    case FAILED_GET_LOCATION:
      return Object.assign({},state,{
        name: null,
        unavailable: true,
        loading: false
      })
    case UPDATE_SUGGESTIONS:
      return Object.assign({},state,{
        suggestions: action.suggestions
      })
    case UPDATE_LOCATION_SUGGESTIONS:
      return Object.assign({},state,{
        histories: action.histories
      })
    default:
      return state;
  }
}
