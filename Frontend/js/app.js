App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      console.log("no metamask");
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("ArtWarehouse.json", function(aw) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.AW = TruffleContract(aw);
      // Connect provider to interact with contract
      App.contracts.AW.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  render: function() {
    var awInstance;
    var loader = $("#loader");
    var content = $("#content");

    //loader.show();
    //content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + App.account);
      }
    });

    // Load contract data
    App.contracts.AW.deployed().then(function(instance) {
      awInstance = instance;
      console.log(instance);
      return awInstance.picturesCount();
    }).then(function(picturesCount) {
      var picturesResults = $("#picturesResults");
      picturesResults.empty();

      for (var i = 1; i <= picturesCount; i++) {
        awInstance.pictureList(i).then(function(picture) {
          var id = picture[0];
          var link = picture[1];
          var worth = picture[2];
          var owner = picture[3];

          // Render candidate Result
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

  // ArtWarehouse.deployed().then(function(instance) { return awInstance = instance.addPicture("there") });
  // Here is a failure
  upload: function() {
    var link = "";
    var awInstance;
    link = $('#link').val();
    App.contracts.AW.deployed().then(function(instance) {
      awInstance = instance;
      //console.log("upload: " + link + ". Account: " + App.account);
      return awInstance.addPicture(link, { from: App.account, gas:3000000});
    }).then(function(result) {
      // Wait for update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  listenForEvents: function() {
    
    //Event aus Election.sol wird hier überwacht. Wird es emmitted, so werden zwei candidaten hinzugefügt
    App.contracts.AW.deployed().then(function(instance) {
      instance.pictureUpload({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        //Hier würde ein externe API-Zugriff statt finden

        $("#content").show();
        $("#loader").hide();
        $("#link").val("");
        // Reload when a new vote is recorded
        
        /**
        var options = {
          url: "http://localhost:3000/bcc.php",
          dataType: "text",
          type: "GET",
          data: { rechnung: "alle" }, // Our valid JSON string
          success: function( data, status, xhr ) {
            instance.addCandidate(data, { from: App.account });
            App.render();
          },
          error: function( xhr, status, error ) {
              alert("failure");
          }
        };
      $.ajax( options ); */

      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});