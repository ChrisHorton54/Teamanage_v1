function loadProfile(){
    $('#team-name').val(localStorage.getItem('club_name'));
    
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
        type: "POST",
        data: {type: "load-profile", clubID : clubID},
        success:function(data){
            returnProfileView(data, "club");
        }
    }); 
}

function loadFanProfile(){
    retrieveClubs();
    
    $('#fan_change_name').val(localStorage.getItem('fan_name'));
    
    var fanID = localStorage.getItem("fanID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
        type: "POST",
        data: {type: "load-fan-profile", fanID : fanID},
        success:function(data){
            returnProfileView(data, "fan");
        }
    }); 
}

$(document).ready(function(){
  var clubID = localStorage.getItem("clubID");
    
   $(".save-team-name").click(function(){
       var teamName = $("#team-name").val();
       if(teamName == ""){
            alert("Please provide a new team name");
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                type: "POST",
                data: {type: "change-team-name", clubID : clubID, teamName: teamName},
                success:function(data){  
                    newName(data);
                }
            }); 
        }
   }); 
    
    $(".save-email").click(function(event){
       event.preventDefault();
       var email = $("#manager-email").val();
       var confirm_email = $("#manager-confirm-email").val();
        if(email == "" || confirm_email == ""){
            alert("Please provide a new email address");
        } else {
            if(email == confirm_email){
                if(emailChecker(email)){
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-email", clubID : clubID, email: email},
                        success:function(data){  
                            changeEmail(data);
                        }
                    }); 
                } else {
                    alert("You have provided an invalid email address.");
                }
            } else {
                alert("Sorry, the email address's provided do not match.");
            }
        }
   }); 
    
    $(".save-password").click(function(event){
       event.preventDefault();
       var password = $("#manager-password").val();
       var confirm_password = $("#manager-confirm-password").val();
        if(password == "" || confirm_password == ""){
            alert("Please enter a new password.");
        } else {
            if(password == confirm_password){
                if(password.length < 6){
                    alert("Please provide a password over 6 characters long.");
                } else {
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-password", clubID : clubID, password: password},
                        success:function(data){  
                            changePassword(data);
                        }
                    }); 
                }
            } else {
                alert("Sorry, the passwords provided do not match.");
            }
        }
   });
    
    
  $(".save-player-email").click(function(event){
       var playerID = localStorage.getItem("main_playerID");
      
       event.preventDefault();
       var email = $("#player-email").val();
       var confirm_email = $("#player-confirm-email").val();
        if(email == "" || confirm_email == ""){
            alert("Please provide a new email address");
        } else {
            if(email == confirm_email){
                if(emailChecker(email)){
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-email-player", playerID : playerID, email: email},
                        success:function(data){  
                            changeEmail(data);
                        }
                    }); 
                } else {
                    alert("You have provided an invalid email address.");
                }
            } else {
                alert("Sorry, the email address's provided do not match.");
            }
        }
   });
    
    $(".save-player-password").click(function(event){
        var playerID = localStorage.getItem("main_playerID");
       event.preventDefault();
       var password = $("#player-password").val();
       var confirm_password = $("#player-confirm-password").val();
        if(password == "" || confirm_password == ""){
            alert("Please enter a new password.");
        } else {
            if(password == confirm_password){
                if(password.length < 6){
                    alert("Please provide a password over 6 characters long.");
                } else {
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-player-password", playerID : playerID, password: password},
                        success:function(data){  
                            changePassword(data);
                        }
                    }); 
                }
            } else {
                alert("Sorry, the passwords provided do not match.");
            }
        }
   });
    
    $(".save-fan-password").click(function(event){
       var fanID = localStorage.getItem("fanID");
       event.preventDefault();
       var password = $("#fan-password").val();
       var confirm_password = $("#fan-confirm-password").val();
        if(password == "" || confirm_password == ""){
            alert("Please enter a new password.");
        } else {
            if(password == confirm_password){
                if(password.length < 6){
                    alert("Please provide a password over 6 characters long.");
                } else {
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-fan-password", fanID : fanID, password: password},
                        success:function(data){  
                            changePassword(data);
                        }
                    }); 
                }
            } else {
                alert("Sorry, the passwords provided do not match.");
            }
        }
   });
    
   $(".save-fan-email").click(function(event){
       var fanID = localStorage.getItem("fanID");
      
       event.preventDefault();
       var email = $("#fan-email").val();
       var confirm_email = $("#fan-confirm-email").val();
       
        if(email == "" || confirm_email == ""){
            alert("Please provide a new email address");
        } else {
            if(email == confirm_email){
                if(emailChecker(email)){
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                        type: "POST",
                        data: {type: "change-email-fan", fanID : fanID, email: email},
                        success:function(data){  
                            changeEmail(data);
                        }
                    }); 
                } else {
                    alert("You have provided an invalid email address.");
                }
            } else {
                alert("Sorry, the email address's provided do not match.");
            }
        }
   });
    
   $(".save-fan-name").click(function(event){
       var fanID = localStorage.getItem("fanID");
      
       event.preventDefault();
       var name = $("#fan_change_name").val();
       
       if(name == ""){
            alert("Please enter the name you wish to be called.");
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                type: "POST",
                data: {type: "change-name-fan", fanID : fanID, name: name},
                success:function(data){  
                    changeFanName(data);
                }
            }); 
        }
   });
    
   $(".save-fan-club").click(function(event){
       var fanID = localStorage.getItem("fanID");
      
       event.preventDefault();
       var clubID = $("#clubs").val();
       
       console.log(clubID);
       
       if(clubID == null){
            alert("Please selected a club you wish to change to.");
        } else if(clubID == localStorage.getItem("clubID")){
            alert("You are already registered to support this club.");
        } else {
            $.ajax({
                url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
                type: "POST",
                data: {type: "change-club-fan", fanID : fanID, clubID : clubID},
                success:function(data){  
                    changeFansClub(data);
                }
            });
        }
   });
});

