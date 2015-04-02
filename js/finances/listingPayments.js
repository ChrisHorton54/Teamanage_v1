function getList(){
    var playerID = localStorage.getItem('main_playerID');
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/player/finances.php",
        type: "POST",
        data: {type: "recent-list", playerID: playerID},
        success:function(data){
            produceList(data);
        }
    });
}

function produceList(data){
    var info = JSON.parse(data);
    var list = "";
    
    for(i = 0; i < info.length; i++){
        if(info[i]['payment_for'] == "subs"){
            var message = "Subs Payment by: ";
        } else if(info[i]['payment_for'] == "fines"){
            var message = "Fines Payment by: ";
        }
        list = list + '<li><span><h3>' + info[i]['payment_date'] + '</h3><p>' + message + info[i]['payment_type'] + '</p></span><h2>&pound;' + info[i]['payment_total'] + '</h2><div class="clear"></div></li>';
    }
    
    $('.recent-payment-list').html(list);
}

function populateCalender(date){
    var playerID = localStorage.getItem('main_playerID');
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/player/finances.php",
        type: "POST",
        data: {type: "recent-calender", playerID: playerID, date: date},
        success:function(data){
            produceCalender(data);
        }
    });
}

function produceCalender(data){
    var info = JSON.parse(data);
    $('#payment_for_subs').html(info['subs']);
    $('#payment_for_fines').html(info['fines']);
}