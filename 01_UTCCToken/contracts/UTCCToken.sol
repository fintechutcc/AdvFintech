pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract UTCCToken is ERC20 {
    string public name = "UTCCToken";
    string public symbol = "UTC";
    uint8 public decimals = 6;
    uint public INITIAL_SUPPLY = 1200000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
