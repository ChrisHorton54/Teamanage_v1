$(document).ready(function(){
    
    $("#gallery_img_src").click(function(){
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

function getPhoto(source) 
{
    var cameraSource;
    var destinationType;
    
    cameraSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    destinationType = navigator.camera.DestinationType;
    
    navigator.camera.getPicture(uploadPhotoLib, onFail, {
        quality: 50, 
        allowEdit: true,
        targetWidth: 150,
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
    ft.upload( imageURI, "http://teamanage.co.uk/scripts/management/upload_image_gallery.php?id=" + clubID,
        function(result) {
            alert("Success");
            $("#gallery_img_src").attr("src","http://teamanage.co.uk/app/gallery/club/" + clubID + "/" + options.fileName + ".jpg");
        },
        function(error) {
            alert("Error");
        },
        options
        );
}

function captureImage(){
    navigator.device.capture.captureImage(captureSuccess, onFail, { 
        limit: 1, 
        quality: 50,
        allowEdit: true,
        targetWidth: 150});
}

function captureSuccess(mediaFiles) {    
    uploadFile(mediaFiles[0]);
}

function uploadFile(mediaFile) {
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
    ft.upload( path, "http://teamanage.co.uk/scripts/management/upload_image_gallery.php?id=" + clubID,
        function(result) {
            alert("Success"); 
            $("#gallery_img_src").attr("src","http://teamanage.co.uk/app/gallery/club/" + clubID + "/" + name);
        },
        function(error) {
            alert("Error");
        },
        options
        );  
}

function onFail(message) {
    alert('Failed because: ' + message);
}