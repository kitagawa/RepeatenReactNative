export function getDistanceInDisplay(location1,location2){
  var d = getDistance(location1,location2); //kilometer
  return distanceWithUnit(d);
}

function distanceWithUnit(distance){
  if(distance < 1){
    distance = Math.floor(distance * 1000)
    return  distance + "m"
  }else{
    distance = Math.floor(distance * 10)/10;
    return distance + "km"
  }
}

export function getDistanceInTime(location1,location2){
  let distance = getDistance(location1, location2);
  if (distance >= 1){
    // 1km 以上なら距離表示
      return distanceWithUnit(distance)
  }else{
    //1min = 70m
    let minutes = distance * 1000 / 70
    return Math.floor(minutes) + "分"
  }
}

function getDistance(location1,location2) {
  const lat1 = location1.latitude;
  const lat2 = location2.latitude;
  const lon1 = location1.longitude;
  const lon2 = location2.longitude;

  const R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
