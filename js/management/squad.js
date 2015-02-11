$(document).ready(function(){
    
    var pictureSource = navigator.camera.PictureSourceType;
    
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
            getPhoto(pictureSource.PHOTOLIBRARY);
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
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    uploadFile(imageData);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

  function uploadFile(mediaFile) {
    var imgData = getBase64Image(mediaFile);
      console.log("data:image/png;base64," + imgData);
      $("#player_image-src").attr("src","data:image/png;base64," + imgData);
  }
        
function getBase64Image(img) {
    return img.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getPhoto(source) 
{
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onPhotoURISuccess(imageURI) 
{
    console.log(imageURI);
    $("#player_image-src").attr("src",imageURI);
    largeImage.src = imageURI;
}

