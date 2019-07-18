// define an object named App for use in index.html
// whole blockchaincommunication happens in this object
App = {
  // use web3 as framework for etherum blockchaincommunication

  // define web3Provider e.g. the network the etherum blockchain runs on
  web3Provider: null,
  // define empty contract
  contracts: {},
  // define empty account
  account: '0x0',

  // init function will run on pageload of index.html
  init: function() {
    return App.initWeb3();
  },

  // initalize the web3 framework
  initWeb3: function() {
    // if metamask is used (firefox & chrome) -> tested with safari and internetexplorer
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      console.log("no metamask");
      // set web3Provider to local blockchain hosted with ganache (external applikation)
      // port in ganache has to be set manually to 8545
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // load a migrated contract
  initContract: function() {
    // ArtWarehouse.json is a summary of the contract and the communicationways
    $.getJSON("ArtWarehouse.json", function(aw) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.AW = TruffleContract(aw);
      // Connect provider to interact with contract
      App.contracts.AW.setProvider(App.web3Provider);

      // call function for eventlistening (used for OraclePattern and API contact)
      App.listenForEvents();

      // call renderfunction
      return App.render();
    });
  },  
  // render the index.html with data from blockhain
  render: function() {
    var awInstance;
    var loader = $("#loader");
    var content = $("#content");

    //loader.show();
    //content.hide();

    // Load account data (address)
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + App.account);
      }
    });

    // Load contract data
    App.contracts.AW.deployed().then(function(instance) {
      // use a contractinstance for further use
      awInstance = instance;
      console.log(instance);
      // load the value of picturesCount from Blockhain smartcontract
      return awInstance.picturesCount();
    }).then(function(picturesCount) {
      var picturesResults = $("#picturesResults");
      picturesResults.empty();

      // iterate through pictureList to retrieve all pictures data
      for (var i = 1; i <= picturesCount; i++) {
        awInstance.pictureList(i).then(function(picture) {
          var id = picture[0];
          var link = picture[1];
          var worth = picture[2];
          var owner = picture[3];

          // Render pictures result
          var picturesTemplate = "<tr><th>" + id + "</th><td>" + link + "</td><td>" + worth + "</td><td>" + owner + "</td></tr>"
          picturesResults.append(picturesTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  // function for adding a new picture to Blockchain
  writeblockchain: function(data) {
    var awInstance;
    var link = data;

    // manipulate string. Remove " " from string
    link = link.substring(1, link.length-1);
    
    App.contracts.AW.deployed().then(function(instance) {
      awInstance = instance;
      // add Picture to Blockchain
      // from: App.account is used to determine who added the picture. The adress will be the owner of the picture
      return awInstance.addPicture(link, { from: App.account, gas:3000000});
    }).then(function(result) {
      // Wait for update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      alert("" + err);
      console.error(err);
    });
  },

  // function for ajax-request when uploading a new image
  uploadfile: function(){

    // when a picture has been chosen the picture will be first displayed and then uploaded
    var preview = document.getElementById("imgp").src;
    console.log(preview);

    // ajax-request to uploadFile.php
    var options = {
        url: "php/uploadFile.php",
        dataType: "text",
        type: "POST",
        // image is encoded to base64
        data: { imgBase64: preview },
        success: function( data, status, xhr ) {
            // when upload to server was successfull the function writeblockchain will be called
            App.writeblockchain(data);
        },
        error: function( xhr, status, error ) {
            alert(error);
        }
      };
    $.ajax( options );
  },

  // !Oracle Pattern! (provide the smartcontract with an external api)
  // listen for events e.g. when picture was successfully added to blockchain (set the worth of the picture)
  listenForEvents: function() {
    
    //Event aus Election.sol wird hier überwacht. Wird es emmitted, so werden zwei candidaten hinzugefügt
    App.contracts.AW.deployed().then(function(instance) {
      instance.pictureUpload({}, {
        // just listen to the last created block
        // otherwise all past events will also be recognized, leading to a complete reload and reprediction of the DL-model
        fromBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event);
        // print the pictureId
        console.log(event.args.pictureId.c);

        $("#content").show();
        $("#loader").hide();
        // Reload when a new worth was set
        
        // ajax-request to server.py for prediction of imageworth
        var options = {
          url: "http://localhost:5000/",
          dataType: "text",
          type: "GET",
          data: { link: event.args.link }, // Our valid JSON string
          success: function( data, status, xhr ) {
            // if worth was successfully determined the setworth function of smartcontract will be called
            // arguments: pictureId, the worth and the address of sender
            instance.setWorth(event.args.pictureId.c, data, { from: App.account });
            App.render();
            document.getElementById("imgp").src = "";
            document.getElementById("fileu").value = "";
          },
          error: function( xhr, status, error ) {
              alert(error);
          }
        };
        $.ajax( options );

      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});