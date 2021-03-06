$(document).ready(function(){
    playerAmount();

    $("#player_image-src").click(function(){
        $(".select-photo-type").css("display","block");
        
        setTimeout(function(){
            $(".select-photo-type").addClass("active");
        }, 200);
                                 
    });
    
    $(".photo-lib").click(function(){
        if($(".select-photo-type").hasClass("active")){
            $(".select-photo-type").removeClass("active");
        }
        
        setTimeout(function(){
            $(".select-photo-type").css("display","none");
            getPhoto();
        }, 700);
    });
    
    $(".photo-camera").click(function(){
        if($(".select-photo-type").hasClass("active")){
            $(".select-photo-type").removeClass("active");
        }
        
        setTimeout(function(){
            $(".select-photo-type").css("display","none");
            captureImage();
        }, 700);
    });
    $("#player-description").click(function(){
    });
    
    $(".player-submit").click(function(){
        var player_name = $("#player-name-section #player-name").val();
        var player_email = $("#player-email-section #player-email").val();
        var player_des = $("#player-description-section #player-description").val();
        var player_pos = $("#position option:selected").val();
        var player_image = $("#player_image-src").attr("src");
        var clubID = localStorage.getItem("clubID");
        
        var errors = [];
        var error_message = "Please fix the following:\n\n";
        
        if(player_name == ""){
            errors.push("Player Name");
        }
        if(!emailChecker(player_email)){
            errors.push("Player Email");
        }
        if(player_des == ""){
            errors.push("Player Description");
        }
        
        if(errors.length > 0){
            for(var i = 0; i < errors.length; i++){
               error_message = error_message.concat(errors[i] + "\n");
            }
            
            alert(error_message);
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/add-player.php",
                type: "POST",
                data: { player_name: player_name, player_email: player_email, player_des: player_des, player_pos: player_pos, player_image: player_image, clubID: clubID},
                success:function(data){
                    addNewPlayer(data);
                }
            }); 
        }
    });
    
    $(".player-edit").click(function(){
        var player_name = $("#player-name-section #player-name").val();
        var player_email = $("#player-email-section #player-email").val();
        var player_des = $("#player-description-section #player-description").val();
        var player_pos = $("#position option:selected").val();
        var player_image = $("#player_image-src").attr("src");
        var playerID = localStorage.getItem("playerID");
        
        var errors = [];
        var error_message = "Please fix the following:\n\n";
        
        if(player_name == ""){
            errors.push("Player Name");
        }
        if(!emailChecker(player_email)){
            errors.push("Player Email");
        }
        if(player_des == ""){
            errors.push("Player Description");
        }
        
        if(errors.length > 0){
            for(var i = 0; i < errors.length; i++){
               error_message = error_message.concat(errors[i] + "\n");
            }
            
            alert(error_message);
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/add-player.php",
                type: "POST",
                data: { type: "edit-player", player_name: player_name, player_email: player_email, player_des: player_des, player_pos: player_pos, player_image: player_image, playerID: playerID},
                success:function(data){
                    editPlayer(data);
                }
            }); 
        }
    });
    
    $(".profile-player-edit").click(function(){
        var player_name = $("#player-name-section #player-name").val();
        var player_des = $("#player-description-section #player-description").val();
        var player_pos = $("#position option:selected").val();
        var player_image = $("#player_image-src").attr("src");
        
        var playerID = localStorage.getItem("main_playerID");
        
        var errors = [];
        var error_message = "Please fix the following:\n\n";
        
        if(player_name == ""){
            errors.push("Player Name");
        }

        if(player_des == ""){
            errors.push("Player Description");
        }
        
        if(errors.length > 0){
            for(var i = 0; i < errors.length; i++){
               error_message = error_message.concat(errors[i] + "\n");
            }
            
            alert(error_message);
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/add-player.php",
                type: "POST",
                data: { type: "edit-profile-player", player_name: player_name, player_des: player_des, player_pos: player_pos, player_image: player_image, playerID: playerID},
                success:function(data){
                    editPlayerProfile(data);
                }
            }); 
        }
    });
});

function addNewPlayer(data){
    var information = JSON.parse(data);
    if(information['error_email'] == "true"){
        alert("The Email Address provided is already in use.");
    } else {
        alert("Player has been added to your club!");
        window.location = "../squads/all-players.html";
    }
}

function editPlayer(data){
    var information = JSON.parse(data);
    alert("You have edited this player");
    window.location = "../squads/all-players.html";
}

function editPlayerProfile(data){
    var info = JSON.parse(data);
    
    localStorage.setItem("player_name",info['name']);
    alert("Your profile has been edited.");
    window.location = "profile.html";
}

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
   var info = JSON.parse(data);    
    $("#formation_selected").html(info['formation']);
    $("#player_amount").html(info['count']);
}

