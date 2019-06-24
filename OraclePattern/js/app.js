import { web3 } from "../resources/web3.min.js";
import { TruffleContract } from "../resources/truffle-contract.js"

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
      App.contracts.Election.setProvider(App.web3Provider);

      console.log(App.contracts);

      App.listenForEvents();
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
        console.log("event triggered", event);
        console.log(event.args._pictureId.c[0]);
        instance.setWorth(event.args._pictureId.c[0], 10, { from: App.account });
        // instance.addCandidate("CandY", { from: App.account });
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