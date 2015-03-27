$(document).ready(function(){
    $(".close-shadowbox").click(function(){
        $(".shadowbox").fadeOut("slow");

        setTimeout(function(){
            $(".background-mask").removeClass("mask-active");
        }, 200);

        setTimeout(function(){
            $(".background-mask").css("display","none");
        }, 1000);
    });
});

function retrieveClubHome(){
    var clubID = localStorage.getItem("clubID");
    
     $.ajax({
        url:"http://teamanage.co.uk/scripts/management/home.php",
        type: "POST",
        data: {type: "club-home", clubID: clubID},
        success:function(data){
            populateClubHome(data, "club");
        }
    });
}

function retrievePlayerHome(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("main_playerID");
    
     $.ajax({
        url:"http://teamanage.co.uk/scripts/management/home.php",
        type: "POST",
        data: {type: "player-home", clubID: clubID, playerID: playerID},
        success:function(data){
            populateClubHome(data, "player");
        }
    });
}

function retrieveFanHome(){
    var clubID = localStorage.getItem("clubID");
    
     $.ajax({
        url:"http://teamanage.co.uk/scripts/management/home.php",
        type: "POST",
        data: {type: "fan-home", clubID: clubID},
        success:function(data){
            populateClubHome(data, "fan");
        }
    });
}


function populateClubHome(data, type){
    var info = JSON.parse(data);
    var fixtureslist = "";
    var resultslist = "";
    var playerli = "";
    
    //Fixture
    for(i = 0; i < info['fixtures'].length; i++){
        fixtureslist = fixtureslist + '<li><span><h3>' + info['fixtures'][i]['date'] + '</h3><p>' + info['fixtures'][i]['name'] + '</p></span><h2>' + info['fixtures'][i]['time'] + '</h2><div class="clear"></div></li>';
    }
    
    //Result
    for(i = 0; i < info['results'].length; i++){
         if(info['results'][i]['edit'] == 0){
             score = "N/A";
         } else {
             score = info['results'][i]['score'];
         }
        resultslist = resultslist + '<li><span><h3>' + info['results'][i]['date'] + '</h3><p>' + info['results'][i]['name'] + '</p></span><h2>' + score + '</h2><div class="clear"></div></li>';
    }
    
    //Player
    for(i = 0; i < info['top_players'].length; i++){
        if (info['top_players'][i]['image_src'].indexOf("basic_player.jpg") >= 0) {
            var image = info['top_players'][i]['image_src'].substring(3);
        } else {
            var image = info['top_players'][i]['image_src'];
        }
        
       playerli += '<li value="' + info['top_players'][i]['playerID'] +'"><img src="' + image + '" /><div class="text-content"><h2>' + info['top_players'][i]['player_name'] + '</h2><p>' + info['top_players'][i]['position'] + '</p></div><h2 class="overall-stats">' + info['top_players'][i]['overall_stats'] + '</h2><div class="clear"></div></li></div><br/>';
    }
    
    $('#fixtures-population').html(fixtureslist);
    $('#results-population').html(resultslist);
    $(".player_listing").html(playerli);
    if(type != "fan"){
        $('#subs-owed').html("&pound" + info['finances']['overall_subs']);
        $("#fines-owed").html("&pound" + info['finances']['overall_fines']);
    }
}

function showHelpVideo(){
    $("#popup-nav").fadeOut();
    $(".background-mask").css("display","block");
    
    setTimeout(function(){
        $(".background-mask").addClass("mask-active");
    }, 200);
    
    setTimeout(function(){
        $(".shadowbox").fadeIn("slow");
    }, 500);
}