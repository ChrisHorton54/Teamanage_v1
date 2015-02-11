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
    var imgData = mediaFile;
    $(".player-image img").attr("src","data:image/png;base64," + imgData);
  }