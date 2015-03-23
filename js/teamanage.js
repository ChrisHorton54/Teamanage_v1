$(document).ready( function(){    
    $('.section').fadeIn(1500);
    $('.chat-section').fadeIn(1500);
});

function logout(dir){
    localStorage.clear();
    window.location = dir + "../index.html";
}