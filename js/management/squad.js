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
    navigator.camera.getPicture(uploadFile, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function uploadFile(imageURI) {
    
    /* var imgData = getBase64Image(mediaFile);
    $("#player_image-src").attr("src","data:image/png;base64," + imgData); */
    
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
        ft.upload(imageURI, "http://teamanage.co.uk/files/scripts/management/upload_file.php", win, fail, options);
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
    
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: cameraSource});
}

function onPhotoURISuccess(imageURI) 
{
    console.log(imageURI);
    $("#player_image-src").attr("src",imageURI);
    largeImage.src = imageURI;
}

