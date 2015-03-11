function retrieveDocuments(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/documents/documents.php",
        type: "POST",
        data: {type: "documents", clubID : clubID},
        success:function(data){
            outputDocs(data);
        }
    });
}

function outputDocs(data){
    var info = JSON.parse(data);
    
    var documentli = "";
  
    for(i = 0; i < info.length; i++){
        var docName = info[i]['document_name'].substring(0, 18);
        
       documentli += '<li onclick="document_selected(this.value)" value="' + info[i]['documentID'] +'"><img src="' + info[i]['document_image'] + '" /><div class="text-content"><h2>' + docName + '...</h2></div><img style="float:right;" id="player-arrow" src="../../img/arrow-list.png" /><div class="clear"></div></li></div><br/>';
    }
    
    $(".player_listing").html(documentli);
}

function document_selected(value){
    localStorage.setItem("documentID",value);
    window.location = "specific-document.html";
}

function specificDocument(){
    var documentID = localStorage.getItem("documentID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/documents/documents.php",
        type: "POST",
        data: {type: "specific_doc", documentID : documentID},
        success:function(data){
            outputSpecificDoc(data);
        }
    });
}

function outputSpecificDoc(data){
    var info = JSON.parse(data);
    $("#document_name").html(info['document_name']);
    $("#document_desc").html(info['document_desc']);
    
    $(".download_doc").attr("onclick","downloadDocument('" + info['document_name'] + "')");   
    
}

function uploadDocument(){
    var clubID = localStorage.getItem("clubID");
    navigator.app.loadUrl('http://teamanage.co.uk/external/document-upload.php?clubID=' + clubID, { openExternal:true });
}

function downloadDocument(docName){
    var documentId = localStorage.getItem("documentID");
    navigator.app.loadUrl('http://teamanage.co.uk/app/documents/' + documentId + '/' + docName, { openExternal:true });
}

function removeDocument(){
    $(".background-mask").css("display","block");
    $(".warning-box").css("display","block");

    setTimeout(function(){
        $(".background-mask").addClass("mask-active");
        $(".warning-box").addClass("box-active");
    }, 200);
}

function buttonConfirm(type){
    if(type == "false"){
            $(".warning-box").removeClass("box-active");
            $(".background-mask").removeClass("mask-active");

        setTimeout(function(){
            $(".background-mask").css("display","none");
            $(".warning-box").css("display","none");
        }, 700);
    } else {
        
        var documentID = localStorage.getItem("documentID");        
        $.ajax({
            url:"http://teamanage.co.uk/scripts/management/documents/documents.php",
            type: "POST",
            data: {type: "remove_doc", documentID: documentID},
            success:function(data){
                window.location = "index.html";
            }
        });
        
    }
}