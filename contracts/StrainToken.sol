// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StrainToken is ERC20, Ownable {
    address public echoRegistry;
    mapping(address => bool) public authorizedMinters;

    event StrainMinted(address indexed to, uint256 amount);
    event StrainBurned(address indexed from, uint256 amount);
    event EchoRegistryUpdated(address indexed newRegistry);

    constructor(address _echoRegistry) ERC20("Shiftopia Strain", "STRAIN") {
        echoRegistry = _echoRegistry;
        authorizedMinters[msg.sender] = true;
        _transferOwnership(msg.sender);
    }

    modifier onlyAuthorized() {
        require(authorizedMinters[msg.sender], "Not authorized");
        _;
    }

    modifier onlyRegistry() {
        require(msg.sender == echoRegistry, "Not EchoRegistry");
        _;
    }

    function setEchoRegistry(address _newRegistry) external onlyOwner {
        require(_newRegistry != address(0), "Invalid address");
        echoRegistry = _newRegistry;
        emit EchoRegistryUpdated(_newRegistry);
    }

    function addMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = true;
    }

    function removeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = false;
    }

    function mint(address _to, uint256 _amount) external onlyAuthorized {
        _mint(_to, _amount);
        emit StrainMinted(_to, _amount);
    }

    function burn(uint256 _amount) external {
        _burn(msg.sender, _amount);
        emit StrainBurned(msg.sender, _amount);
    }

    function onStrainAdded(address _echo, uint256 _strainAmount) external onlyRegistry {
        _mint(_echo, _strainAmount);
        emit StrainMinted(_echo, _strainAmount);
    }
}
