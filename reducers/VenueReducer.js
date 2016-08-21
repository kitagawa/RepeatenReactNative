import {
  REQUEST_VENUE_PHOTOS,
  RECIEVE_VENUE_PHOTOS,
  INITIALIZE_VENUE_PHOTOS,
} from './../actions/venuePhotoAction'
import {
  SET_VENUE,
  UPDATE_VENUE_SUGGESTIONS,
  UPDATE_VENUE_HISTORIES
} from './../actions/venuesAction'

const initialState = {
  data: {},
  photos: [],
  loading: false,
  loaded: false,
  nextUrl: null,
  suggestions: [],
  histories: []
}
export default function venue(state = initialState, action){
  switch(action.type){
    case INITIALIZE_VENUE_PHOTOS:
      return Object.assign({},state,{
        photos: [],
        nextUrl: null,
        loading: true,
        loaded: false
      })
    case REQUEST_VENUE_PHOTOS:
      return Object.assign({},state,{
        loading: true,
      })
    case RECIEVE_VENUE_PHOTOS:
      photos = state.photos

      for (var i in action.photos) {
        photos.push(action.photos[i]);
      }
      return Object.assign({},state,{
        photos: photos,
        nextUrl: action.nextUrl,
        loaded: true,
        loading: false,
      })
    case UPDATE_VENUE_SUGGESTIONS:
      return Object.assign({},state,{
        suggestions: action.suggestions
      })
    case UPDATE_VENUE_HISTORIES:
      return Object.assign({},state,{
        histories: action.histories
      })
    case SET_VENUE:
      return Object.assign({},state,{
        data: action.venue,
        photos: action.photos
      })
    default:
      return state
  }
}
