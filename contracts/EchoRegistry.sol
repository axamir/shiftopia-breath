// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EchoRegistry {
    struct Echo {
        string name;
        uint8 privacyLevel;
        bytes publicKey;
        uint256 strainScore;
        uint256 registrationBlock;
        bool isActive;
    }

    mapping(address => Echo) public echoes;
    mapping(string => address) public nameToAddress;
    address[] public echoList;
    address public owner;

    event EchoRegistered(address indexed echoAddress, string name, uint8 privacyLevel, uint256 strainScore);
    event StrainScoreUpdated(address indexed echoAddress, uint256 newScore);

    constructor() {
        owner = msg.sender;
    }

    function registerEcho(string memory _name, uint8 _privacyLevel, bytes memory _publicKey) external {
        require(bytes(_name).length > 0, "Empty name");
        require(_privacyLevel <= 2, "Invalid privacy");
        require(nameToAddress[_name] == address(0), "Name taken");
        require(echoes[msg.sender].registrationBlock == 0, "Already registered");

        echoes[msg.sender] = Echo(_name, _privacyLevel, _publicKey, 0, block.number, true);
        nameToAddress[_name] = msg.sender;
        echoList.push(msg.sender);

        emit EchoRegistered(msg.sender, _name, _privacyLevel, 0);
    }

    function addStrainScore(address _echoAddress, uint256 _amount) external {
        require(msg.sender == owner, "Not owner");
        require(echoes[_echoAddress].isActive, "Inactive");
        echoes[_echoAddress].strainScore += _amount;
        emit StrainScoreUpdated(_echoAddress, echoes[_echoAddress].strainScore);
    }

    function getEchoCount() external view returns (uint256) {
        return echoList.length;
    }
}
