var AW = artifacts.require("./ArtWarehouse.sol");

contract("AW", function(accounts) {
  var awInstance;

  it("initializes with pictures count 0", function() {
    return AW.deployed().then(function(instance) {
      return instance.picturesCount();
    }).then(function(count) {
      assert.equal(count, 0);
    });
  });

  it("it adds a picture and counts up the picturescount and inserts as ID", function() {
    return AW.deployed().then(function(instance) {
      awInstance = instance;
      awInstance.addPicture("http://mylink.com/pic.png");
      return awInstance.pictureList(1);
    }).then(function(picture) {
      assert.equal(picture[0], 1, "contains the correct id");
      assert.equal(picture[1], "http://mylink.com/pic.png", "contains the correct link");
      assert.equal(picture[2], 0, "contains the correct worth");
    });
  });

  it("it adds a picture, emits an event and count up the picturescount", function() {
    return AW.deployed().then(function(instance) {
      awInstance = instance;
      awInstance.setWorth(1, 10);
      return awInstance.pictureList(1);
    }).then(function(picture) {
      assert.equal(picture[2], 10, "updated worth to 10");
    });
  });
});