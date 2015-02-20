var id, target, request, responseObject, marker,mapOptions,map,infowindow, longitude, latitude, myLatLng,contentString;

localStorage.setItem("markerLat","1");
localStorage.setItem("markerLng","1");

function loadMap(){
    initializeMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
    
    viewport();
}

function viewport(){ 
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var header = 40;
    
    var newHeight = height - header;
    
    document.getElementById("map").style.height = newHeight + "px";
    document.getElementById("map").style.width = width + "px";
}

function initializeMap(){
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(0, 0),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
}

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found! Please turn on your Location");
}

function displayAndWatch(position) {
    // set current position
    setCurrentPosition(position);
    
    mockAjaxRequest(position);

    // watch position
    watchCurrentPosition();
}
function setCurrentPosition(pos) {
    currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ),
        title: "Current Position",
        icon: 'img/home_marker.png'
    });
    map.panTo(new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ));
}

 function watchCurrentPosition() {
    var positionTimer = navigator.geolocation.watchPosition(
        function (position) {
            setMarkerPosition(
                currentPositionMarker,
                position
            );
        });
}

function setMarkerPosition(marker, position) {
    marker.setPosition(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
    );
}

function mockAjaxRequest(position){
    
	 request = new XMLHttpRequest();

	request.open('get', 'marker.txt',true);

	request.onreadystatechange = function(){
        
		if(request.readyState === 4){
             //alert(request.status);
			if(request.status === 200 || request.status === 0){
                //alert("Recieved");
				responseObject = JSON.parse(request.responseText);

				markerRecieved(position,responseObject);

			} else {
				console.log("Failed");
			}
		}
	}
	request.send(null);

}

function markerRecieved(position,data){    
    
    infowindow = new google.maps.InfoWindow();
    
    for(var i = 0; i < data.markers.length; i++){   
        myLatlng = new google.maps.LatLng(data.markers[i].lat,data.markers[i].lng);
        marker = new google.maps.Marker({
            position: myLatlng,
            title: data.markers[i].name,
            map: map,
            icon: 'img/store_marker.png'
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() { 
          contentString = '<img src="' + data.markers[i].img + '"style="width:100px"/><p>' + data.markers[i].name + '</p>';
            
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
            localStorage.setItem("markerLat",roundToTwo(marker.position.k));
            localStorage.setItem("markerLng",roundToTwo(marker.position.D));
        }
      })(marker, i));
    }
    
    if (localStorage.getItem("markerLat") == position.latitude && localStorage.getItem("markerLng") == position.longitude) {
    alert('Congratulations, you reached the target');
  }
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+5")  + "e-5");
}

