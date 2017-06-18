var ultimaProvincia = null;

function consultar(name){
  if (ultimaProvincia != name.split(",")[1]) {
    ultimaProvincia = name.split(",")[1];
    // Request al server
    console.log("cambie");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/getProducts", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        document.getElementById('productos').value = xhr.responseText;
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };

  xhr.send("name="+ name);
  }
  else{
    return;
  }
}

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
  // Ocurre un evento -
  //ponerMarcador(event.latLng);
  document.getElementById('latd').value = event.latLng.lat();
  document.getElementById('longtd').value = event.latLng.lng();
  marker.setPosition( new google.maps.LatLng( event.latLng.lat(), event.latLng.lng() ) );
  displayLocation(event.latLng.lat(),event.latLng.lng());

});
}
function displayLocation(latitude,longitude){
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode(
        {'latLng': latlng},
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add = results[0].formatted_address ;
                    document.getElementById('lugar').value = add;
                    consultar(add);
                }
                else  {
                    //console.log("address not found");
                }
            }
            else {
                  //  console.log("Geocoder failed due to: " + status);
            }
        }
    );
}
