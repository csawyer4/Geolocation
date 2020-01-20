var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
});

var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id:'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
});

var map = L.map('map', {layers:[light]}).fitWorld();

var baseMaps= {
  "Light": light,
  "Dark": dark
};

L.control.layers(baseMaps).addTo(map);

function onLocationFound(e) {
    var radius = e.accuracy; //this defines a variable radius as the accuracy value returned by the locate method divided by 2. It is divided by 2 because the accuracy value is the sum of the estimated accuracy of the latitude plus the estimated accuracy of the longitude. The unit is meters.

    L.marker(e.latlng).addTo(map)  //this adds a marker at the lat and long returned by the locate function.
        .bindPopup("You are within " + Math.round(radius * 3.28084) + " feet from this point").openPopup(); //this binds a popup to the marker. The text of the popup is defined here as well. Note that we multiply the radius by 3.28084 to convert the radius from meters to feet and that we use Math.round to round the conversion to the nearest whole number.

    //L.circle(e.latlng, radius).addTo(map); this adds a circle to the map centered at the lat and long returned by the locate function. Its radius is set to the var radius defined above.
    if (radius <= 100) {
          L.circle(e.latlng, radius, {color: 'green'}).addTo(map);
      }
      else {
          L.circle(e.latlng, radius, {color: 'red'}).addTo(map);
      }
      var times = SunCalc.getTimes(new Date(), e.latitude, e.longitude);
      var sunrise = times.sunrise.getHours();
      var sunset = times.sunset.getHours();


      var currentTime = new Date().getHours();
          if (sunrise < currentTime && currentTime < sunset){
            map.removeLayer(dark);
            map.addLayer(light);
          }
          else {
            map.removeLayer(light);
            map.addLayer(dark);
          }
}
function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);//this is the event listener
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

window.alert("Alert\nThis site wants to use your location data to show you where you are on a map. This data is also being used to display what time of day it is and whether the sun is up or down to customize the basemap to day/night mode. Your location data will not be stored or shared with anyone. To block/unblock this site from using your location data, go to your browser settings.")
