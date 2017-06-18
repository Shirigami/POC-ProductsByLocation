function initMap() {
  var uluru = {lat:9.922360, lng:-84.095637};
  //9.922360, -84.095637
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    draggable: true
  });

google.maps.event.addListener(marker, 'drag', function(event)  {

  //ponerMarcador(event.latLng);
  document.getElementById('latd').value = event.latLng.lat();
  document.getElementById('longtd').value = event.latLng.lng();

   marker.setPosition( new google.maps.LatLng( event.latLng.lat(), event.latLng.lng() ) );
  //infowindow.open(place.name);

});
}
