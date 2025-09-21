// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Insurance {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

struct Policy {
    uint256 policyId;        // Unique ID for each policy
    string name;             // Name of the policyholder
    uint256 premium;         // Premium amount (recurring payment)
    uint256 sumAssured;      // Total coverage amount
    uint256 payInterval;     // Time between premium payments (in seconds)
    uint256 initialPayment;  // First payment amount
    string insuranceFor;     // What this insurance covers (e.g., health, car, home)
    string holderRemark;
    uint256 startDate;       // Timestamp when policy starts
    uint256 endDate;         // Timestamp when policy ends
    uint72 numofSubscibers;
    bool active;             // Whether the policy is currently active
}


    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    function newInsurance() public onlyOwner {
        
       


    }
}
