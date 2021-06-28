var UTCCToken = artifacts.require("UTCCToken");

module.exports = function(deployer) {
  deployer.deploy(UTCCToken);
};