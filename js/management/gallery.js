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
    
    $(".add-gallery").click(function(){
        var gallery_name = $("#gallery_name").val();
        var image_name = $("#image_name").val();
        var image_src = $("#gallery_img_src").attr("src");
        var clubID = localStorage.getItem("clubID");
        var errors = [];
        
        if(gallery_name == ""){
            alert("Please enter a Gallery Name.");
            errors.push(gallery_name);
        }
        
        if(image_name == ""){
            alert("Please enter an Image name.");
            errors.push(image_name);
        }
        
        if(image_src == "../../img/basic_player.jpg"){
            alert("Please select an Image.");
            errors.push(image_src);
        }
        
        if(errors.length > 0){
            console.log(errors);
        } else {
            $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
                        type: "POST",
                        data: {type: "add-club-gallery", clubID: clubID, gallery_name: gallery_name, image_name: image_name, image_src: image_src},
                        success:function(data){
                            alert("Your Gallery has now been added.");
                            window.location = "club-gallery.html";
                        }
                    });
                }
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

function retrieveClubGalleries(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
        type: "POST",
        data: {type: "all-club-galleries", clubID: clubID},
        success:function(data){
            populateClubGalleries(data);
        }
    });
}

function populateClubGalleries(data){
    var info = JSON.parse(data);
    var gallery_list = "";
    
    for(var i = 0; i < info.length; i++){
        gallery_list += '<li onclick="specificGallery(' + info[i]['club_galleryID'] + ')"><img style="float:left;width:35%;" src="' + info[i]['gallery_image'] + '" /><h3>' + info[i]['gallery_name'] + '<img class="score-right" src="../../img/arrow-list.png"></h3><div class="clear"></div></li>';
    }
    
    $(".gallery-fan-club").html(gallery_list);
}