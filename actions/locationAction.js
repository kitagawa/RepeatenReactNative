export const SET_LOCATION = 'SET_LOCATION'
export const FAILED_GET_LOCATION = 'FAILED_GET_LOCATION'
export const REQUEST_GET_CURRENT_LOCATION = 'REQUEST_GET_CURRENT_LOCATION'
export const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS'
export const UPDATE_LOCATION_SUGGESTIONS = 'UPDATE_LOCATION_SUGGESTIONS'
import Application from './../application.json'

export function requestGetCurrentLocation(){
  return {
    type: REQUEST_GET_CURRENT_LOCATION
  }
}

export function setCurrentLocation(){
  return (dispatch) =>{
    return new Promise((resolve, reject)=> {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = JSON.stringify(position);
          dispatch({
            type: SET_LOCATION,
            name: "現在地",
            location: position.coords,
          })
          resolve()
        },
        (error) => {
          dispatch({
            type: FAILED_GET_LOCATION,
            message: error
          })
          reject(error)
          return;
        },
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
      );
    })
  }
}

export function searchLocation(input){
  return (dispatch) =>{
    var url = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
    url = url + "?input=" + input + "&key=" + Application.googleApiKey + "&language=jp&types=geocode&components=country:jp"
    return fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseData) => {
      dispatch(updateSuggestions(responseData.predictions))
    })
  }
}

export function updateSuggestions(suggestions){
  return ({
    type: UPDATE_SUGGESTIONS,
    suggestions: suggestions
  })
}

export function updateHistories(histories){
  return ({
    type: UPDATE_LOCATION_SUGGESTIONS,
    histories: histories
  })
}

export function setLocation(suggestion){
  return (dispatch) =>{
    var url = "https://maps.googleapis.com/maps/api/place/details/json"
    url = url + "?placeid=" + suggestion.place_id + "&key=" + Application.googleApiKey
    return new Promise((resolve, reject)=> {
      fetch(url, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: SET_LOCATION,
          name: suggestion.terms[0].value,
          location: {
            latitude: responseData.result.geometry.location.lat,
            longitude: responseData.result.geometry.location.lng,
          },
        })
        resolve()
      })
    })
  }
}
