var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function loadMap(){
    retrieveEvent();
    initialize();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
    
}

function retrieveEvent(){
    var clubID = localStorage.getItem("clubID");
    var eventID = localStorage.getItem("eventID");
    var eventType = $('#event-type').html(); 
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/events/events.php",
        type: "POST",
        data: { type: "view-event", eventType: eventType, clubID: clubID, eventID: eventID},
        success:function(data){
            populateEvent(data);
        }
    });
}

function populateEvent(data){
    
    var info = JSON.parse(data);
    if(info['empty_event'] == "true"){
        alert("The event does not contain the correct information. Please contact Teamanage at contact@teamanage.co.uk.");
    } else {
        $('#event-name').html(info['name']);
        $('#event-time').html(info['time']);
        $('#event-postcode').html(info['postcode']);
        $('#event-location').html(info['place_name']);
        $('#event-date').html(info['date']);
        localStorage.setItem("eventPostcode",info['postcode']);
    }
}

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var uk = new google.maps.LatLng(52.489471, -1.898575);
    var mapOptions = {
    zoom:6,
    center: uk
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

    calcRoute(start);
}

function calcRoute(start) {    
    var end = localStorage.getItem("eventPostcode");
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
    
    localStorage.removeItem("eventPostcode");
}

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found! Please turn on your Location");
}


google.maps.event.addDomListener(window, 'load', initialize);