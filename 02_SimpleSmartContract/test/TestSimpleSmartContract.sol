pragma solidity ^0.5.16;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleSmartContract.sol";

contract TestSimpleSmartContract {
  // Create simplesmartContract 
  SimpleSmartContract simpleSmartContract = SimpleSmartContract(DeployedAddresses.SimpleSmartContract());

  function testGet() public {
    uint expectedMyVariable = 0;  
    Assert.equal(expectedMyVariable, simpleSmartContract.get(), "Testing on get() function. Expected to return 0.");
  }
}