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