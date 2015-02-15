$(document).ready(function(){
    
    startUpLogin();
    
    retrieveClubs();
    
    $(".type-management h2").click(function(){
        $(".login-mask").css("display","block");
        $(".management-login").css("display","block");
        
        setTimeout(function(){
            $(".login-mask").addClass("mask-active");
            $(".management-login").addClass("login-active");
        }, 200);
    });
    
    $(".type-player h2").click(function(){
        $(".login-mask").css("display","block");
        $(".player-login").css("display","block");
        
        setTimeout(function(){
            $(".login-mask").addClass("mask-active");
            $(".player-login").addClass("login-active");
        }, 200);
    });
    
    $(".type-fan h2").click(function(){
        $(".login-mask").css("display","block");
        $(".fan-login").css("display","block");
        
        setTimeout(function(){
            $(".login-mask").addClass("mask-active");
            $(".fan-login").addClass("login-active");
        }, 200);
    });
    
    $(".close").click(function(){
        if($(".management-login").hasClass("login-active")){
            $(".management-login").removeClass("login-active");
        }
        
        if($(".player-login").hasClass("login-active")){
            $(".player-login").removeClass("login-active");
        }
        
        if($(".fan-login").hasClass("login-active")){
            $(".fan-login").removeClass("login-active");
        }
        
        $(".login-mask").removeClass("mask-active");
        
        setTimeout(function(){
            $(".login-mask").css("display","none");
            $(".management-login").css("display","none");
            $(".player-login").css("display","none");
            $(".fan-login").css("display","none");
            $(".management-sign-up-form").css("display","none");                 
            $(".management-form").css("display","block"); 
            $(".management-form").removeClass("log-in-deactive");
            $(".management-sign-up-form").removeClass("sign-up-active");
            $(".fan-form").css("display","block"); 
            $(".fan-form").removeClass("log-in-deactive");
            $(".fan-sign-up-form").removeClass("sign-up-active");
        }, 700);
    });
    
    $(".management-sign-up").click(function(){
        $(".management-form").addClass("log-in-deactive");
        
        setTimeout(function(){
            $(".management-form").css("display","none");
            $(".management-sign-up-form").css("display","block");
        }, 700);
        
        setTimeout(function(){
            $(".management-sign-up-form").addClass("sign-up-active");
        }, 800);
    });
    
    $(".fan-sign-up").click(function(){
        $(".fan-form").addClass("log-in-deactive");
        
        setTimeout(function(){
            $(".fan-form").css("display","none");
            $(".fan-sign-up-form").css("display","block");
        }, 700);
        
        setTimeout(function(){
            $(".fan-sign-up-form").addClass("sign-up-active");
        }, 800);
    });
    
    /*
    /* Account Func
    */
    
    $(".management-signing").click(function(){
        var email_address = $(".management-sign-up-form #email_address").val();
        var password = $(".management-sign-up-form #password").val();
        var confirm_password = $(".management-sign-up-form #confirm_password").val();
        var team_name = $(".management-sign-up-form #team_name").val();
        
        if(emailChecker(email_address)){
            if(password == confirm_password){
                if(team_name.length > 5){
                    $.ajax({
                        url:"http://teamanage.co.uk/scripts/login-signup.php",
                        type: "POST",
                        data: { email_address: email_address, password: password, team_name: team_name },
                        success:function(data){
                            signUpManager(data);
                        }
                    }); 
                } else {
                    alert("Please provide a more suitable team name");
                }
            } else {
                alert("Please make sure your passwords match");
            }
        } else {
            alert("Please provide a valid Email Address!");
        }
        
    });
    
    $(".management-submit").click(function(){
        var email_address = $(".management-form #email_address").val();
        var password = $(".management-form #password").val();
        
        $.ajax({
            url:"http://teamanage.co.uk/scripts/login.php",
            type: "POST",
            data: { email_address: email_address, password: password, type: "management" },
            success:function(data){
                loginManager(data);
            }
        }); 
    });

    $(".fan-submit").click(function(){
        var email_address = $(".fan-form #email_address").val();
        var password = $(".fan-form #password").val(); 
        
        $.ajax({
            url:"http://teamanage.co.uk/scripts/login.php",
            type: "POST",
            data: { email_address: email_address, password: password, type: "fan" },
            success:function(data){
                loginFan(data);
            }
        });
    });
    
    $(".player-submit").click(function(){
        var email_address = $(".player-form #email_address").val();
        var password = $(".player-form #password").val(); 
        
        $.ajax({
            url:"http://teamanage.co.uk/scripts/login.php",
            type: "POST",
            data: { email_address: email_address, password: password, type: "player" },
            success:function(data){
                loginPlayer(data);
            }
        });
    });
    
    $(".fan-signing").click(function(){
        var email_address = $(".fan-sign-up-form #email_address").val();
        var password = $(".fan-sign-up-form #password").val();
        var confirm_password = $(".fan-sign-up-form #confirm_password").val();
        var fan_name = $(".fan-sign-up-form #fan_name").val();
        var club_chosen = $("#clubs option:selected").val();
        
        if(emailChecker(email_address)){
            if(password == confirm_password){
                $.ajax({
                    url:"http://teamanage.co.uk/scripts/signup-fan.php",
                    type: "POST",
                    data: { email_address: email_address, password: password, fan_name: fan_name, club_chosen: club_chosen },
                    success:function(data){
                        signUpFan(data);
                    }
                });
            } else {
                alert("Please make sure your passwords match");
            }
        } else {
            alert("Please provide a valid Email Address!");
        }
        
    });
    
    
});

