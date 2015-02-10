function loadMap(){initializeMap();if(navigator.geolocation){navigator.geolocation.getCurrentPosition(displayAndWatch,locError)}else{alert("Your browser does not support the Geolocation API!")}viewport()}function viewport(){var e=Math.max(document.documentElement.clientWidth,window.innerWidth||0);var t=Math.max(document.documentElement.clientHeight,window.innerHeight||0);var n=40;var r=t-n;document.getElementById("map").style.height=r+"px";document.getElementById("map").style.width=e+"px"}function initializeMap(){var e={zoom:13,center:new google.maps.LatLng(0,0),mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map"),e)}function locError(e){alert("The current position could not be found! Please turn on your Location")}function displayAndWatch(e){setCurrentPosition(e);mockAjaxRequest(e);watchCurrentPosition()}function setCurrentPosition(e){currentPositionMarker=new google.maps.Marker({map:map,position:new google.maps.LatLng(e.coords.latitude,e.coords.longitude),title:"Current Position",icon:"img/home_marker.png"});map.panTo(new google.maps.LatLng(e.coords.latitude,e.coords.longitude))}function watchCurrentPosition(){var e=navigator.geolocation.watchPosition(function(e){setMarkerPosition(currentPositionMarker,e)})}function setMarkerPosition(e,t){e.setPosition(new google.maps.LatLng(t.coords.latitude,t.coords.longitude))}function mockAjaxRequest(e){request=new XMLHttpRequest;request.open("get","marker.txt",true);request.onreadystatechange=function(){if(request.readyState===4){if(request.status===200||request.status===0){responseObject=JSON.parse(request.responseText);markerRecieved(e,responseObject)}else{console.log("Failed")}}};request.send(null)}function markerRecieved(e,t){infowindow=new google.maps.InfoWindow;for(var n=0;n<t.markers.length;n++){myLatlng=new google.maps.LatLng(t.markers[n].lat,t.markers[n].lng);marker=new google.maps.Marker({position:myLatlng,title:t.markers[n].name,map:map,icon:"img/store_marker.png"});google.maps.event.addListener(marker,"click",function(e,n){return function(){contentString='<img src="'+t.markers[n].img+'"style="width:100px"/><p>'+t.markers[n].name+"</p>";infowindow.setContent(contentString);infowindow.open(map,e);localStorage.setItem("markerLat",roundToTwo(e.position.k));localStorage.setItem("markerLng",roundToTwo(e.position.D))}}(marker,n))}if(localStorage.getItem("markerLat")==e.latitude&&localStorage.getItem("markerLng")==e.longitude){alert("Congratulations, you reached the target")}}function roundToTwo(e){return+(Math.round(e+"e+5")+"e-5")}var id,target,request,responseObject,marker,mapOptions,map,infowindow,longitude,latitude,myLatLng,contentString;localStorage.setItem("markerLat","1");localStorage.setItem("markerLng","1")