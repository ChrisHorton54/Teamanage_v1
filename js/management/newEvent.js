function newEvent(event_type){
    var errors = []
    var eventName = $('#event_name').val();
    var hour = $('#hour').val();
    var minutes = $('#minutes').val();
    var placeName = $('#place_name').val();
    var postcode = $('#postcode').val();
    var date_selected = $('#date_selected').html();
    var clubID = localStorage.getItem("clubID");
    
   if(eventName == ""){
       errors.push("Name of " + event_type);
   }
    if(placeName == ""){
       errors.push("Name of Place");
   }
    if(postcode == ""){
       errors.push("Postcode is invalid");
   }
    if(date_selected == ""){
       errors.push("Date has not been selected");
   }
    
   if(errors.length > 0){
        var errorString = "";
        
        for(i = 0; i < errors.length; i++){
            errorString = errorString + "- " + errors[i] + "\n";
        }
        
        alert("We have found errors in your new " + event_type + ". Please correct the following:\n\n" + errorString);
    } else {     
        $.ajax({
            url:"http://teamanage.co.uk/scripts/management/events/add-event.php",
            type: "POST",
            data: {type: event_type, clubID: clubID, eventName: eventName, hour: hour, minutes: minutes, placeName: placeName, postcode: postcode, date_selected: date_selected},
            success:function(data){
                eventSuccess(data, event_type);
            }
        }); 
    }
}

function eventSuccess(data, event_type){
    var info = JSON.parse(data);
    console.log(info);
    if(info['insert'] == "success"){
        alert("Your " + event_type + " has been added.");
        window.location = "events.html";
    }
}