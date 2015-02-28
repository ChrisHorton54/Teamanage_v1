$(document).ready(function(){
    $(".save-formation").click(function(){
        var selected = "";
        var errors = [];
        var errorMessage = "";
        
        for(i = 1; i < 12; i++){
            if($(".player_" + i + " .player_name").val() == "0"){
                errors.push($(".player_" + i + " .position").html());
                errorMessage = errorMessage + $(".player_" + i + " .position").html() + "\n";
            }
        }
        
        if(errors.length > 0){
            alert("Please add players to the following positions:\n\n" + errorMessage);
        } else {
            var players = [];
            for(i = 1; i < 12; i++){
                var playerInfo = {position: $(".player_" + i + " .position").html(),position_num: i, playerID: $(".player_" + i + " .player_name").val()};
                players.push(playerInfo);
            }
            
            var clubID = localStorage.getItem("clubID"); 
            var formation = $("#formationChange").val()
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/formations/formations.php",
                type: "POST",
                data: {type: "update-formation", clubID: clubID, players: players, formation: formation},
                success:function(data){
                    saveFormationInfo(data);
                }
            });
        }
    });
});

function saveFormationInfo(data){
    alert("Your formation has been updated");
    window.location = "formation-select.html";
}

function formationChange(){
    var formation = $("#formationChange :selected").text();
    
    if(formation == "4-4-2"){
        $(".player_1 .position").html("GK");
        $(".player_2 .position").html("RB");
        $(".player_3 .position").html("CB");
        $(".player_4 .position").html("CB");
        $(".player_5 .position").html("LB");
        $(".player_6 .position").html("RM");
        $(".player_7 .position").html("CM");
        $(".player_8 .position").html("CM");
        $(".player_9 .position").html("LM");
        $(".player_10 .position").html("ST");
        $(".player_11 .position").html("ST");
    } else if(formation == "4-2-3-1"){
        $(".player_1 .position").html("GK");
        $(".player_2 .position").html("RB");
        $(".player_3 .position").html("CB");
        $(".player_4 .position").html("CB");
        $(".player_5 .position").html("LB");
        $(".player_6 .position").html("CDM");
        $(".player_7 .position").html("CDM");
        $(".player_8 .position").html("RM");
        $(".player_9 .position").html("CM");
        $(".player_10 .position").html("LM");
        $(".player_11 .position").html("ST");
    } else if(formation == "4-3-3"){
        $(".player_1 .position").html("GK");
        $(".player_2 .position").html("RB");
        $(".player_3 .position").html("CB");
        $(".player_4 .position").html("CB");
        $(".player_5 .position").html("LB");
        $(".player_6 .position").html("CM");
        $(".player_7 .position").html("CM");
        $(".player_8 .position").html("CM");
        $(".player_9 .position").html("RS");
        $(".player_10 .position").html("ST");
        $(".player_11 .position").html("LS");
    } else {
        $(".player_1 .position").html("GK");
        $(".player_2 .position").html("CB");
        $(".player_3 .position").html("CB");
        $(".player_4 .position").html("CB");
        $(".player_5 .position").html("RWB");
        $(".player_6 .position").html("CM");
        $(".player_7 .position").html("CM");
        $(".player_8 .position").html("CM");
        $(".player_9 .position").html("LWB");
        $(".player_10 .position").html("ST");
        $(".player_11 .position").html("ST");
    }
    
    
}

function checkPlayerPositions(data){
    
    var info = JSON.parse(data);
    
    localStorage.setItem("formation_selected",info['formation'] );
    
    $('#formationChange option[value="' + info['formation'] + '"]').attr("selected", "selected");
    
    for(i = 0; i < 11; i++){
        var j = i + 1;
        $('.player_' + j + ' .player_name option[value="' + info['players'][i]['playerID'] + '"]').attr("selected", "selected");
    }
    
    formationChange();
}

function populateFormationPlayers(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/formations/formations.php",
        type: "POST",
        data: {type: "formation-pos", clubID: clubID},
        success:function(data){
            populatePlayers(data);
        }
    });
}

function populatePlayers(data){
    var info = JSON.parse(data);
    var players = "";
    var stats = "";
    
    var select = '<select class="player_name" style="width:100%"><option value="" disabled>Select Player</option><option value="0">No Player</option>';
    
    for(i = 0; i < info.length; i++){
        if(info[i]['overall_stats'] == "0"){
            stats = "N/A";
        } else {
            stats = info[i]['overall_stats'];
        }
        select = select + ' <option value="' + info[i]['playerID'] + '">' + info[i]['player_name'] + ' - ' + info[i]['position'] + ' (Overall - ' + stats + ')</option>';
    }

    select = select + '</select>';
    
    for(i = 1; i < 12; i++){
        players = players + '<tr class="player_'+ i +'"><td width="20%" class="position">GK</td><td width="80%" class="player">' + select + '</td></tr>';
    }
    
    $("#player_pos tbody").html(players);
    
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/formations/formations.php",
        type: "POST",
        data: {type: "retrieve-players", clubID: clubID },
        success:function(data){
            checkPlayerPositions(data);
        }
    });    
}