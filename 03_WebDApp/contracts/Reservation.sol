pragma solidity ^0.5.16;

contract Reservation {
    address[16] public reservers;

    function reserve(uint bikeId) public returns (uint) {
        require(bikeId >= 0 && bikeId <= 7);
        reservers[bikeId] = msg.sender;

        return bikeId;
    }

    function getReservers() public view returns (address[16] memory) {
        return reservers;
    }
}