function returnProfileView(data, type){
    var info = JSON.parse(data);
    
    if(type == "club"){
        $('#manager-email').val(info['email']);
    } else if(type == "fan"){
        $('#fan-email').val(info['email']);
    } else {
        $('#player-email').val(info['email']);
    }
}

function newName(data){
    var info = JSON.parse(data);
    alert("Your team name has now been changed");
    localStorage.setItem("club_name",info);
    window.location = "profile.html";
}

function changePassword(data){
    var info = JSON.parse(data);
    alert("Your password has now been changed");
    localStorage.removeItem("email_address");
    localStorage.removeItem("password");
    window.location = "profile.html";
}

function changeEmail(data){
    var info = JSON.parse(data);
    alert("Your email address has now been changed");
    localStorage.removeItem("email_address");
    localStorage.removeItem("password");
    window.location = "profile.html";
}

function emailChecker(email) {
  var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return pattern.test(email);
}

function playerProfile(){
    var playerID = localStorage.getItem("main_playerID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
        type: "POST",
        data: {type: "load-player-profile", playerID : playerID},
        success:function(data){
            returnPlayerProfileView(data);
        }
    });
}

function returnPlayerProfileView(data){
    var info = JSON.parse(data);
    $("#player_image").attr("src",info['image_src']);
    $("#player_position").html(info['position']);
    $("#player-email").val(info['email']);
}

function changeFanName(data){
    var info = JSON.parse(data);
    alert("Your name has now been changed. You will now be redirected back to the login page.");
    localStorage.clear();
    window.location = "../../index.html";
}

function changeFansClub(data){
    var info = JSON.parse(data);
    alert("Thank you for changing your club. You will now be redirected back to the login page.");
    localStorage.clear();
    window.location = "../../index.html";
}










function retrieveClubs(){
    $.ajax({
        url:"http://teamanage.co.uk/scripts/retrieve-clubs.php",
        type: "POST",
        data: {from_app: "true"},
        success:function(data){
            found_clubs(data);
        }
    });
}

function found_clubs(data){
    var info = JSON.parse(data);
    var option = '';
    for (i=0; i<info.length; i++){
       option += '<option value="'+ info[i]['clubID'] + '">' + info[i]['club_name'] + '</option>';
    }
    $("#clubs").append(option); 
}