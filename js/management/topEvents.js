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
    var score = "";
    
    for(i = 0; i < info['fixtures'].length; i++){
        fixtureslist = fixtureslist + '<li><span><h3>' + info['fixtures'][i]['date'] + '</h3><p>' + info['fixtures'][i]['name'] + '</p></span><h2>' + info['fixtures'][i]['time'] + '</h2><div class="clear"></div></li>';
    }
    
    for(i = 0; i < info['events'].length; i++){
        eventslist = eventslist + '<li><span><h3>' + info['events'][i]['date'] + '</h3><p>' + info['events'][i]['name'] + '</p></span><h2>' + info['events'][i]['time'] + '</h2><div class="clear"></div></li>';
    }
    
     for(i = 0; i < info['results'].length; i++){
         if(info['results'][i]['edit'] == 0){
             score = "N/A";
         } else {
             score = info['results'][i]['score'];
         }
        resultslist = resultslist + '<li><span><h3>' + info['results'][i]['date'] + '</h3><p>' + info['results'][i]['name'] + '</p></span><h2>' + score + '</h2><div class="clear"></div></li>';
    }
    
    $('#fixtures-population').html(fixtureslist);
    $('#events-population').html(eventslist);
    $('#results-population').html(resultslist);
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

function getResults(){
    var clubID = localStorage.getItem('clubID');
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/events/events.php",
        type: "POST",
        data: {type: "all-results", clubID: clubID},
        success:function(data){
            produceList(data);
        }
    });
}

function produceList(data){
    var info = JSON.parse(data);
    var list = "";
    var score = "";
    console.log(info);
    
    for(i = 0; i < info.length; i++){
        if(info[i]['edit'] == 0){
            score = "N/A";
        } else {
            score = info[i]['score'];
        }
        list = list + '<a href="#" onclick="viewResult(' + info[i]['resultsID'] + ')"><li><span><h3>' + info[i]['date'] + '</h3><p>' + info[i]['name'] + '</p></span><h2>' + score + '<img class="score-right" src="../../img/arrow-list.png" /></h2><div class="clear"></div></li></a>';
    }
    $('.recent-payment-list').html(list);
}

function viewResult(resultsID){
    localStorage.setItem("resultsID",resultsID);
    
    window.location = "edit-result.html";
}

function populateSpecificResult(){
    var resultsID = localStorage.getItem("resultsID");
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/events/events.php",
        type: "POST",
        data: {type: "specific-result", resultsID: resultsID, clubID: clubID},
        success:function(data){
            resultPopulate(data);
        }
    });
    
}

function resultPopulate(data){
    var info = JSON.parse(data);
    var select = '<select class="player_name" style="width:100%"><option value="" disabled>Select Player</option><option value="0">No Player</option>';
    var players = "";
    
    $('#result_name').html(info['result_info']['name']);
    $('#result_date').html(info['result_info']['date']);
    $('#home_score').val(info['result_info']['home_score']);
    $('#away_score').val(info['result_info']['away_score']);
    
    for(i = 0; i < info['players'].length; i++){
        select = select + ' <option value="' + info['players'][i]['playerID'] + '">' + info['players'][i]['player_name'] + '</option>';
    }
    
    select = select + '</select>';

    for(i = 1; i < 12; i++){
        players = players + '<tr id="player_' + i + '"><td width="50%">' + select + '</td><td width="16%"><input class="player_goals" min="0" max="99" style="width: 100%;" type="number" /></td><td width="16%"><input class="player_rating" min="0" max="99" style="width: 100%;" type="number" /></td><td width="16%"><input class="star_player" style="width: 100%;" type="number" /></td></tr>';
    }

    players = players + '<td width="50%">Subs</td><td width="16%"></td><td width="16%"></td><td width="16%"></td>';

    for(i = 12; i < 15; i++){
        players = players + '<tr id="player_' + i + '"><td width="50%">' + select + '</td><td width="16%"><input class="player_goals" style="width: 100%;" type="number" /></td><td width="16%"><input class="player_rating" style="width: 100%;" type="number" /></td><td width="16%"><input class="star_player" style="width: 100%;" type="number" /></td></tr>';
    }

    $("#player_info tbody").html(players);
}

function saveResult(){
    var players = [];
    
    for(i = 0; i < 14; i++){
        var j = i + 1;
        var player = [];
        player['playerID'] = $("#player_"+j+" .player_name option:selected").val();
        player['player_goals'] = $("#player_"+j+" .player_goals").val();
        player['player_rating'] = $("#player_"+j+" .player_rating").val();
        player['star_player'] = $("#player_"+j+" .star_player").val();
        
        players[i] = player;
    }
    
    var home_score = $('#home_score').val();
    var away_score = $('#away_score').val();
    
    console.log(players);
    console.log(home_score);
    console.log(away_score);

}