function captureImage(){
    navigator.device.capture.captureImage(captureSuccess, onFail, { 
        limit: 1, 
        quality: 50,
        allowEdit: true,
        targetWidth: 150});
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function captureSuccess(mediaFiles) {    
    uploadFile(mediaFiles[0]);
}

function uploadFile(mediaFile) {
    var clubID = localStorage.getItem("clubID");
    
    path = mediaFile.fullPath;
    name = mediaFile.name;

    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=mediaFile.name;
    options.mimeType="image/jpeg";

    var params = new Object();
    params.fullpath = path;
    params.name = name;

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload( path, "http://teamanage.co.uk/scripts/management/upload_file.php?id=" + clubID,
        function(result) {
            alert("Success"); 
            $("#player_image-src").attr("src","http://teamanage.co.uk/app/images/" + clubID + "/" + name);
        },
        function(error) {
            alert("Error");
        },
        options
        );  
}

function getBase64Image(img) {
    return img.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getPhoto(source) 
{
    var cameraSource;
    var destinationType;
    
    cameraSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    destinationType = navigator.camera.DestinationType;
    
    navigator.camera.getPicture(uploadPhotoLib, onFail, {
        quality: 50, 
        allowEdit: true,
        targetWidth: 150,
        destinationType: destinationType.FILE_URI,
        sourceType: cameraSource});
}

function uploadPhotoLib(imageURI) {
    var clubID = localStorage.getItem("clubID");
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload( imageURI, "http://teamanage.co.uk/scripts/management/upload_file.php?id=" + clubID,
        function(result) {
            alert("Success");
            $("#player_image-src").attr("src","http://teamanage.co.uk/app/images/" + clubID + "/" + options.fileName + ".jpg");
        },
        function(error) {
            alert("Error");
        },
        options
        );
}

function emailChecker(email) {
  var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return pattern.test(email);
}

function retrievePlayers(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/all-players.php",
        type: "POST",
        data: {clubID : clubID},
        success:function(data){
            outputPlayers(data);
        }
    });
}

function outputPlayers(data){
    var information = JSON.parse(data);
    var playerli = "";
  
    for(i = 0; i < information.length; i++){
       playerli += '<li onclick="player_selected(this.value)" value="' + information[i]['playerID'] +'"><img src="' + information[i]['image_src'] + '" /><div class="text-content"><h2>' + information[i]['player_name'] + '</h2><p>' + information[i]['position'] + '</p></div><img style="float:right;" id="player-arrow" src="../../img/arrow-list.png" /><h2 class="overall-stats">' + information[i]['overall_stats'] + '</h2><div class="clear"></div></li></div><br/>';
    }
    
    $(".player_listing").html(playerli);
}

function player_selected(player){
    localStorage.setItem("playerID",player);
    window.location = "specific-player.html";
}

function specificPlayerPopulate(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("playerID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/player-info.php",
        type: "POST",
        data: {clubID : clubID, playerID: playerID},
        success:function(data){
            populateThePlayer(data);
        }
    });
}

function populateThePlayer(data){
    var info = JSON.parse(data);
    $("#player-name-section #player-name").val(info['player_name']);
    $("#player-email-section #player-email").val(info['email_address']);
    $("#player-description-section #player-description").val(info['description']);
    $("#player_image-src").attr("src",info['image_src']);
    
    if(info['position'] == "Goalkeeper"){
        document.getElementById("position").selectedIndex = "0";
    } else if(info['position'] == "Defender"){
        document.getElementById("position").selectedIndex = "1";
    } else if(info['position'] == "Midfielder"){
        document.getElementById("position").selectedIndex = "2";
    } else {
        document.getElementById("position").selectedIndex = "3";
    }
    
}

function specificPlayerPopulateForPlayer(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("playerID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/player-info.php",
        type: "POST",
        data: {clubID : clubID, playerID: playerID},
        success:function(data){
            populateThePlayerForPlayer(data);
        }
    });
}

function populateThePlayerForPlayer(data){
    var info = JSON.parse(data);
    $("#player-name-section #player-name").html(info['player_name']);
    $("#player-email-section #player-email").html(info['email_address']);
    $("#player-description-section #player-description").html(info['description']);
    $("#player_image-src").attr("src",info['image_src']);
    $("#player-position-section #player-position").html(info['position']);    
}

function specificProfilePlayerPopulate(){
    var clubID = localStorage.getItem("clubID");
    var playerID = localStorage.getItem("main_playerID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/player-info.php",
        type: "POST",
        data: {clubID : clubID, playerID: playerID},
        success:function(data){
            populateThePlayerProfile(data);
        }
    });
}

function populateThePlayerProfile(data){
    var info = JSON.parse(data);
    $("#player-description").val(info['description']);
    $("#player_image-src").attr("src",info['image_src']);
    
    if(info['position'] == "Goalkeeper"){
        document.getElementById("position").selectedIndex = "0";
    } else if(info['position'] == "Defender"){
        document.getElementById("position").selectedIndex = "1";
    } else if(info['position'] == "Midfielder"){
        document.getElementById("position").selectedIndex = "2";
    } else {
        document.getElementById("position").selectedIndex = "3";
    }
    
}