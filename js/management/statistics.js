function specificPlayerPopulate(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("playerID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/stats/statistics.php",
        type: "POST",
        data: {type: "specific-player", playerID: playerID, clubID: clubID},
        success:function(data){
            populatePlayerView(data);
        }
    }); 
}

function populatePlayerView(data){
    var info = JSON.parse(data);  
    
    if(info['success'] == "true"){
        $('#player_name').html(info['player_name']);
        $('#player_rating').html(info['overall_stats']);
        $('#player_position').html(info['position']);
        $('#player_goals').html(info['goals']);
        $('#player_star').html(info['star_player']);
        
        drawLineChart(info['ratings'][0],info['ratings'][1],info['ratings'][2],info['ratings'][3],info['ratings'][4]);
    }
}

function overallPopulate(){
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/stats/statistics.php",
        type: "POST",
        data: {type: "overall-stats", clubID: clubID},
        success:function(data){
            populateOverallView(data);
        }
    }); 
}

function populateOverallView(data){
    var info = JSON.parse(data);
    
    if(info['success'] == "true"){
        drawLineChart(info['ratings'][0],info['ratings'][1],info['ratings'][2],info['ratings'][3],info['ratings'][4]);
        drawBarChart(info['goals_scored'],info['goals_conceeded']);
    }
}

function retrieveAllStats(){
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/stats/statistics.php",
        type: "POST",
        data: {type: "index", clubID: clubID},
        success:function(data){
            populateIndexView(data);
        }
    }); 
}

function populateIndexView(data){
    var info = JSON.parse(data);
 
    if(info['success'] == "true"){
        $('#overall_rating').html(info['overall']);
        $('#total_goals').html(info['goals_scored']);
        $('#goals_conceeded').html(info['goals_conceeded']);
        
        var playerli = "";
  
        for(i = 0; i < info['top_players'].length; i++){
           playerli += '<li onclick="player_selected(this.value)" value="' + info['top_players'][i]['playerID'] +'"><img src="' + info['top_players'][i]['image_src'] + '" /><div class="text-content"><h2>' + info['top_players'][i]['player_name'] + '</h2><p>' + info['top_players'][i]['position'] + '</p></div><img style="float:right;" id="player-arrow" src="../../img/arrow-list.png" /><h2 class="overall-stats">' + info['top_players'][i]['overall_stats'] + '</h2><div class="clear"></div></li></div><br/>';
        }

        $(".player_listing").html(playerli);

    }
}

function drawBarChart(scored, conceeded){
    
    var data = [{label: 'Goals Scored', value: scored},{label: 'Goals Conceeded', value: conceeded}];

    var total_amount = data[0].value + data[1].value; 
    var scored = data[0].value / total_amount * 100;
    var conceeded = data[1].value / total_amount * 100;
    
    $(".goals-scored .chart").css("width",Math.round(scored) + "%");
    $(".goals-conceeded .chart").css("width",Math.round(conceeded) + "%");
    $(".goals-scored p span").html(data[0].value);
    $(".goals-conceeded p span").html(data[1].value);
}

function drawLineChart(game1, game2, game3, game4, game5){
    var c1 = document.getElementById("c1");
    var parent = document.getElementById("p1");
    c1.width = $(".section-content").width();

    var data1 = {
      labels : ["Game 1","Game 2","Game 3","Game 4","Game 5"],
      datasets : [
        {
          fillColor : "rgba(0,0,0,0.3)",
          strokeColor : "rgba(255,255,255,1)",
          pointColor : "#123",
          pointStrokeColor : "rgba(255,255,255,1)",
          data : [game1, game2, game3, game4, game5]
        }
      ]
    }

    var options1 = {
        scaleBeginAtZero : true,
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke : true,
        barStrokeWidth : 2,
        barValueSpacing : 5,
        barDatasetSpacing : 1
    }

    new Chart(c1.getContext("2d")).Line(data1,options1)
}

function player_selected(player){
    localStorage.setItem("playerID",player);
    window.location = "specific-player.html";
}
