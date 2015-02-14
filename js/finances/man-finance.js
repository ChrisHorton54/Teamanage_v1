function retrieveHomeInfo(){
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/finances/index.php",
        type: "POST",
        data: {clubID : clubID, type: "home"},
        success:function(data){
            returnHomeInfo(data);
        }
    }); 
}

function returnHomeInfo(data){
    var information = JSON.parse(data);
    $(".total-intakes").html("&pound" + information['total_intakes']);
    $(".outstanding-subs").html("&pound" + information['overall_subs']);
    $(".outstanding-fines").html("&pound" + information['overall_fines']);
}

function retrievePlayers(page_type){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/finances/index.php",
        type: "POST",
        data: {clubID : clubID, type: "subs-fines"},
        success:function(data){
            outputPlayers(data,page_type);
        }
    });
}

function outputPlayers(data,page_type){
    var information = JSON.parse(data);
    var playerli = "";
    
    if(page_type == "subs"){
        
        for(i = 0; i < information.length; i++){
            playerli += '<li onclick="player_selected(this.value)" value="' + information[i]['playerID'] +'"><img src="' + information[i]['image_src'] + '" /><div class="text-content"><h2>' + information[i]['player_name'] + '</h2><p>&pound' + information[i]['subs'] + '</p></div><img id="player-arrow" src="../../img/arrow-list.png" /><div class="clear"></div></li></div><br/>';
        }
        

    } else if(page_type == "fines"){   
        for(i = 0; i < information.length; i++){
            playerli += '<li onclick="player_selected(this.value)" value="' + information[i]['playerID'] +'"><img src="' + information[i]['image_src'] + '" /><div class="text-content"><h2>' + information[i]['player_name'] + '</h2><p>&pound' + information[i]['fines'] + '</p></div><img id="player-arrow" src="../../img/arrow-list.png" /><div class="clear"></div></li></div><br/>';
        }
    }
    
    $(".player_listing").html(playerli);
}

function player_selected(player){
    localStorage.setItem("player_selected",player);
    window.location = 'player-info.html';
}

function financeInfo(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("player_selected");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/finances/index.php",
        type: "POST",
        data: {clubID : clubID, type: "player-info", playerID: playerID},
        success:function(data){
            outputFinance(data);
        }
    }); 
}

function outputFinance(data){
    var information = JSON.parse(data); 

    $("#fin-player-name").html(information['player_name']);
    $("#fin-player-image").attr("src",information['image_src']);
    $("#fin-subs-owed").val(information['subs_owed']);
    $("#fin-fines-owed").val(information['fines_owed']);
    $("#fin-overall-subs").html("&pound;" + information['overall_subs']);
    $("#fin-overall-fines").html("&pound;" + information['overall_fines']);
}

function saveFinances(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("player_selected");
    var subs = $("#fin-subs-owed").val();
    var fines = $("#fin-fines-owed").val();

    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/finances/index.php",
        type: "POST",
        data: {clubID : clubID, type: "save", playerID: playerID, newSubs: subs, newFines: fines},
        success:function(data){
            updateFinances(data);
        }
    }); 
}

function updateFinances(data){
    var information = JSON.parse(data);
    if(information['finances_updated'] == "true"){
        alert("This players Fiannces have succesfully been updated");
        window.location = "finances.html";
    }
}