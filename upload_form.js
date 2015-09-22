$(function(){
  $("#upload").bind("drop", function(e){
    e.preventDefault();

    // ファイル情報を取得
    var files = e.originalEvent.dataTransfer.files;
    uploadFiles(files);
    return false;
  });
});

function uploadFiles(files) {
  // FormDataオブジェクトを用意
  var fd = new FormData();
  var filesLength = files.length;
  Object.keys(files).forEach(function(i){
    fd.append("upload_files", files[i]);
  });
  // Ajaxでアップロード処理をするファイルへ内容渡す
  var jqxhr = $.ajax({
    url: '/upload',
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    xhrFields : {
      onprogress: function(e) {
        console.log( Math.floor(e.loaded / e.total * 100) + '%' );
      }
    },
    success: function(data) {
      console.log('ファイルがアップロードされました。');
    }
  });
  // Set another completion function for the request above
  jqxhr.always(function() {
    console.log( "second complete" );
  });
}
