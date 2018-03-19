var map;
var infowindow;
var service;

document.getElementById("burger").onclick = function () {
  initMap('burger')};
  
document.getElementById("pizza").onclick = function () {
  initMap('pizza')};
  
document.getElementById("beer").onclick = function () {
  initMap('beer')};

function initMap(place) {
  var houston = { lat: 29.7604, lng: -95.3698 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: houston,
    zoom: 11
  });

  infowindow = new google.maps.InfoWindow();

  var request = {
    location: houston,
    radius: '1000',
    query: place
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
}

