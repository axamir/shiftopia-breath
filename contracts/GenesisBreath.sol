// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GenesisBreath {
    struct BreathRecord {
        string quote;
        uint256 strainScore;
        uint256 timestamp;
        address recorder;
    }

    BreathRecord[] public breathLedger;
    address public owner;

    event BreathRegistered(uint256 indexed id, address recorder, uint256 strainScore, string quote);

    constructor() {
        owner = msg.sender;
    }

    function recordGenesisBreath(string memory quote, uint256 strainScore) external {
        // فقط بنیان‌گذار می‌تواند در ۱۰۰ بلاک اول ثبت کند (اختیاری)
        // برای نمونه، محدودیت را برداشته‌ایم تا عمومی شود
        breathLedger.push(BreathRecord({
            quote: quote,
            strainScore: strainScore,
            timestamp: block.timestamp,
            recorder: msg.sender
        }));
        emit BreathRegistered(breathLedger.length - 1, msg.sender, strainScore, quote);
    }

    function getBreathCount() external view returns (uint256) {
        return breathLedger.length;
    }

    function getBreath(uint256 id) external view returns (string memory, uint256, uint256, address) {
        require(id < breathLedger.length, "Invalid ID");
        BreathRecord memory b = breathLedger[id];
        return (b.quote, b.strainScore, b.timestamp, b.recorder);
    }
}
