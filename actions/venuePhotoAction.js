import Application from './../application.json'
import Uri from 'urijs';

export const REQUEST_VENUE_PHOTOS = 'REQUEST_VENUE_PHOTOS'
export const RECIEVE_VENUE_PHOTOS = 'RECIEVE_VENUE_PHOTOS'
export const INITIALIZE_VENUE_PHOTOS = 'INITIALIZE_VENUE_PHOTOS'

function requestVenuePhotos(){
  return {
    type: REQUEST_VENUE_PHOTOS,
  }
}
function recieveVenuePhotos(json){
  return {
    type: RECIEVE_VENUE_PHOTOS,
    photos: json.photos,
    nextUrl: json.next_url
  }
}
function initializeVenuePhotos(){
  return {
    type: INITIALIZE_VENUE_PHOTOS
  }
}

export function fetchVenuePhotos(venueId,params={}){
  return function(dispatch){
    dispatch(initializeVenuePhotos())

    var url = Uri(Application.recentVenuePhotoUrl.replace(/VENUE_ID/,venueId))
    .query(params).toString()
    return new Promise((resolve, reject)=> {
      fetch(url,{
        method: 'GET',
        headers: Application.requestHeader,
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(recieveVenuePhotos(responseData))
        resolve()
      })
      .done();
    })
  }
}

export function readMoreVenuePhotos(nextUrl){
  return function(dispatch){
    dispatch(requestVenuePhotos())

    return fetch(nextUrl,{
        method: 'GET',
        headers: Application.requestHeader,
      })
      .then((response) => response.json())
      .then((responseData) => {
        dispatch(recieveVenuePhotos(responseData))
      })
      .done();
  }
}
