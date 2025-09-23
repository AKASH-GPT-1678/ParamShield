// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../library/InsuranceLibrary.sol";

contract Insurance {
    address public owner;
    uint256 public count;

    constructor() {
        owner = msg.sender;
        count = 0;
    }

    struct Policy {
        uint256 policyId;        
        string name;            
        uint256 premium;       
        uint256 sumAssured;      
        uint256 payInterval;     
        uint256 initialPayment;  
        string insuranceFor;    
        string holderRemark;
        uint256 startDate;       
        uint256 endDate;        
        uint72 numOfSubscribers;
        bool active;             
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    mapping(uint256 => Policy) public policies;
    uint256[] public policyIds;


    function newInsurance(
        string memory _name,
        uint256 _premium,
        uint256 _sumAssured,
        uint256 _payInterval,
        uint256 _initialPayment,
        string memory _insuranceFor,
        string memory _holderRemark,
        uint256 _startDate,
        uint256 _endDate,
        uint72 _numOfSubscribers
    ) public onlyOwner {
      
        uint256 policyId = InsuranceLibrary.randVal(1_000_000, count); 


        policies[policyId] = Policy({
            policyId: policyId,
            name: _name,
            premium: _premium,
            sumAssured: _sumAssured,
            payInterval: _payInterval,
            initialPayment: _initialPayment,
            insuranceFor: _insuranceFor,
            holderRemark: _holderRemark,
            startDate: _startDate,
            endDate: _endDate,
            numOfSubscribers: _numOfSubscribers,
            active: true
        });

        count++;
        policyIds.push(policyId);
    }





   function loadAllInsurance() public view returns (Policy[] memory) {
    Policy[] memory allPolicies = new Policy[](policyIds.length);

    for (uint i = 0; i < policyIds.length; i++) {
        allPolicies[i] = policies[policyIds[i]];
    }

    return allPolicies;
}
   



 function deactivateInsurance(uint _policyId)public {
    Policy memory existingPolicy = policies[_policyId];
  

  require(existingPolicy.active, "Inactive policy cannot be deactivated");

  existingPolicy.active = false;

   
     



 }

}
