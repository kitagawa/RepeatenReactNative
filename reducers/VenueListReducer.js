import { REQUEST_VENUES, INITIALIZE_VENUES, RECIEVE_VENUES } from './../actions/venuesAction'

const initialState = {
  loaded: false,
  loading: false,
  venues: [],
  nextUrl: null,
}

export default function venueList(state = initialState, action){
  switch(action.type){
    case REQUEST_VENUES:
      return Object.assign({},state,{
        loading: true,
      })
    case INITIALIZE_VENUES:
      return Object.assign({},state,{
        venues: [],
        loaded: false
      })
    case RECIEVE_VENUES:
      venues = state.venues
      for (var i in action.venues) {
        venues.push(action.venues[i]);
      }
      return Object.assign({},state,{
        venues: venues,
        nextUrl: action.nextUrl,
        loading: false,
        loaded: true
      })
    default:
      return state
  }
}
