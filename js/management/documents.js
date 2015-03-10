var win = function (r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

var fail = function (error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}

var options = new FileUploadOptions();
options.fileKey = "file";
options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
options.mimeType = "text/plain";

var params = {};
params.value1 = "test";
params.value2 = "param";

options.params = params;

var ft = new FileTransfer();
ft.upload(fileURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);

function getFile(){
    var source =  navigator.camera.PictureSourceType.PHOTOLIBRARY;
    navigator.camera.getPicture(successFn, errorFn, { quality: 50,
            destinationType: this.photoDestinationType.FILE_URI,
            sourceType: source,
            mediaType: navigator.camera.MediaType.ALLMEDIA  });
}