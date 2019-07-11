The Fontend-folder consists of all files needed to for the Frontend
to work. It consists of a css-folder and a js-folder, which contains the app.js
and the upload.js. The app.js contains all informatios for a successful
connection to the blockchain and the smartContract. The upload.js has the purpose
of previewing a new image before uploading it to the webserver. Furthermore a 
php-folder is seen which contains an upload.php file. The upload.php is 
used for uploading the previewed image to the webserver and generating a
name and link for the image, which will then be used by the smartcontract 
to determine the worth of the picture. The resources-folder includes truffle
(Framework to retrieve the smartContract) and web3 (Framework for interaction
with the blockhain and the smartContract). The ArtWarehouse.json includes all
necessary data to interact with the smartContract. The index.html is the only part
seen by the user. All userinteraction will happen there.