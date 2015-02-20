function retrieveEvents(){
    var clubID = localStorage.getItem("clubID");
    
     $.ajax({
        url:"http://teamanage.co.uk/scripts/management/events/events.php",
        type: "POST",
        data: {type: "all-events", clubID: clubID},
        success:function(data){
            allEvents(data);
        }
    });
}

function allEvents(data){
    var info = JSON.parse(data);
    var fixtureslist = "";
    var eventslist = "";
    var resultslist = "";
    
    for(i = 0; i < info['fixtures'].length; i++){
        fixtureslist = fixtureslist + '<li><span><h3>' + info['fixtures'][i]['date'] + '</h3><p>' + info['fixtures'][i]['name'] + '</p></span><h2>' + info['fixtures'][i]['time'] + '</h2><div class="clear"></div></li>';
    }
    
    for(i = 0; i < info['events'].length; i++){
        eventslist = eventslist + '<li><span><h3>' + info['events'][i]['date'] + '</h3><p>' + info['events'][i]['name'] + '</p></span><h2>' + info['events'][i]['time'] + '</h2><div class="clear"></div></li>';
    }
    
    $('#fixtures-population').html(fixtureslist);
    $('#events-population').html(eventslist);
}

function findAllEvents(type,date_num){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/events/events.php",
        type: "POST",
        data: {type: type, clubID: clubID, date_selected: date_num},
        success:function(data){
            foundAllRelatedEvents(data,type);
        }
    });
}

function foundAllRelatedEvents(data,type){
    var info = JSON.parse(data);
    if(info['empty_event'] == "true"){
         $('#event-name').html("There are no " + info['empty_for'] + " for this date.");
         $('#event-time').html("");
         $('.submit').addClass("disabled");
         $('.submit').attr("href","#");
         localStorage.removeItem("eventID");
    } else {
        $('#event-name').html(info['name']);
        $('#event-time').html(info['time']);
        if(type == "all-fixtures"){
            $('.submit').removeClass("disabled");
            $('.submit').attr("href","view-fixture.html");
        } else {
            $('.submit').removeClass("disabled");
            $('.submit').attr("href","view-special-event.html");
        }
        localStorage.setItem("eventID",info['eventID']);
    }
}