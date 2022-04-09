# UTCC Token

## วัตถุประสงค์
- การพัฒนา UTCCToken ซึ่งเป็นโทเคนอย่างง่าย สร้างผ่าน ERC20

## ซอฟต์แวร์ที่ต้องติดตั้งเบื้องต้น
- NodeJS
- truffle
- Ganache
- Metamask
- Visual Studio Code

# UTCC Token บน remix
```
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UTCCToken is ERC20 {

   constructor() ERC20("UTCCToken", "U3C") {
     _mint(msg.sender, 1000*10**18);
   }
}
```
