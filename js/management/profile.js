function loadProfile(){
    $('#team-name').val(localStorage.getItem('club_name'));
    
    var clubID = localStorage.getItem("clubID");
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/profile/profile.php",
        type: "POST",
        data: {type: "load-profile", clubID : clubID},
        success:function(data){
            returnProfileView(data);
        }
    }); 
}

function returnProfileView(data){
    var info = JSON.parse(data);
    
    $('#manager-email').val(info['email']);
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
});

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