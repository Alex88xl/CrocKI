// migrate the ArtWarehouse SmartContract to the Blockchain hosted locally with ganache
const ArtWarehouse = artifacts.require("ArtWarehouse.sol");

module.exports = function(deployer) {
  deployer.deploy(ArtWarehouse);
};