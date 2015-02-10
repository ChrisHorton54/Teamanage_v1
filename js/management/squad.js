$(document).ready(function(){
    playerAmount();
});

function playerAmount(){
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/player_amount.php",
        type: "POST",
        data: {clubID : clubID},
        success:function(data){
            returnPlayerAmount(data);
        }
    }); 
}

function returnPlayerAmount(data){
    $("#player_amount").html(data);
}

function getPhoto(source){
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onPhotoURISuccess(imageURI) 
{
    console.log(imageURI);
    $("#player-image img").attr("src",imageURI);
}