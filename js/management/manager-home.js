$(document).ready(function(){
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/index.php",
        type: "POST",
        data: {type: "index", clubID: clubID},
        success:function(data){
            populateIndexInfo(data);
        }
    });
});

function populateIndexInfo(data){
    var info = JSON.parse(data);
    
    console.log(info);
}