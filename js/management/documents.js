function getFile(source) {
    
    var destinationType;
    
    destinationType = navigator.camera.DestinationType;
    
    navigator.camera.getPicture(uploadPhoto, onFail, {
        quality: 50, 
        allowEdit: true,
        targetWidth: 150,
        destinationType: destinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
}

function uploadPhoto(fileURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
    options.mimeType="text/plain";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

function onFail(){
    console.log("FAIL");
}