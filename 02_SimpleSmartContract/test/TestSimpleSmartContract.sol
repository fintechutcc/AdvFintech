pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleSmartContract.sol";

contract TestSimpleSmartContract {
  // Create simplesmartContract 
  SimpleSmartContract simpleSmartContract = SimpleSmartContract(DeployedAddresses.SimpleSmartContract());

  // Test get function
  function testGet() public {
    uint expectedMyVariable = 0;  
    Assert.equal(expectedMyVariable, simpleSmartContract.get(), "Testing on get() function. Expected to return 0.");
  }

  // Test set function
  function testSet() public {
    uint expectedMyVariable = 2021;

    simpleSmartContract.set(expectedMyVariable);
    Assert.equal(expectedMyVariable, simpleSmartContract.get(), "Testing on set() function. Expected to set myVariable to 2021.");
  }
}