$(document).ready(function(){
    
    $(".close-shadowbox").click(function(){
        $(".shadowbox").fadeOut("slow");

        setTimeout(function(){
            $(".background-mask").removeClass("mask-active");
        }, 700);

        setTimeout(function(){
            $(".background-mask").css("display","none");
        }, 1000);
    });
    
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
    
    $(".photo-lib-fan").click(function(){
        if($(".select-photo-type").hasClass("active")){
            $(".select-photo-type").removeClass("active");
        }
        
        setTimeout(function(){
            $(".select-photo-type").css("display","none");
            getPhoto_fan();
        }, 700);
    });
    
    $(".photo-camera-fan").click(function(){
        if($(".select-photo-type").hasClass("active")){
            $(".select-photo-type").removeClass("active");
        }
        
        setTimeout(function(){
            $(".select-photo-type").css("display","none");
            captureImage_fan();
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
    
    $(".add-fan-gallery").click(function(){
        var gallery_name = $("#gallery_name").val();
        var image_name = $("#image_name").val();
        var image_src = $("#gallery_img_src").attr("src");
        var clubID = localStorage.getItem("clubID");
        var fanID = localStorage.getItem("fanID");
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
            //alert("Please select an Image.");
            //errors.push(image_src);
        }
        
        if(errors.length > 0){
            console.log(errors);
        } else {
            $.ajax({
                        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
                    type: "POST",
                    data: {type: "add-fan-gallery", fanID: fanID, clubID: clubID, gallery_name: gallery_name, image_name: image_name, image_src: image_src},
                    success:function(data){
                        alert("Your Gallery has now been added.");
                        window.location = "fan-gallery.html";
                    }
                });
            }
        });

    $(".add-gallery-image").click(function(){
        var galleryID = localStorage.getItem("galleryID");
        var image_name = $("#image_name").val();
        var image_src = $("#gallery_img_src").attr("src");
        var errors = [];
        
        if(image_name == ""){
            alert("Please enter an Image Name.");
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
                    data: {type: "add-gallery-image", galleryID: galleryID, image_name: image_name, image_src: image_src},
                    success:function(data){
                        alert("Your Gallery has now been added.");
                        window.location = "club-gallery.html";
                    }
                });
            }
    });
    
    $(".add-gallery-image-fan").click(function(){
        var galleryID = localStorage.getItem("galleryID");
        var image_name = $("#image_name").val();
        var image_src = $("#gallery_img_src").attr("src");
        var errors = [];
        
        if(image_name == ""){
            alert("Please enter an Image Name.");
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
                    data: {type: "add-gallery-image-fan", galleryID: galleryID, image_name: image_name, image_src: image_src},
                    success:function(data){
                        alert("Your Gallery has now been added.");
                        window.location = "fan-gallery.html";
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
    if(info == null){
        gallery_list = '<p>There are no galleries at the moment.</p><div class="clear"></div>';
    } else {
        for(var i = 0; i < info.length; i++){
            gallery_list += '<li onclick="specificGallery(' + info[i]['club_galleryID'] + ',this)"><img style="float:left;width:35%;" src="' + info[i]['gallery_image'] + '" /><h3>' + info[i]['gallery_name'] + '</h3><div class="clear"><h3 id="specific-gallery-name">' + info[i]['gallery_name'] + '</h3></div></li><br/>';
        }
    }
    
    $(".gallery-fan-club").html(gallery_list);
}

function retrieveFanGalleries(){
    var fanID = localStorage.getItem("fanID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
        type: "POST",
        data: {type: "all-fan-galleries", fanID: fanID},
        success:function(data){
            populateFanGalleries(data);
        }
    });
}

function populateFanGalleries(data){
    var info = JSON.parse(data);
    var gallery_list = "";
    if(info == null){
        gallery_list = '<p>There are no galleries at the moment.</p><div class="clear"></div>';
    } else {
        for(var i = 0; i < info.length; i++){
            gallery_list += '<li onclick="specificGalleryFan(' + info[i]['fan_galleryID'] + ',this)"><img style="float:left;width:35%;" src="' + info[i]['gallery_image'] + '" /><h3>' + info[i]['gallery_name'] + '</h3><div class="clear"><h3 id="specific-gallery-name">' + info[i]['gallery_name'] + '</h3></div></li><br/>';
        }
    }
    $(".gallery-fan-club").html(gallery_list);
}

function retrieveClubFanGalleries(){
    var clubID = localStorage.getItem("clubID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
        type: "POST",
        data: {type: "all-club-fan-galleries", clubID: clubID},
        success:function(data){
            populateFanGalleries(data);
        }
    });
}

function specificGallery(galleryID, galleryName){
    localStorage.setItem("galleryID",galleryID);
    localStorage.setItem("gallery-name",galleryName.querySelector("#specific-gallery-name").innerHTML);
    
    window.location = "specific-gallery.html";
}

function specificGalleryFan(galleryID, galleryName){
    localStorage.setItem("galleryID",galleryID);
    localStorage.setItem("gallery-name",galleryName.querySelector("#specific-gallery-name").innerHTML);
    
    window.location = "specific-gallery-fan.html";
}

function retrieveSpecificGallery(){
    var galleryID = localStorage.getItem("galleryID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
        type: "POST",
        data: {type: "retrieve-specific", galleryID: galleryID},
        success:function(data){
            populateSpecificGallery(data);
        }
    });
}

function populateSpecificGallery(data){
    var info = JSON.parse(data);
    var galleryList = "";

    $("#gallery-name").html(localStorage.getItem("gallery-name"));
    
    for(var i = 0; i < info.length; i++){
        galleryList += '<div class="column col-3"><img onclick="changeShadowbox(this)" class="gallery-thumb" src="' + info[i]['image_src'] + '" alt="' + info[i]['image_name'] + '" title="' + info[i]['image_name'] + '"/></div>';
    }
    
    galleryList += '<div class="clear"></div>';
    
    $(".gallery-content").html(galleryList);
    
}

function retrieveSpecificGalleryFan(){
    var galleryID = localStorage.getItem("galleryID");
    
    $.ajax({
        url:"http://teamanage.co.uk/scripts/management/gallery/gallery.php",
        type: "POST",
        data: {type: "retrieve-specific-fan", galleryID: galleryID},
        success:function(data){
            populateSpecificGalleryFan(data);
        }
    });
}

function populateSpecificGalleryFan(data){
    var info = JSON.parse(data);
    var galleryList = "";

    $("#gallery-name").html(localStorage.getItem("gallery-name"));
    
    for(var i = 0; i < info.length; i++){
        galleryList += '<div class="column col-3"><img onclick="changeShadowbox(this)" class="gallery-thumb" src="' + info[i]['image_src'] + '" alt="' + info[i]['image_name'] + '" title="' + info[i]['image_name'] + '"/></div>';
    }
    
    galleryList += '<div class="clear"></div>';
    
    $(".gallery-content").html(galleryList);
    
}

function changeShadowbox(image){
    $(".shadowbox .image-content .heading-content .main-image-text").html(image.title);
    $(".shadowbox .main-image").attr("src",image.src);
    $(".shadowbox .main-image").attr("alt",image.alt);
    $(".shadowbox .main-image").attr("title",image.title);
    
    $(".background-mask").css("display","block");
    
    setTimeout(function(){
        $(".background-mask").addClass("mask-active");
    }, 200);
    
    setTimeout(function(){
        $(".shadowbox").fadeIn("slow");
    }, 1000);
    
}


function getPhoto_fan(source) 
{
    var cameraSource;
    var destinationType;
    
    cameraSource = navigator.camera.PictureSourceType.PHOTOLIBRARY;
    destinationType = navigator.camera.DestinationType;
    
    navigator.camera.getPicture(uploadPhotoLib_fan, onFail, {
        quality: 50, 
        allowEdit: true,
        targetWidth: 150,
        destinationType: destinationType.FILE_URI,
        sourceType: cameraSource});
}

function uploadPhotoLib_fan(imageURI) {
    var fanID = localStorage.getItem("fanID");
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
    ft.upload( imageURI, "http://teamanage.co.uk/scripts/management/upload_image_gallery_fan.php?id=" + fanID,
        function(result) {
            alert("Success");
            $("#gallery_img_src").attr("src","http://teamanage.co.uk/app/gallery/fan/" + fanID + "/" + options.fileName + ".jpg");
        },
        function(error) {
            alert("Error");
        },
        options
        );
}

function captureImage_fan(){
    navigator.device.capture.captureImage(captureSuccess_fan, onFail, { 
        limit: 1, 
        quality: 50,
        allowEdit: true,
        targetWidth: 150});
}

function captureSuccess_fan(mediaFiles) {    
    uploadFile_fan(mediaFiles[0]);
}

function uploadFile_fan(mediaFile) {
    var fanID = localStorage.getItem("fanID");
    
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
    ft.upload( path, "http://teamanage.co.uk/scripts/management/upload_image_gallery_fan.php?id=" + fanID,
        function(result) {
            alert("Success"); 
            $("#gallery_img_src").attr("src","http://teamanage.co.uk/app/gallery/fan/" + fanID + "/" + name);
        },
        function(error) {
            alert("Error");
        },
        options
        );  
}