function startUpLogin(){
    if (localStorage.getItem("email_address") != null) {
        if(localStorage.getItem("account_type") == "management"){
            window.location = "management/index.html";
        } else if(localStorage.getItem("account_type") == "player"){
            
        } else if (localStorage.getItem("account_type") == "fan"){
            window.location = "fan/index.html";
        }
    }
}

function loginManager(data){
    var information = JSON.parse(data);
    
    if(information['error_email'] == "true"){
        alert("Please use a registered Email Address.");
    } else if(information['password_error'] == "true"){
        alert("Please make sure your password is correct.");
    } else {
        var checked = $(".management-form #remember_me").prop('checked');
        
        if(checked == true){
            localStorage.setItem("email_address", information['email_address']);
            localStorage.setItem("password", information['password']);
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "management");
            localStorage.setItem("club_name", information['club_name']);
            localStorage.setItem("managerID", information['managerID']);
        } else {
            localStorage.clear();
            
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "management");
            localStorage.setItem("club_name", information['club_name']);
            localStorage.setItem("managerID", information['managerID']);
        }
        
        window.location = "management/index.html";
    }
}

function loginPlayer(data){
    var information = JSON.parse(data);
    
    if(information['error_email'] == "true"){
        alert("Please use a registered Email Address.");
    } else if(information['password_error'] == "true"){
        alert("Please make sure your password is correct.");
    } else {
        var checked = $(".player-form #remember_me").prop('checked');
        
        if(checked == true){
            localStorage.setItem("email_address", information['email_address']);
            localStorage.setItem("password", information['password']);
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "player");
            localStorage.setItem("player_name", information['player_name']);
            localStorage.setItem("playerID", information['playerID']);
        } else {
            localStorage.clear();
            
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "fan");
            localStorage.setItem("player_name", information['player_name']);
            localStorage.setItem("playerID", information['playerID']);
        }
        
        window.location = "player/index.html";
    }
}

function loginFan(data){
    var information = JSON.parse(data);
    
    if(information['error_email'] == "true"){
        alert("Please use a registered Email Address.");
    } else if(information['password_error'] == "true"){
        alert("Please make sure your password is correct.");
    } else {
        var checked = $(".fan-form #remember_me").prop('checked');
        
        if(checked == true){
            localStorage.setItem("email_address", information['email_address']);
            localStorage.setItem("password", information['password']);
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "fan");
            localStorage.setItem("fan_name", information['fan_name']);
            localStorage.setItem("fanID", information['fanID']);
        } else {
            localStorage.clear();
            
            localStorage.setItem("clubID", information['clubID']);
            localStorage.setItem("account_type", "fan");
            localStorage.setItem("fan_name", information['fan_name']);
            localStorage.setItem("fanID", information['fanID']);
        }
        
        window.location = "fan/index.html";
    }
}

function signUpManager(data){
    var information = JSON.parse(data);
    if(information['error_email'] == "true"){
        alert("The Email Address provided is already in use.");
    } else if(information['club_name_error'] == "true"){
        alert("Team name is already in use.");
    } else {
        alert("Your account has new been created");
        localStorage.setItem("clubID", information['clubID']);
        localStorage.setItem("account_type", "management");
        localStorage.setItem("club_name", information['club_name']);
        localStorage.setItem("managerID", information['managerID']);
        window.location = "management/index.html";
    }
    
}

function signUpFan(data){
    var information = JSON.parse(data);
    if(information['error_email'] == "true"){
        alert("The Email Address provided is already in use.");
    } else {
        alert("Your account has new been created");
        localStorage.setItem("clubID", information['clubID']);
        localStorage.setItem("account_type", "fan");
        localStorage.setItem("fan_name", information['fan_name']);
        localStorage.setItem("fanID", information['fanID']);
        window.location = "fan/index.html";
    }
    
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

function emailChecker(email) {
  var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return pattern.test(email);
}