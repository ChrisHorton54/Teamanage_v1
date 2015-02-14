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
    console.log(player);
}