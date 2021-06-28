# Smart Contract อย่างง่าย

## ซอฟต์แวร์ที่ต้องติดตั้งเบื้องต้น
- NodeJS
- truffle
- Visual Studio Code (optional)

## Step 0
สร้างไดเรกทอรี:

```mkdir 02_SimpleSmartContract```

เปลี่ยนไปยังไดเร็กทอรีที่เพิ่งสร้าง:

```cd 02_SimpleSmartContract```

## Step 1
ให้ค่าเริ่มต้น (Initialization) โปรเจ็คโดยใช้คำสั่งต่อไปนี้ (ควรทำตอนที่ไดเร็กทอรียังว่างอยู่):

```truffle init```

## Step 2
ใช้ Visual Studio Code สร้างไฟล์ชื่อ ```SimpleSmartContract.sol``` ในไดเร็กทอรี ```contracts``` โดยไฟล์เป็นดังนี้:

```
pragma solidity ^0.5.16;

contract SimpleSmartContract {
  uint myVariable;

  function set(uint x) public {
    myVariable = x;
  }

  function get() view public returns (uint) {
    return myVariable;
  }
}
```

## Step 3
ใช้ Visual Studio Code สร้างไฟล์ ```2_deploy_contracts.js``` ในไดเร็กทอรี ```migrations```:

```
var SimpleSmartContract = artifacts.require("SimpleSmartContract");

module.exports = function(deployer) {
    deployer.deploy(SimpleSmartContract);
};
```

## Step 4: 
เปิด terminal แล้วย้ายไปยังไดเร็กทอรีของโปรเจ็ค (เช่น 02_SimpleSmartContract), ทำการคอมไพล์โปรเจ็คโดยใช้คำสั่ง:
```
truffle compile
```

หากคอมไพล์สำเร็จ, ป้อนคำสั่งต่อไปนี้เพื่อใช้งานสภาพแวดล้อม develop ที่ truffle framework มีให้:
```
truffle develop
```

ในสภาพแวดล้อม develop ให้ใช้คำสั่งต่อไปนี้เพื่อย้าย smart contracts ไปยังบล็อกเชนที่ทาง truffle framework มีให้สำหรับการทดสอบ:
```
migrate
```

สามารถทดลองใช้เมธอด ```get``` ของ MyData smart contract ได้โดยใช้คำสั่งต่อไปนี้:
```
SimpleSmartContract.deployed().then(function(instance){return instance.get.call();}).then(function(value){return value.toNumber()});
```

โปรดสังเกตผลลัพธ์ที่ได้ จากนั้นทดลองใช้เมธอด ```set``` โดยใช้คำสั่งต่อไปนี้:
```
SimpleSmartContract.deployed().then(function(instance){return instance.set(2020);});
```

จากนั้นเรียกใช้เมธอด ```get``` อีกครั้ง แล้วสังเกตผลลัพธ์ที่ได้เมื่อเทียบกับผลลัพธ์การเรียก ```get``` ในครั้งแรก