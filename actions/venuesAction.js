import Application from './../application.json'
import Uri from 'urijs';
import {fetchVenuePhotos} from './../actions/venuePhotoAction'

export const REQUEST_VENUES = 'REQUEST_VENUES'
export const RECIEVE_VENUES = 'RECIEVE_VENUES'
export const INITIALIZE_VENUES = 'INITIALIZE_VENUES'
export const UPDATE_VENUE_SUGGESTIONS = 'UPDATE_VENUE_SUGGESTIONS'
export const SET_VENUE = 'SET_VENUE'
export const UPDATE_VENUE_HISTORIES = 'UPDATE_VENUE_HISTORIES'

function requestVenues(){
  return {
    type: REQUEST_VENUES,
  }
}
function recieveVenues(json){
  return {
    type: RECIEVE_VENUES,
    venues: json.venues,
    nextUrl: json.next_url
  }
}
function initializeVenues(){
  return {
    type: INITIALIZE_VENUES
  }
}

export function setVenue(venue){
  return function(dispatch){
    dispatch({
      type: SET_VENUE,
      venue: venue,
      photos: venue.recent_photos ?
        venue.recent_photos.map((url)=>{return {url: url}}) : []
    })
  }
}

export function fetchVenues(location, params){
  return function(dispatch){
    dispatch(initializeVenues())
    let url = Uri(Application.searchUrl).query({
      latitude: location.latitude,
      longitude: location.longitude,
      category_id: params.category.value,
      lunch_or_dinner: params.lunchOrDinner.value,
      distance: params.distance.value,
      'price_ranges[]': params.priceRanges.value,
    }).toString()
    return fetch(url,{
      method: 'GET',
      headers: Application.requestHeader,
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(recieveVenues(responseData))
    })
    .done();
  }
}

export function readMoreVenues(nextUrl){
  return function(dispatch){
    dispatch(requestVenues())

    return fetch(nextUrl,{
        method: 'GET',
        headers: Application.requestHeader,
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(recieveVenues(responseData))
      })
      .done();
  }
}

export function searchVenue(venueName, location){
  return function(dispatch){
    const url = Uri(Application.venueSearchUrl).query({
      query: venueName,
      latitude: location.latitude,
      longitude: location.longitude,
      auth_token: Application.accessToken
    }).toString()
    return fetch(url,{
        method: 'GET',
        headers: Application.requestHeader,
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(updateSuggestions(responseData.venues))
      })
      .done();
  }
}

export function updateSuggestions(suggestions){
  return ({
    type: UPDATE_VENUE_SUGGESTIONS,
    suggestions: suggestions
  })
}

export function updateHistories(histories){
  return ({
    type: UPDATE_VENUE_HISTORIES,
    histories: histories
  })
}
