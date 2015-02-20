var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function loadMap(){
    
    initialize();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
    
}
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
    zoom:7,
    center: chicago
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}

function displayAndWatch(position) {
    setCurrentPosition(position);
}

function setCurrentPosition(pos) {
    currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        )
    });
    map.panTo(new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ));
    
    var start = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    
    /*$.ajax({
        url:"http://teamanage.co.uk/scripts/login-signup.php",
        type: "POST",
        data: { email_address: email_address, password: password, team_name: team_name },
        success:function(data){
            calcRoute(data,start);
        }
    });*/
    
    calcRoute(start);
}

function calcRoute(start) {
    
    $('#event_name').html("AWAY vs Lower Farm");
    
    var end = "WS7 4TS";
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
    });
}

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found! Please turn on your Location");
}


google.maps.event.addDomListener(window, 'load', initialize);