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

function captureImage(){
    navigator.device.capture.captureImage(captureSuccess, onFail, { limit: 1 });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function captureSuccess(mediaFiles) {    
    uploadFile(mediaFiles[0]);
}

function uploadFile(mediaFile) {
    console.log(mediaFile.name);
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
        },
        function(error) {
            alert("Error");
            console.log(error);
        },
        options
        );
    
    $("#player_image-src").attr("src","http://teamanage.co.uk/app/images/" + clubID + "/" + name + ".jpg");
    
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
    
    navigator.camera.getPicture(uploadPhotoLib, onFail, { quality: 50, 
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
            alert("Success"); one.COMMENT_NODE
        },
        function(error) {
            alert("Error");
            console.log(error);
        },
        options
        );
    $("#player_image-src").attr("src","http://teamanage.co.uk/app/images/" + clubID + "/" + options.fileName);
}