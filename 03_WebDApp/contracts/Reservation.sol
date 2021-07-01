pragma solidity ^0.5.16;

contract Reservation {
    address[16] public reservers;

    // assign caller address to reservers[bikeId]
    function reserve(uint bikeId) public returns (uint) {
        require(bikeId >= 0 && bikeId <= 7);
        reservers[bikeId] = msg.sender;

        return bikeId;
    }

    // return all reservers (reservers[0] to reservers[15])
    function getReservers() public view returns (address[16] memory) {
        return reservers;
    }
}