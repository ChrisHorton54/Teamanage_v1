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