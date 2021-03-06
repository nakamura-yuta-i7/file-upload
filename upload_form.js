$(function(){

  showUploadedFiles();

  $(document).bind("drop", function(e){
    e.preventDefault();
    // ファイル情報を取得
    var files = e.originalEvent.dataTransfer.files;
    uploadFiles(files);

    console.log("drop");
    $("body").removeClass("drag");

    return false;

  }).bind("dragenter", function(e){
    // e.preventDefault();
    console.log("dragenter");
    $("body").addClass("drag");

  }).bind("dragover", function(e){
    return false;

  }).bind("dragleave", function(e){
    // e.preventDefault();
    console.log("dragleave");

  });
});

function showUploadedFiles() {
  console.log(arguments.callee.name);
  var time = new Date();
  $("#uploaded_files").load("/uploaded_files.php?timestamp="+time.getTime());
}

function uploadFiles(files) {
  var fd = new FormData();
  var filesLength = files.length;
  Object.keys(files).forEach(function(i){
    fd.append("upload_files[]", files[i]);
  });
  $.ajax({
    url: '/upload.php',
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    xhr : function(){
      XHR = $.ajaxSettings.xhr();
      if(XHR.upload){
        XHR.upload.addEventListener('progress',function(e){
          progre = parseInt(e.loaded/e.total*10000)/100;
          console.log(progre+"%");
          $("#progress-bar").width(progre + "%");
        }, false);
      }
      return XHR;
    },
    success: function(data) {
      console.log('ファイルがアップロードされました。');
      showUploadedFiles();
    }
  });
}
