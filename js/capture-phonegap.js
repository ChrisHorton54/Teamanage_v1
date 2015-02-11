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
      alert("Chris Test");
      console.log(mediaFile);
  }