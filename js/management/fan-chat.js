$(document).ready(function() {
    $(".chat-message textarea").val('');
    $(".chat-message textarea").keypress(function() {
        var textLength = $(".chat-message textarea").val().length;
        if (textLength % 40 == 0) {
            var height = textLength/50;
            $(".chat-message textarea").css('height', 20+(height*20));
        }
    });
});

function saveChat(){
    var clubID = localStorage.getItem("clubID");
    var fanID = localStorage.getItem("fanID");
    
    var message = $(".chat-message textarea").val();
    
    if(message.length < 11){
        alert("Please enter more than 10 characters to the message.");
    } else {
        $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "new-chat", clubID: clubID, fanID: fanID, message: message},
            success:function(data){
                alert("Your message has been posted.");
                window.location = "chat.html";
            }
        });
    }
}

function retrieveSpecificFanChats(){
    var clubID = localStorage.getItem("clubID");
    var fanID = localStorage.getItem("fanID");
    
    $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "specific-fan-chat", clubID: clubID, fanID: fanID},
            success:function(data){
                outputSpecificFanChats(data);
            }
    });
    
}

function outputSpecificFanChats(data){
    var info = JSON.parse(data);
    var chats = "";
    
    if(info.length == 0){
        
        chats += '<div class="chat-message error"><p>You have not posted any chats up yet. Please add a new chat above.</p><div class="clear"></div></div>';
        
    } else {
        for(i = 0; i < info.length; i++){
            chats += '<div class="chat-message fan" onclick="goToChat(' + info[i]['chatID'] + ')">';

            if(info[i]['notification'] != "0"){
               chats += '<div class="comment-found"><p>' + info[i]['notification'] + '</p></div><div class="clear"></div>'; 
            }

            chats += '<p>' + info[i]['message'] + '</p><div class="clear"></div>';

            chats += '</div>';
        }
    }
    
    $(".chat-section").html(chats);
}

function retrieveAllChats(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "all-chats", clubID: clubID},
            success:function(data){
                outputAllChats(data);
            }
    });
    
}

function outputAllChats(data){
    var info = JSON.parse(data);
    var chats = '';
    
    if(info.length == 0){
        
        chats += '<div class="chat-message error"><p>There are no Chats that fans have posted yet.</p><div class="clear"></div></div>';
        
    } else {
        for(i = 0; i < info.length; i++){
            chats += '<div class="chat-message fan" onclick="goToChat(' + info[i]['chatID'] + ')">';
            if(info[i]['notification'] != "0"){
               chats += '<div class="comment-added"><p>' + info[i]['notification'] + '</p></div><div class="clear"></div>'; 
            }

            chats += '<p>' + info[i]['message'] + '</p><div class="clear"></div>';
            
            chats += '<h3>' + info[i]['fan_name'] + '</h3><div class="clear"></div>';

            chats += '</div>';
        }
    }
    
    
    $(".chat-section").html(chats);
}

function goToChat(chatID){
    localStorage.setItem("chatID", chatID);
    
    window.location = "view-chat.html";
}

function retrieveSpecificChats(){
    var chatID = localStorage.getItem("chatID");
    
    $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "specific-chat", chatID: chatID},
            success:function(data){
                outputSpecificChat(data);
            }
    });
}

function outputSpecificChat(data){
    var info = JSON.parse(data);
    
    var chats = '';
    
    for(i = 0; i < info.length; i++){
        chats += '<div class="chat-message ' + info[i]['type'] + '">';
        chats += '<p>' + info[i]['message'] + '</p><div class="clear"></div>';

        chats += '</div>';
    }
    
    $(".chat-section.all-messages").html(chats);
    
}

function saveReply(type){
    var chatID = localStorage.getItem("chatID");
    var name = localStorage.getItem("player_name");
    
    if(name == null){
        name = "";
    }
    
    var message = $(".chat-message textarea").val();
    
    if(message.length < 11){
        alert("Please enter more than 10 characters to the message.");
    } else {
        $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "reply-to-chat", chatID: chatID, chat_type: type, message: message, name: name},
            success:function(data){
                alert("Your message has been posted.");
                window.location = "chat.html";
            }
        });
    }
}

function resetNotification(){
    var chatID = localStorage.getItem("chatID");
    
    $.ajax({
            url:"http://teamanage.co.uk/scripts/management/fan-chat/chat.php",
            type: "POST",
            data: {type: "reset-notification", chatID: chatID},
            success:function(data){
            }
        });
}