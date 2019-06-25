function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
}

function uploadfile(){

    var preview = document.getElementById("imgp").src;

    var options = {
        url: "http://localhost:8080/Frontend/php/uploadFile.php",
        dataType: "file",
        type: "GET",
        data: { imgBase64: preview }, // Our valid JSON string
        success: function( data, status, xhr ) {
            alert(data);
        },
        error: function( xhr, status, error ) {
            alert("failure");
        }
      };
    $.ajax( options );
}

previewFile();  //calls the function named previewFile()