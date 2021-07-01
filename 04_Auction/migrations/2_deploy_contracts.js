var MyAuction = artifacts.require("MyAuction");

module.exports = function(deployer) {
  deployer.deploy(MyAuction, 24, "0xB58E8372324270705369109Ac3e3ccAb42025761", "Poche", "888 Bangkok");
};