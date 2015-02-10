$(document).ready(function(){
    $(".log-out").click(function(){
        localStorage.clear();
        window.location = "../index.html";
    });
});