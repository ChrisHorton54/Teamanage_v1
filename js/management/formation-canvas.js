$(document).ready(function(){
    formation = localStorage.getItem("formation_selected");
    if(formation == ""){
        formation = "4-4-2";
    }
    
    $('head').append('<link rel="stylesheet" type="text/css" href="../../css/formations/' + formation  + '.css">');
    $("#formation").html(formation); 
    
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/formations/formations.php",
        type: "POST",
        data: {type: "formation-players", clubID: clubID },
        success:function(data){
            populateCanvas(data);
        }
    }); 
});

function populateCanvas(data){
    var info = JSON.parse(data);
    console.log(info);
    $("#squad_rating span").html(info['overall-stats']); 
    for(i = 1; i < 12; i++){
        var j = i - 1;
        $(".position-" + i + " img").attr("src",info[j]['image_src']); 
        $(".position-" + i + " .position_name").html(info[j]['position']); 
    }
}