const ArtWarehouse = artifacts.require("ArtWarehouse.sol");

module.exports = function(deployer) {
  deployer.deploy(ArtWarehouse);
};