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
    localStorage.setItem("listImage", "data:image/png;base64," + imgData);
      
    var lists = JSON.parse(localStorage.getItem("lists"));
      
     for(var i = 0; i < lists.length; i++){
        if(lists[i].name == localStorage.getItem("listName")){
            lists[i].image = "data:image/png;base64," + imgData;
        }
    }
    
    localStorage.setItem("lists",JSON.stringify(lists));
      
      window.location = "list-item.html";
  }
        
function getBase64Image(img) {
    return img.replace(/^data:image\/(png|jpg);base64,/, "");
}